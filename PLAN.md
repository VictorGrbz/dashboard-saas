# PLAN.md — dashboard-saas

> Cadrage rédigé par Jarvis (session racine). Ce document est destiné à être exécuté par l'Artisan (Claude Code local, ouvert dans ce dossier). L'Artisan lit ce PLAN.md et exécute les étapes une par une, y compris les commandes Impeccable.

---

## Contexte

Projet vitrine 4/6 de la convention définie dans `context/infra.md` (après `demo-vitrine-restaurant`, `demo-boutique-en-ligne`, `demo-reservation-btp`). Une démo fonctionnelle complète d'un dashboard SaaS multi-utilisateurs : authentification, rôles (owner/admin/membre), gestion d'équipe, page abonnement/facturation simulée. Destiné à être ajouté comme entrée dans le portfolio (`portfolio-victor`).

- **Repo** : `VictorGrbz/dashboard-saas` (à créer, public)
- **Dossier workspace** : `livrables/sites-web/dashboard-saas/`
- **Déploiement** : Vercel, sous-domaine `dashboard.jess-vic.ovh`
- **Stack validée** : Next.js (App Router) + TypeScript + Tailwind CSS. Supabase (nouveau projet dédié) pour l'authentification et la base de données (Postgres). Stripe en mode test pour simuler l'abonnement (aucun vrai paiement). Pas de Cloudflare R2 (pas de besoin d'images identifié pour ce projet).
- **Contrainte impérative** : aucun code de production n'est écrit par la session racine (Jarvis). Seul l'Artisan, ouvert directement dans ce dossier, écrit le code.

---

## Étape 0 — Initialisation du dépôt Git

**Objectif** : créer le dépôt Git dédié à ce projet avant tout code.
**Fichiers concernés** : ce `PLAN.md` (premier fichier du dépôt).
**Destination** : `livrables/sites-web/dashboard-saas/` en local, `VictorGrbz/dashboard-saas` sur GitHub.
**Critère de fait** : `git init` exécuté, `gh repo create VictorGrbz/dashboard-saas --public --source=. --remote=origin --push` exécuté avec succès, commit initial poussé (ce `PLAN.md` suffit pour démarrer).

**Note d'exécution** : la commande `/commit` est installée globalement (`~/.claude/commands/`) — l'Artisan doit s'en servir pour tous les commits et push suivants. Lui seul gère désormais le cycle de vie Git de ce projet, le Jarvis racine n'y touche plus après cette étape.

---

## Étape 1 — Initialisation du projet

**Objectif** : scaffolder un projet Next.js (App Router) + TypeScript + Tailwind CSS, structure de dossiers de base.
**Fichiers concernés** : `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`.
**Destination** : `livrables/sites-web/dashboard-saas/`.
**Critère de fait** : `npm run dev` démarre sans erreur, page d'accueil placeholder accessible en local.

---

## Étape 2 — Direction artistique

**Objectif** : obtenir la direction artistique du projet avant toute mise en forme visuelle.
**Fichiers concernés** : le prompt de Direction Artistique ci-dessous (rédigé et validé par Victor).
**Destination** : `/impeccable shape` côté Artisan (jamais `/impeccable teach`/`init`, qui ne capture aucun contenu esthétique et se déclenche de toute façon automatiquement en amont si `PRODUCT.md` n'existe pas encore).
**Critère de fait** : prompt validé par Victor (✅ fait, voir ci-dessous) → brief de direction confirmé produit par `/impeccable shape`.

### Prompt de Direction Artistique (validé)

> **Contexte métier** : dashboard SaaS B2B multi-utilisateurs (outil de gestion d'équipe), démontrant un système complet d'authentification, de rôles et d'abonnement.
>
> **Public visé** : recruteurs/clients qui évaluent le book de Victor — doit donner l'impression d'un vrai produit SaaS professionnel, pas d'une maquette.
>
> **Émotion recherchée** : confiance et sérieux logiciel B2B, clarté et densité d'info maîtrisée, feel "outil de travail quotidien". Distinct du registre "précision technique artisanale" de demo-reservation-btp.
>
> **Distinct des projets précédents** : identité propre, indépendante de "Instrument Panel" (portfolio-victor), "comptoir d'importation" (demo-boutique-en-ligne), "planche technique d'annuaire de design" (demo-reservation-btp). Aucune contrainte de cohérence entre les projets.
>
> **Contraintes fonctionnelles à habiller** : page marketing/pricing, écrans de connexion/inscription, dashboard protégé avec navigation (sidebar), page de gestion d'équipe/rôles, page abonnement/facturation.
>
> **Anti-patterns à éviter** : dégradés violet/bleu génériques de template SaaS, illustrations stock "growth chart"/fusée, mise en page identique aux templates Tailwind UI non retouchés.
>
> **Contraintes techniques** : Next.js (App Router) + Tailwind CSS, accessibilité WCAG AA.

**Note d'exécution pour l'Artisan** : la demande à Impeccable doit être formulée comme une nouvelle direction visuelle complète (jamais une retouche locale), condition nécessaire au déclenchement de la page de décision interactive. Sans clé `OPENAI_API_KEY` configurée, Impeccable ne génère aucune vraie image en interne (uniquement palette de couleurs + description texte) — c'est le comportement normal attendu, pas un bug à signaler. C'est précisément pour ça que le brief part ensuite vers Claude Design plutôt que de compter sur la génération native d'Impeccable, gratuite via l'abonnement Pro déjà payé par Victor.

### Sous-étape 2.1 — Brief de direction (Artisan)

**Objectif** : obtenir un brief de direction confirmé (texte, pas de code, pas de maquette) via `/impeccable shape`, à partir du prompt ci-dessus.
**Fichiers concernés** : le prompt de Direction Artistique rédigé ci-dessus.
**Destination** : `/impeccable shape` côté Artisan.
**Critère de fait** : prompt validé par Victor.

### Sous-étape 2.2 — Maquette haute-fidélité (Victor + Claude Design)

**Objectif** : Victor soumet le brief obtenu en 2.1 à Claude Design (claude.ai) pour générer une maquette haute-fidélité, itère jusqu'à validation visuelle.
**Fichiers concernés** : image finale déposée dans `.impeccable/mocks/external/`.
**Destination** : dossier du projet, référence pour la sous-étape suivante.
**Critère de fait** : image validée visuellement par Victor et déposée dans le dossier.

### Sous-étape 2.3 — Construction sur le mock approuvé (Artisan)

**Objectif** : l'Artisan reprend la main avec l'image de 2.2 comme référence approuvée et construit dessus. Impeccable traite un mock approuvé par l'utilisateur comme un contrat visuel (reproduction quasi pixel-perfect), quelle que soit son origine.
**Fichiers concernés** : composants et pages du projet.
**Destination** : `livrables/sites-web/dashboard-saas/`.
**Critère de fait** : l'interface construite correspond fidèlement au mock approuvé.

---

## Étape 3 — Page marketing/pricing

**Objectif** : présenter le produit fictif et ses plans d'abonnement, dans le style livré par l'étape 2.
**Fichiers concernés** : `src/app/page.tsx`, `src/components/pricing.tsx` (ou équivalent).
**Destination** : route racine du site.
**Critère de fait** : page complète et responsive, cohérente avec la direction artistique validée.

---

## Étape 4 — Authentification (Supabase)

**Objectif** : permettre l'inscription et la connexion d'un utilisateur via Supabase Auth.
**Fichiers concernés** : `src/lib/supabase/{client,server}.ts`, `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`, middleware de session, variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
**Destination** : routes `/login`, `/signup`, protection des routes du dashboard.
**Critère de fait** : un visiteur peut créer un compte, se connecter, se déconnecter ; les routes protégées redirigent vers `/login` si non authentifié.

---

## Étape 5 — Dashboard protégé et navigation

**Objectif** : espace applicatif protégé avec navigation (sidebar) donnant accès aux différentes sections.
**Fichiers concernés** : `src/app/(dashboard)/layout.tsx`, `src/components/sidebar.tsx`, `src/app/(dashboard)/page.tsx`.
**Destination** : route `/dashboard`.
**Critère de fait** : un utilisateur connecté accède au dashboard et navigue entre les sections via la sidebar.

---

## Étape 6 — Gestion d'équipe et rôles

**Objectif** : permettre à un owner/admin d'inviter des membres et de leur attribuer un rôle (owner/admin/membre), avec application réelle des permissions (pas juste un affichage).
**Fichiers concernés** : `src/app/(dashboard)/team/page.tsx`, `src/lib/supabase/schema.sql` (tables `organizations`, `memberships`, politiques Row Level Security), `src/app/(dashboard)/team/actions.ts`.
**Destination** : route `/dashboard/team`.
**Critère de fait** : un owner/admin peut inviter un membre et changer son rôle ; un membre sans droit ne peut pas accéder aux actions réservées (vérifié en base via RLS, pas seulement côté UI).

---

## Étape 7 — Abonnement et facturation (Stripe test)

**Objectif** : simuler le cycle d'abonnement (changement de plan, statut) via Stripe en mode test.
**Fichiers concernés** : `src/app/(dashboard)/billing/page.tsx`, `src/app/api/stripe/webhook/route.ts`, `src/lib/stripe.ts`, variables d'environnement `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` (mode test).
**Destination** : route `/dashboard/billing`.
**Critère de fait** : un utilisateur peut souscrire à un plan via un checkout Stripe test, le statut d'abonnement affiché reflète l'état réel côté Stripe (webhook vérifié).

---

## Étape 8 — Déploiement

**Objectif** : déployer le site sur Vercel et le rattacher au sous-domaine `dashboard.jess-vic.ovh`.
**Fichiers concernés** : configuration Vercel du projet (variables d'environnement Supabase et Stripe), DNS Cloudflare.
**Destination** : `https://dashboard.jess-vic.ovh`.
**Critère de fait** : le site est accessible publiquement en HTTPS, parcours complet (inscription → dashboard → invitation d'un membre → souscription à un plan test) fonctionnel en production.

---

## Étape 9 — Mise à jour du portfolio

**Objectif** : faire passer l'entrée correspondante de `portfolio-victor` du statut "À venir" à "En ligne".
**Fichiers concernés** : `livrables/sites-web/portfolio-victor/src/lib/site-data.ts` (slug à définir, ex. `dashboard-saas`).
**Destination** : `portfolio-victor` (autre projet, autre session Artisan).
**Critère de fait** : la carte correspondante pointe vers `https://dashboard.jess-vic.ovh` et affiche "En ligne".

---

## Finalisation

**Objectif** : passer le filet de sécurité anti-clichés avant toute expédition.
**Fichiers concernés** : l'ensemble du projet.
**Destination** : rapport de `/finaliser`.
**Critère de fait** : `/finaliser` exécuté (audit → critique → validation → polish → doctor côté Impeccable), corrections appliquées. Cette étape rattrape les clichés génériques (polices/motifs surexploités, anti-patterns détectés) que le passage par Claude Design ne filtre pas lui-même, faute du tournoi anti-cliché interne d'Impeccable.

---

## Vérification automatique

- [ ] Configurer un hook `PostToolUse` dans `.claude/settings.json` du dossier `dashboard-saas`, déclenché après `Edit`/`Write` sur les fichiers `*.ts`/`*.tsx`, qui lance `npx tsc --noEmit` (contrôle de types) — à mettre en place par l'Artisan avant de commencer l'étape 1, pour détecter les erreurs de type au fil de l'eau plutôt qu'en fin de build.

---

## Pour Victor

Ouvre une fenêtre VS Code dédiée sur `livrables/sites-web/dashboard-saas/` pour lancer l'Artisan (Claude Code local) et exécuter ce PLAN.md étape par étape, en commençant par l'étape 0 (initialisation du dépôt Git), y compris la sous-étape 2.1 (`/impeccable shape`).
