import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crewbase — le registre d'équipe",
  description:
    "Crewbase gère les membres, les rôles et l'abonnement d'une équipe. Les permissions sont appliquées dans la base, pas seulement masquées dans l'interface.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      {/* THESIS: chaque plan, role et facture est une ecriture de registre numerotee ; rien ne se modifie en silence.
          OWN-WORLD: registre vert-et-blanc (#1E4D3A / #FDFDFB), encre #14202B, tampon rouge #C23B22 ; monospace tabulaire pour ecritures et donnees, serif pour titres et corps.
          STORY: le visiteur comprend que Crewbase applique les permissions en base (RLS), jamais juste en UI, et que rien n'est fabrique (aucune preuve sociale inventee).
          FIRST VIEWPORT: page tarifs pleine largeur, marge de folio a gauche, tampon "ESSAI 14 JOURS" en haut a droite, tableau tarifaire en ecritures de registre.
          FORM: registre a tampons, candidat #5 de la liste ordonnee, seed a30b735e.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance. */}
      <body className="min-h-full flex flex-col bg-paper text-ink font-serif">
        {children}
      </body>
    </html>
  );
}
