"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

async function getCurrentMembership() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/team");
  }

  const { data: membership } = await supabase
    .from("memberships")
    .select("org_id, role")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!membership) {
    redirect("/dashboard/team?error=Aucune+organisation+active+pour+ce+compte.");
  }

  return { supabase, user, membership };
}

export async function inviteMember(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const role = String(formData.get("role") ?? "membre");

  if (!email || (role !== "admin" && role !== "membre")) {
    redirect("/dashboard/team?error=Formulaire+invalide.");
  }

  const { supabase, user, membership } = await getCurrentMembership();

  const { error } = await supabase.from("memberships").upsert(
    {
      org_id: membership.org_id,
      email,
      role,
      status: "pending",
      invited_by: user.id,
      invited_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + SEVEN_DAYS_MS).toISOString(),
    },
    { onConflict: "org_id,email" }
  );

  if (error) {
    redirect(`/dashboard/team?error=${encodeURIComponent(error.message)}`);
  }

  const admin = createAdminClient();
  const { error: inviteError } = await admin.auth.admin.inviteUserByEmail(email);
  if (inviteError && inviteError.code !== "email_exists") {
    redirect(`/dashboard/team?error=${encodeURIComponent(inviteError.message)}`);
  }

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

export async function updateMemberRole(formData: FormData) {
  const membershipId = String(formData.get("membershipId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!membershipId || (role !== "admin" && role !== "membre")) {
    redirect("/dashboard/team?error=Formulaire+invalide.");
  }

  const { supabase } = await getCurrentMembership();

  const { error } = await supabase.from("memberships").update({ role }).eq("id", membershipId);

  if (error) {
    redirect(`/dashboard/team?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

export async function revokeMember(formData: FormData) {
  const membershipId = String(formData.get("membershipId") ?? "");
  if (!membershipId) {
    redirect("/dashboard/team?error=Formulaire+invalide.");
  }

  const { supabase } = await getCurrentMembership();

  const { error } = await supabase
    .from("memberships")
    .update({ status: "revoked" })
    .eq("id", membershipId);

  if (error) {
    redirect(`/dashboard/team?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

export async function resendInvite(formData: FormData) {
  const membershipId = String(formData.get("membershipId") ?? "");
  if (!membershipId) {
    redirect("/dashboard/team?error=Formulaire+invalide.");
  }

  const { supabase } = await getCurrentMembership();

  const { data: row, error } = await supabase
    .from("memberships")
    .select("email")
    .eq("id", membershipId)
    .single();

  if (error || !row) {
    redirect("/dashboard/team?error=Invitation+introuvable.");
  }

  await supabase
    .from("memberships")
    .update({ expires_at: new Date(Date.now() + SEVEN_DAYS_MS).toISOString() })
    .eq("id", membershipId);

  const admin = createAdminClient();
  await admin.auth.admin.inviteUserByEmail(row.email);

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}
