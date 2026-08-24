import Link from "next/link";
import { signInWithMagicLink, signInWithPassword } from "../actions";

const ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Identifiants incorrects.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; magic?: string; confirm?: string; next?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error ? (ERROR_MESSAGES[params.error] ?? params.error) : null;

  return (
    <div>
      <div className="flex border border-ink">
        <span className="flex-1 border-r border-ink bg-ink px-4 py-2 text-center font-mono text-caption font-semibold tracking-[0.15em] text-paper">
          CONNEXION
        </span>
        <Link
          href="/signup"
          className="flex-1 px-4 py-2 text-center font-mono text-caption font-semibold tracking-[0.15em] text-ink-muted hover:text-ink"
        >
          CRÉER UN REGISTRE
        </Link>
      </div>

      <h1 className="mt-8 font-serif text-3xl text-ink">Se connecter</h1>
      <p className="mt-2 text-sm text-ink/70">
        Identifiez-vous pour accéder au folio de votre organisation.
      </p>

      {errorMessage && (
        <p className="mt-6 border border-stamp px-4 py-3 text-sm text-stamp" role="alert">
          {errorMessage}
        </p>
      )}
      {params.confirm && (
        <p className="mt-6 border border-border px-4 py-3 text-sm text-ink/80">
          Un courriel de confirmation a été envoyé à {params.confirm}. Validez-le avant de vous
          connecter.
        </p>
      )}
      {params.magic && (
        <p className="mt-6 border border-border px-4 py-3 text-sm text-ink/80">
          Un lien de connexion a été envoyé à {params.magic}.
        </p>
      )}

      <form className="mt-8 space-y-5">
        <input type="hidden" name="next" value={params.next ?? "/dashboard"} />

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
            autoComplete="current-password"
            className="mt-2 w-full border border-ink bg-paper px-4 py-3 text-ink"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink/80">
            <input type="checkbox" name="remember" className="h-4 w-4 border-ink" />
            Rester connecté
          </label>
          <a href="#" className="underline text-ink/70 hover:text-ink">
            Mot de passe oublié
          </a>
        </div>

        <button
          type="submit"
          formAction={signInWithPassword}
          className="w-full border border-stamp bg-stamp px-4 py-3 font-mono text-caption font-semibold tracking-[0.1em] text-paper hover:bg-stamp/90"
        >
          OUVRIR LA SESSION
        </button>

        <div className="flex items-center gap-3 text-ink-muted">
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-caption">OU</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="submit"
          formAction={signInWithMagicLink}
          className="w-full border border-ink px-4 py-3 text-center text-sm text-ink hover:bg-ink hover:text-paper"
        >
          Continuer avec un lien magique
        </button>
      </form>

      <p className="mt-8 text-caption font-mono leading-relaxed text-ink-muted">
        Chaque connexion, échec compris, est consignée au registre avec date, adresse et rôle.
      </p>
    </div>
  );
}
