import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { inviteMember, resendInvite, revokeMember, updateMemberRole } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  active: "ACTIF",
  pending: "EN ATTENTE",
  revoked: "RÉVOQUÉ",
};

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/team");
  }

  const { data: rows } = await supabase
    .from("memberships")
    .select("id, email, role, status, invited_at, expires_at, user_id")
    .order("created_at", { ascending: true });

  const memberships = rows ?? [];
  const currentMembership = memberships.find((row) => row.user_id === user.id);
  const canManage = currentMembership?.role === "owner" || currentMembership?.role === "admin";
  const isOwner = currentMembership?.role === "owner";

  return (
    <div className="px-8 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-serif text-3xl text-ink">Membres du registre</h1>
        {canManage && (
          <details className="group">
            <summary className="cursor-pointer list-none border border-stamp bg-stamp px-4 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-paper hover:bg-stamp/90">
              INVITER UN MEMBRE
            </summary>
            <form
              action={inviteMember}
              className="mt-3 flex flex-wrap items-end gap-3 border border-border p-4"
            >
              <div>
                <label htmlFor="invite-email" className="block font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
                  COURRIEL
                </label>
                <input
                  id="invite-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 border border-ink bg-paper px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="invite-role" className="block font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
                  RÔLE
                </label>
                <select
                  id="invite-role"
                  name="role"
                  defaultValue="membre"
                  className="mt-1 border border-ink bg-paper px-3 py-2 text-sm"
                >
                  <option value="membre">membre</option>
                  {isOwner && <option value="admin">admin</option>}
                </select>
              </div>
              <button
                type="submit"
                className="border border-ink px-4 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-ink hover:bg-ink hover:text-paper"
              >
                ENVOYER L&apos;INVITATION
              </button>
            </form>
          </details>
        )}
      </div>

      {params.error && (
        <p className="mt-4 border border-stamp px-4 py-3 text-sm text-stamp" role="alert">
          {decodeURIComponent(params.error).replaceAll("+", " ")}
        </p>
      )}

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">Membres et rôles du registre</caption>
          <thead>
            <tr>
              <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                N°
              </th>
              <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                COURRIEL
              </th>
              <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                RÔLE
              </th>
              <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                STATUT
              </th>
              {canManage && (
                <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                  ACTION
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {memberships.map((row, index) => (
              <tr key={row.id} className={index % 2 === 1 ? "bg-ledger-tint" : "bg-paper"}>
                <td className="border-t border-border px-4 py-3 font-mono text-caption text-stamp">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="border-t border-border px-4 py-3 text-sm text-ink">{row.email}</td>
                <td className="border-t border-border px-4 py-3 text-sm text-ink">{row.role}</td>
                <td className="border-t border-border px-4 py-3">
                  <span className="border border-border px-2 py-0.5 font-mono text-caption text-ink-muted">
                    {STATUS_LABEL[row.status] ?? row.status}
                  </span>
                </td>
                {canManage && (
                  <td className="border-t border-border px-4 py-3">
                    {row.role === "owner" ? (
                      <span className="font-mono text-caption text-ink-muted">—</span>
                    ) : row.status === "pending" ? (
                      <div className="flex gap-2">
                        <form action={resendInvite}>
                          <input type="hidden" name="membershipId" value={row.id} />
                          <button
                            type="submit"
                            className="border border-border px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-ink hover:bg-ink hover:text-paper"
                          >
                            RENVOYER
                          </button>
                        </form>
                        <form action={revokeMember}>
                          <input type="hidden" name="membershipId" value={row.id} />
                          <button
                            type="submit"
                            className="border border-stamp px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-stamp hover:bg-stamp hover:text-paper"
                          >
                            RÉVOQUER
                          </button>
                        </form>
                      </div>
                    ) : row.status === "active" ? (
                      <form action={updateMemberRole} className="flex items-center gap-2">
                        <input type="hidden" name="membershipId" value={row.id} />
                        <select
                          name="role"
                          defaultValue={row.role}
                          className="border border-ink bg-paper px-2 py-1 text-xs"
                        >
                          <option value="membre">membre</option>
                          <option value="admin">admin</option>
                        </select>
                        <button
                          type="submit"
                          className="border border-ink px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-ink hover:bg-ink hover:text-paper"
                        >
                          MODIFIER
                        </button>
                        <button
                          type="submit"
                          formAction={revokeMember}
                          className="border border-stamp px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-stamp hover:bg-stamp hover:text-paper"
                        >
                          RÉVOQUER
                        </button>
                      </form>
                    ) : (
                      <span className="font-mono text-caption text-ink-muted">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-caption text-ink-muted">
        FOLIO 03 · ÉCRITURES 01→{String(memberships.length).padStart(2, "0")}
      </p>

      <div className="mt-12 grid gap-8 border-t border-ink pt-8 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-xl text-ink">Owner</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Facturation, transfert de propriété, suppression du registre. Un seul owner par
            organisation.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl text-ink">Admin</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Invitations, changements de rôle (hors owner), révocations. Lecture complète du
            journal.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl text-ink">Membre</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Lecture de l&apos;équipe et de ses propres écritures. Aucune modification possible,
            côté interface comme côté base.
          </p>
        </div>
      </div>
    </div>
  );
}
