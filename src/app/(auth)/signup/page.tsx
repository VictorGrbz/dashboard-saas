import Link from "next/link";
import { signUp } from "../actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <div className="flex border border-ink">
        <Link
          href="/login"
          className="flex-1 px-4 py-2 text-center font-mono text-caption font-semibold tracking-[0.15em] text-ink-muted hover:text-ink"
        >
          CONNEXION
        </Link>
        <span className="flex-1 border-l border-ink bg-ink px-4 py-2 text-center font-mono text-caption font-semibold tracking-[0.15em] text-paper">
          CRÉER UN REGISTRE
        </span>
      </div>

      <h1 className="mt-8 font-serif text-3xl text-ink">Créer un registre</h1>
      <p className="mt-2 text-sm text-ink/70">
        Ouvrez le registre de votre organisation. Vous en serez le premier owner.
      </p>

      {params.error && (
        <p className="mt-6 border border-stamp px-4 py-3 text-sm text-stamp" role="alert">
          {params.error}
        </p>
      )}

      <form action={signUp} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="block font-mono text-caption font-semibold tracking-[0.15em] text-ink-muted">
            COURRIEL PROFESSIONNEL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border border-ink bg-paper px-4 py-3 text-ink"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-mono text-caption font-semibold tracking-[0.15em] text-ink-muted">
            MOT DE PASSE
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full border border-ink bg-paper px-4 py-3 text-ink"
          />
          <p className="mt-2 text-caption font-mono text-ink-muted">8 caractères minimum.</p>
        </div>

        <button
          type="submit"
          className="w-full border border-stamp bg-stamp px-4 py-3 font-mono text-caption font-semibold tracking-[0.1em] text-paper hover:bg-stamp/90"
        >
          OUVRIR UN REGISTRE
        </button>
      </form>

      <p className="mt-8 text-caption font-mono leading-relaxed text-ink-muted">
        La création du registre, comme toute écriture, est datée et conservée. Aucune carte
        bancaire n&apos;est requise pour l&apos;essai de 14 jours.
      </p>
    </div>
  );
}
