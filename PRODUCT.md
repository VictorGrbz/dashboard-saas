# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Supabase (Postgres) pour l'authentification et la base de données. Stripe en mode test pour simuler l'abonnement (aucun vrai paiement). Déploiement Vercel. Décidé par Victor avant l'ouverture de ce projet (voir PLAN.md).

## Users

Deux publics à distinguer :
- **Utilisateurs fictifs du produit** (persona simulé à l'intérieur de la démo) : un owner/admin/membre d'une petite équipe B2B qui gère son organisation au quotidien — inviter des collègues, attribuer des rôles, suivre l'abonnement de l'outil.
- **Public réel de la démo** : recruteurs et clients potentiels qui évaluent le book de Victor. Ils doivent avoir l'impression de manipuler un vrai produit SaaS professionnel, pas une maquette.

## Product Purpose

"Crewbase" (nom fictif) est un outil de gestion d'équipe B2B : authentification, rôles multi-utilisateurs (owner/admin/membre), invitation de membres, et abonnement/facturation. Le produit lui-même est fictif ; son but réel est de démontrer, dans le portfolio de Victor, la maîtrise d'un système complet d'auth + rôles + abonnement dans une interface crédible.

## Positioning

Aucune prétention de différenciation marché réelle : c'est une démonstration technique et de direction artistique, pas un produit commercialisé. La crédibilité vient de la qualité d'exécution (clarté, densité d'info maîtrisée, sérieux visuel), pas d'un mécanisme produit unique.

## Operating Context

Parcours couverts : page marketing/pricing → inscription/connexion → dashboard protégé avec sidebar → gestion d'équipe et rôles (RLS appliqué réellement, pas juste affiché) → abonnement/facturation (checkout Stripe test, statut reflété via webhook).

## Capabilities and Constraints

- Auth réelle via Supabase (inscription, connexion, déconnexion, protection de routes).
- Rôles owner/admin/membre avec permissions appliquées en base (Row Level Security), pas seulement en UI.
- Abonnement simulé via Stripe test mode : changement de plan, statut réel reflété par webhook.
- Pas de vrai paiement, pas de vraies données clients.
- Pas de Cloudflare R2 : aucun besoin d'images/fichiers uploadés identifié.
- Nom de produit fictif à choisir clairement distinct de toute marque existante (proposition à trancher en new-work/shape) : ex. "Crewbase".

## Brand Commitments

Nom fictif requis, à choisir de manière à ne créer aucune confusion avec une marque SaaS existante. Aucun logo/testimonial/chiffre de traction fabriqué (voir Evidence on Hand) — la page marketing vend le produit sur ses fonctionnalités et sa clarté, pas sur une fausse preuve sociale.

## Evidence on Hand

Aucune donnée client réelle. Décision explicite de Victor : pas de logos clients, témoignages ou chiffres de traction fabriqués sur la page marketing/pricing, même de façon assumée comme fictive. Les écrans internes (dashboard, équipe) peuvent utiliser des données d'équipe/membres plausibles et clairement génériques (ex. noms de test), sans prétendre représenter de vrais clients.

## Product Principles

1. Crédibilité par l'exécution : chaque écran doit donner l'impression d'un vrai produit livré, pas d'un gabarit.
2. Honnêteté de la preuve : jamais de fausse traction commerciale (logos, chiffres, témoignages inventés).
3. Les permissions sont réelles : un rôle sans droit ne doit jamais pouvoir agir, y compris en contournant l'UI (vérifié côté base via RLS).
4. Densité maîtrisée : clarté et sérieux B2B priment sur l'expressivité visuelle, sans tomber dans le générique.

## Accessibility & Inclusion

Accessibilité WCAG AA exigée sur l'ensemble du produit (contraste, navigation clavier, structure sémantique).
