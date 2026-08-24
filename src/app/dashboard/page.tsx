import { createClient } from "@/lib/supabase/server";
import { signOut } from "../(auth)/actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl text-ink">État du registre</h1>
      <p className="mt-4 text-ink/80">
        Connecté en tant que <span className="font-mono text-sm">{user?.email}</span>. Cette
        session est protégée par le proxy Supabase : elle redirige vers /login si le rôle n&apos;est
        plus authentifié.
      </p>

      <form action={signOut} className="mt-8">
        <button
          type="submit"
          className="border border-ink px-4 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-ink hover:bg-ink hover:text-paper"
        >
          FERMER LA SESSION
        </button>
      </form>
    </div>
  );
}
