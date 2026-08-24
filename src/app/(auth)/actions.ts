"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function requireString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Champ manquant : ${key}`);
  }
  return value;
}

export async function signInWithPassword(formData: FormData) {
  const email = requireString(formData, "email");
  const password = requireString(formData, "password");
  const next = String(formData.get("next") ?? "/dashboard");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function signInWithMagicLink(formData: FormData) {
  const email = requireString(formData, "email");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/login?magic=${encodeURIComponent(email)}`);
}

export async function signUp(formData: FormData) {
  const email = requireString(formData, "email");
  const password = requireString(formData, "password");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    // Email confirmation is disabled for this project: signUp already opened a session.
    redirect("/dashboard");
  }

  redirect(`/login?confirm=${encodeURIComponent(email)}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
