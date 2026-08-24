# Brief de direction — Crewbase (dashboard-saas)

Confirmé par Victor le 2026-08-24, à l'issue de `/impeccable shape` (sous-étape 2.1 de PLAN.md).

## 1. Job et audience

Deux publics : le persona fictif du produit (owner/admin/membre d'une petite équipe B2B qui gère son organisation — inviter, attribuer des rôles, suivre l'abonnement) et le public réel de la démo (recruteurs/clients qui évaluent le book de Victor et doivent croire à un vrai produit SaaS professionnel). Le brief sert les deux en même temps : chaque écran doit à la fois fonctionner pour le persona et convaincre l'évaluateur.

## 2. Résultat et preuve

Résultat : un parcours complet et crédible (marketing/pricing → connexion/inscription → dashboard → équipe/rôles → abonnement) où les permissions sont réellement appliquées en base (RLS), pas seulement affichées. Preuve : aucune preuve sociale fabriquée (pas de faux logos, témoignages ou chiffres) — la crédibilité vient de l'exécution, pas d'une fausse traction.

## 3. Direction sélectionnée

**Le registre à tampons** — monde du registre notarié / journal d'audit à tampons, choisi via le tirage dirigé (`concept-seed.mjs --scope direction --mode persuade`, seed `a30b735e`, index assigné 5), confirmé par Victor sur la page de décision face à la matrice de permissions (pick) et 6 challengers du catalogue.

- **Thèse** : chaque plan, chaque rôle, chaque facture est une écriture de registre numérotée — rien ne se modifie en silence, tout est tamponné.
- **Palette/matériaux** : registre à bandes vertes et blanches (vert profond `#1E4D3A` / blanc quasi-pur `#FDFDFB`), encre bleu-noir `#14202B` pour le texte et les filets, rouge tampon `#C23B22` pour les statuts et validations. Stratégie de couleur "Committed" — le vert de registre porte la page, le rouge tampon signale l'état.
- **Premier viewport (page tarifaire)** : page plein cadre rendue comme une écriture de registre vert-et-blanc, les formules d'abonnement en colonnes réglées, un numéro d'écriture séquentiel en marge, un tampon rouge certifiant l'essai gratuit comme une entrée autorisée.
- **Raises retenus** (disciplines empruntées aux challengers déclinés/compétitifs, à intégrer) :
  - *du web japonais haute densité* : les écrans Operate (dashboard, équipe, facturation) adoptent une densité en modules à filets fins, pour que le registre reste dense plutôt que de se vider en grille marketing générique.
  - *du BBS ANSI* : les tableaux du registre se verrouillent sur une vraie grille monospace à colonnes dures, sans ombre de carte.
  - *de l'oscilloscope* (décliné aussi sur un motif factuel : collision avec l'identité "Instrument Panel" de portfolio-victor, donc aucun cadran/chrome d'instrument) : les statuts (en attente/actif/révoqué/en retard) se lisent instantanément via un système de tampons colorés.
- **Risque assumé** : peut lire comme froid/bureaucratique si les tampons et les vrais faits produit n'apportent pas assez de vie — à surveiller en construction.

## 4. Périmètre et limites

Les 5 surfaces en une seule passe de monde visuel : page marketing/pricing (Persuade), connexion/inscription, dashboard protégé avec sidebar, gestion d'équipe/rôles, abonnement/facturation (Operate pour ces quatre dernières). Rien d'existant à préserver (projet greenfield). Anti-buts explicites : pas de dégradés violet/bleu génériques, pas d'illustrations stock growth-chart/fusée, pas de mise en page Tailwind UI non retouchée, pas de chrome d'instrument façon Instrument Panel.

## 5. États et plages

Auth : première visite, erreur de connexion, session expirée. Équipe : liste vide (juste le owner), liste avec plusieurs membres, membre en attente d'invitation, tentative d'action sans droit (doit être bloquée réellement, pas juste grisée). Abonnement : aucun plan actif, plan actif, paiement en échec (Stripe test). Contenu de test explicitement générique, jamais présenté comme de vraies données clients.

## 6. Interaction et mise en page

Grammaire de registre appliquée à toute l'app : numérotation séquentielle des entrées, tampons colorés comme seul vecteur de statut, grille monospace stricte pour les tableaux (équipe, facturation), colonnes réglées pour les plans tarifaires. Accessibilité WCAG AA (contraste du rouge tampon sur fond clair à vérifier en construction, navigation clavier complète).

## 7. Contraintes et décisions ouvertes

- Stack : Next.js (App Router) + TypeScript + Tailwind CSS + Supabase + Stripe test (déjà scaffoldé, étape 1 terminée).
- Build path : **code-led** (pas de génération d'image, pas de clé OpenAI) — l'ambition de la direction se porte dans le contrat de direction au moment de la construction, pas dans un comp visuel.
- Langue de l'interface : français.
- Nom de produit fictif : à choisir en construction, ex. "Crewbase" (proposé dans PRODUCT.md, pas encore verrouillé).
- Prochaine étape (hors périmètre de cette session) : sous-étape 2.2 — Victor soumet ce brief à Claude Design (claude.ai) pour obtenir une maquette haute-fidélité, itère jusqu'à validation visuelle, dépose l'image dans `.impeccable/mocks/external/`.
