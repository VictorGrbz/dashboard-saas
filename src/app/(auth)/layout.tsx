const SESSION_ENTRIES = [
  { number: "0417", label: "Session ouverte · owner", time: "14:02" },
  { number: "0416", label: "Rôle modifié · membre → admin", time: "11:47" },
  { number: "0415", label: "Invitation émise · atelier", time: "09:20" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-col justify-between bg-ledger px-8 py-10 text-paper md:w-1/2 md:px-16 md:py-16">
        <a href="/" className="font-mono text-sm font-semibold tracking-[0.15em]">
          CREWBASE
        </a>

        <div className="my-10 md:my-0">
          <h1 className="max-w-sm font-serif text-3xl leading-[1.15] md:text-4xl">
            Toute session ouverte est une écriture.
          </h1>
        </div>

        <div className="hidden border-t border-paper/20 pt-6 md:block">
          <p className="font-mono text-caption tracking-[0.15em] text-paper/50">
            DERNIÈRES ÉCRITURES DE SESSION
          </p>
          <ul className="mt-4 space-y-3">
            {SESSION_ENTRIES.map((entry) => (
              <li key={entry.number} className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-caption text-paper/50">{entry.number}</span>
                <span className="flex-1 font-mono text-caption text-paper/80">{entry.label}</span>
                <span className="font-mono text-caption text-paper/50">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 md:px-16">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
