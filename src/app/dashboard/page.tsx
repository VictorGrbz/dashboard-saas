const JOURNAL_ENTRIES = [
  { number: "0417", label: "Session ouverte", author: "victor@…", date: "24.08", time: "14:02" },
  {
    number: "0416",
    label: "Rôle modifié · membre → admin",
    author: "victor@…",
    date: "24.08",
    time: "11:47",
  },
  {
    number: "0415",
    label: "Invitation émise · claire.b@…",
    author: "victor@…",
    date: "22.08",
    time: "09:20",
  },
  {
    number: "0414",
    label: "Prélèvement accepté · 72,00 €",
    author: "stripe",
    date: "01.08",
    time: "06:00",
  },
  {
    number: "0413",
    label: "Siège ajouté · nadia.k@…",
    author: "sofia@…",
    date: "28.07",
    time: "16:31",
  },
  { number: "0412", label: "Session expirée", author: "système", date: "27.07", time: "18:00" },
  {
    number: "0411",
    label: "Accès refusé · RLS team_members_update",
    author: "karim@…",
    date: "26.07",
    time: "10:12",
  },
  {
    number: "0410",
    label: "Invitation acceptée · sofia@…",
    author: "sofia@…",
    date: "20.07",
    time: "08:44",
  },
];

const ROLE_BREAKDOWN = [
  { role: "OWNER", count: 1 },
  { role: "ADMIN", count: 2 },
  { role: "MEMBRE", count: 3 },
];

export default function DashboardPage() {
  const maxCount = Math.max(...ROLE_BREAKDOWN.map((r) => r.count));

  return (
    <div className="px-8 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-serif text-3xl text-ink">État du registre</h1>
        <div className="flex gap-3">
          <span
            aria-disabled="true"
            className="border border-border px-4 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted"
          >
            EXPORTER LE FOLIO
          </span>
          <a
            href="/dashboard/team"
            className="border border-stamp bg-stamp px-4 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-paper hover:bg-stamp/90"
          >
            INVITER UN MEMBRE
          </a>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 divide-x divide-border border border-border md:grid-cols-4">
        <div className="p-5">
          <p className="font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
            SIÈGES OCCUPÉS
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            6 <span className="text-lg text-ink-muted">/ 25</span>
          </p>
        </div>
        <div className="p-5">
          <p className="font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
            INVITATIONS EN ATTENTE
          </p>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-serif text-3xl text-ink">1</p>
            <span className="border border-border px-2 py-0.5 font-mono text-caption text-ink-muted">
              EN ATTENTE
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
            PLAN
          </p>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-serif text-3xl text-ink">Équipe</p>
            <span className="border border-stamp px-2 py-0.5 font-mono text-caption font-semibold text-stamp">
              ACTIF
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted">
            PROCHAINE ÉCHÉANCE
          </p>
          <p className="mt-2 font-serif text-3xl text-ink">
            01.09 <span className="text-lg text-ink-muted">72,00 €</span>
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-serif text-xl text-ink">Journal des écritures</h2>
            <span
              aria-disabled="true"
              className="font-mono text-caption text-ink-muted"
            >
              12 DERNIÈRES · TOUT VOIR
            </span>
          </div>

          <div className="mt-4 overflow-x-auto border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">Journal des écritures du registre</caption>
              <thead>
                <tr>
                  <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                    N°
                  </th>
                  <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                    ÉCRITURE
                  </th>
                  <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                    AUTEUR
                  </th>
                  <th scope="col" className="bg-ledger px-4 py-3 text-left font-mono text-caption font-semibold tracking-[0.1em] text-paper">
                    HORODATAGE
                  </th>
                </tr>
              </thead>
              <tbody>
                {JOURNAL_ENTRIES.map((entry, index) => (
                  <tr key={entry.number} className={index % 2 === 1 ? "bg-ledger-tint" : "bg-paper"}>
                    <td className="border-t border-border px-4 py-3 font-mono text-caption text-stamp">
                      {entry.number}
                    </td>
                    <td className="border-t border-border px-4 py-3 text-sm text-ink">{entry.label}</td>
                    <td className="border-t border-border px-4 py-3 font-mono text-caption text-ink-muted">
                      {entry.author}
                    </td>
                    <td className="border-t border-border px-4 py-3 font-mono text-caption text-ink-muted">
                      {entry.date} · {entry.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-caption text-ink-muted">
            CONTENU DE DÉMONSTRATION · AUCUNE DONNÉE CLIENT RÉELLE
          </p>
        </div>

        <div className="min-w-0 space-y-8">
          <div>
            <h2 className="font-serif text-xl text-ink">Répartition des rôles</h2>
            <div className="mt-4 space-y-3">
              {ROLE_BREAKDOWN.map((row) => (
                <div key={row.role} className="flex items-center gap-3">
                  <span className="w-16 font-mono text-caption font-semibold tracking-[0.05em] text-ink-muted">
                    {row.role}
                  </span>
                  <span className="h-2 flex-1 bg-border">
                    <span
                      className="block h-2 bg-ink"
                      style={{ width: `${(row.count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="w-4 text-right font-mono text-caption text-ink">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Abonnement</h2>
            <dl className="mt-4 space-y-2 border border-border p-4 text-sm">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <dt className="font-mono text-caption text-ink-muted">PLAN</dt>
                <dd className="text-right text-ink">Équipe · 12 €/siège</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <dt className="font-mono text-caption text-ink-muted">SIÈGES FACTURÉS</dt>
                <dd className="text-right text-ink">6</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <dt className="font-mono text-caption text-ink-muted">MODE DE PAIEMENT</dt>
                <dd className="text-right font-mono text-caption text-ink">VISA •••• 4242</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-border pt-2">
                <dt className="font-mono text-caption font-semibold text-ink">TOTAL MENSUEL</dt>
                <dd className="text-right font-semibold text-ink">72,00 €</dd>
              </div>
            </dl>
            <a
              href="/dashboard/billing"
              className="mt-3 block border border-ink px-4 py-2 text-center font-mono text-caption font-semibold tracking-[0.1em] text-ink hover:bg-ink hover:text-paper"
            >
              GÉRER L&apos;ABONNEMENT
            </a>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Invitation en attente</h2>
            <div className="mt-4 border border-dashed border-border p-4">
              <p className="text-sm text-ink">claire.b@atelier-demo.fr</p>
              <p className="mt-1 font-mono text-caption text-ink-muted">
                Rôle proposé : membre · émise le 22.08 · expire le 29.08
              </p>
              <div className="mt-3 flex gap-2">
                <span
                  aria-disabled="true"
                  className="border border-border px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-ink-muted"
                >
                  RENVOYER
                </span>
                <span
                  aria-disabled="true"
                  className="border border-stamp/50 px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-stamp/60"
                >
                  RÉVOQUER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
