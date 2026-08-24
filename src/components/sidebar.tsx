"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

const NAV_ITEMS: { label: string; href: string | null }[] = [
  { label: "Tableau de bord", href: "/dashboard" },
  { label: "Équipe & rôles", href: "/dashboard/team" },
  { label: "Abonnement", href: "/dashboard/billing" },
  { label: "Journal d'audit", href: null },
  { label: "Paramètres", href: null },
];

function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="border border-paper/40 px-3 py-1.5 font-mono text-caption font-semibold tracking-[0.1em] text-paper/80 hover:border-paper hover:text-paper"
      >
        FERMER LA SESSION
      </button>
    </form>
  );
}

export function Sidebar({ email }: { email: string | undefined }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col bg-ledger text-paper md:w-60 md:shrink-0 md:justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 px-6 py-5 md:block md:py-6">
          <span className="shrink-0 font-mono text-sm font-semibold tracking-[0.15em]">
            CREWBASE
          </span>
          <span className="min-w-0 flex-1 truncate text-right font-mono text-sm text-paper/80 md:hidden">
            {email}
          </span>
        </div>

        <nav
          aria-label="Navigation du tableau de bord"
          className="flex gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:gap-0 md:overflow-visible md:px-0 md:pb-0"
        >
          {NAV_ITEMS.map((item) => {
            if (!item.href) {
              return (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="shrink-0 whitespace-nowrap px-3 py-2 font-mono text-caption font-semibold tracking-[0.1em] text-paper/40 md:px-6 md:py-3"
                >
                  {item.label.toUpperCase()}
                </span>
              );
            }

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap px-3 py-2 font-mono text-caption font-semibold tracking-[0.1em] md:px-6 md:py-3 ${
                  isActive ? "bg-paper/10 text-paper" : "text-paper/70 hover:text-paper"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden border-t border-paper/20 px-6 py-5 md:block">
        <p className="truncate font-mono text-sm text-paper">{email}</p>
        <div className="mt-3">
          <SignOutButton />
        </div>
      </div>

      <div className="border-t border-paper/20 px-6 py-3 md:hidden">
        <SignOutButton />
      </div>
    </aside>
  );
}
