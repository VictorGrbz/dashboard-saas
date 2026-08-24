function StampBadge() {
  return (
    <div className="relative -rotate-3 px-6 py-4 text-center text-stamp">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="0 0 200 90"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="stamp-ink" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.09" numOctaves="3" seed="9" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="stamp-ink-bleed" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06 0.1" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect
          x="6"
          y="6"
          width="188"
          height="78"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          opacity="0.35"
          filter="url(#stamp-ink-bleed)"
        />
        <rect
          x="6"
          y="6"
          width="188"
          height="78"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          filter="url(#stamp-ink)"
        />
      </svg>
      <p className="font-mono text-sm font-semibold tracking-[0.15em]">ESSAI 14 JOURS</p>
      <p className="mt-1 font-mono text-[10px] leading-snug tracking-[0.1em]">
        ENTRÉE AUTORISÉE
        <br />
        SANS CARTE BANCAIRE
      </p>
    </div>
  );
}

const NAV_ITEMS: { label: string; href: string | null }[] = [
  { label: "Produit", href: "#hero" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Registre & sécurité", href: null },
  { label: "Documentation", href: null },
];

type Plan = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  highlighted?: boolean;
  cta: { label: string; href: string; variant: "outline" | "filled" };
};

const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    price: "0 €",
    priceNote: "1 siège · sans limite de durée",
    cta: { label: "Ouvrir un registre", href: "/login", variant: "outline" },
  },
  {
    id: "equipe",
    name: "Équipe",
    price: "12 €",
    priceNote: "par membre / mois · 3 sièges min.",
    highlighted: true,
    cta: { label: "Démarrer l'essai", href: "/login", variant: "filled" },
  },
  {
    id: "etude",
    name: "Étude",
    price: "29 €",
    priceNote: "par membre / mois · sièges illimités",
    cta: { label: "Nous écrire", href: "mailto:contact@crewbase.app", variant: "outline" },
  },
];

type FeatureRow = {
  label: string;
  values: [string, string, string];
};

const FEATURE_ROWS: FeatureRow[] = [
  { label: "Membres invités", values: ["1", "25", "Illimité"] },
  { label: "Rôles (owner / admin / membre)", values: ["—", "Oui", "Oui"] },
  { label: "Permissions appliquées en base (RLS)", values: ["Oui", "Oui", "Oui"] },
  { label: "Journal d'audit des écritures", values: ["30 jours", "12 mois", "Export continu"] },
  { label: "Facturation Stripe & reçus numérotés", values: ["—", "Oui", "Oui"] },
  { label: "Domaines de courriel vérifiés", values: ["—", "—", "Oui"] },
];

const VALUE_PROPS = [
  {
    number: "01",
    title: "Trois rôles, une seule source de vérité",
    body: "Owner, admin, membre. Le rôle décide de ce qui est lisible et de ce qui est modifiable, à la ligne près.",
  },
  {
    number: "02",
    title: "Rien ne se modifie en silence",
    body: "Invitation, changement de rôle, révocation, paiement : chaque événement est daté, numéroté et attribué à son auteur.",
  },
  {
    number: "03",
    title: "Abonnement lisible",
    body: "Sièges facturés, prochaine échéance, reçus numérotés. Le montant s'explique toujours par une écriture.",
  },
];

export default function Home() {
  return (
    <>
      <header className="bg-ledger text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <a href="#hero" className="leading-tight">
            <span className="block font-mono text-sm font-semibold tracking-[0.15em]">
              CREWBASE
            </span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-paper/70">
              REGISTRE D&apos;ÉQUIPE
            </span>
          </a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-xs tracking-[0.15em] text-paper/85 hover:text-paper"
                >
                  {item.label.toUpperCase()}
                </a>
              ) : (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="font-mono text-xs tracking-[0.15em] text-paper/40"
                >
                  {item.label.toUpperCase()}
                </span>
              )
            )}
          </nav>
          <a
            href="/login"
            className="border border-paper/70 px-4 py-2 font-mono text-xs tracking-[0.15em] text-paper hover:bg-paper hover:text-ledger"
          >
            CONNEXION
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl">
          <aside
            aria-hidden="true"
            className="hidden w-10 shrink-0 border-r border-border pt-24 md:flex md:justify-center"
          >
            <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[11px] tracking-[0.2em] text-ink-muted">
              ÉCRITURE N° 2026-0417 · FOLIO 03
            </span>
          </aside>

          <div id="hero" className="flex-1 px-6 py-16 md:px-12 md:py-20">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h1 className="max-w-xl font-serif text-4xl leading-[1.12] text-ink sm:text-5xl md:text-6xl">
                  Chaque rôle, chaque siège, chaque facture est une écriture numérotée.
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80">
                  Crewbase gère les membres, les rôles et l&apos;abonnement d&apos;une petite
                  équipe. Les permissions sont appliquées dans la base de données, pas
                  seulement masquées dans l&apos;interface : une action non autorisée est
                  refusée, jamais silencieusement acceptée.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <StampBadge />
                <p className="max-w-[15rem] font-mono text-[11px] leading-relaxed text-ink-muted md:text-right">
                  Portée du registre : 1 organisation, sièges illimités en lecture,
                  journal d&apos;audit conservé 12 mois.
                </p>
              </div>
            </div>

            <div id="tarifs" className="mt-12 scroll-mt-24 overflow-x-auto border border-border">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <caption className="sr-only">
                  Comparatif des formules Solo, Équipe et Étude
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="bg-ledger" aria-hidden="true" />
                    {PLANS.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className={`bg-ledger px-5 py-4 text-left align-top text-paper ${
                          plan.highlighted ? "border-t-4 border-t-stamp" : ""
                        }`}
                      >
                        <span className="block font-mono text-xs font-semibold tracking-[0.15em]">
                          {plan.name.toUpperCase()}
                        </span>
                        <span className="mt-2 block font-serif text-3xl">{plan.price}</span>
                        <span className="mt-2 block font-mono text-[10px] leading-snug tracking-[0.05em] text-paper/70">
                          {plan.priceNote}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, rowIndex) => (
                    <tr
                      key={row.label}
                      className={rowIndex % 2 === 1 ? "bg-ledger-tint" : "bg-paper"}
                    >
                      <th
                        scope="row"
                        className="border-t border-border px-5 py-3 text-left font-mono text-xs font-semibold text-ink"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, colIndex) => (
                        <td
                          key={PLANS[colIndex].id}
                          className={`border-t border-border px-5 py-3 font-mono text-xs ${
                            value === "Oui" ? "font-semibold text-stamp" : "text-ink/80"
                          } ${PLANS[colIndex].highlighted ? "border-x border-x-border" : ""}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="border-t border-border px-5 py-4 align-top font-mono text-[10px] leading-relaxed text-ink-muted">
                      Prix hors taxes. Toute modification de plan crée une écriture au
                      registre.
                    </td>
                    {PLANS.map((plan) => (
                      <td
                        key={plan.id}
                        className={`border-t border-border px-5 py-4 align-top ${
                          plan.highlighted ? "border-x border-x-border border-b" : ""
                        }`}
                      >
                        <a
                          href={plan.cta.href}
                          className={`block border px-4 py-2 text-center font-mono text-xs font-semibold tracking-[0.1em] ${
                            plan.cta.variant === "filled"
                              ? "border-stamp bg-stamp text-paper hover:bg-stamp/90"
                              : "border-ink text-ink hover:bg-ink hover:text-paper"
                          }`}
                        >
                          {plan.cta.label.toUpperCase()}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-16 grid gap-10 border-t border-ink pt-8 md:grid-cols-3">
              {VALUE_PROPS.map((item) => (
                <div key={item.number}>
                  <p className="font-mono text-xs font-semibold text-stamp">{item.number}</p>
                  <h2 className="mt-3 font-serif text-xl text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 font-mono text-[10px] tracking-[0.1em] text-paper/70 sm:flex-row sm:items-center sm:justify-between md:px-12">
          <span>CREWBASE · REGISTRE D&apos;ÉQUIPE</span>
          <span>DONNÉES DE DÉMONSTRATION · AUCUN CLIENT RÉEL</span>
        </div>
      </footer>
    </>
  );
}
