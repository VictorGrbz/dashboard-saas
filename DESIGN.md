---
name: Crewbase
description: Registre d'équipe B2B — chaque rôle, siège et facture est une écriture numérotée, jamais modifiée en silence
colors:
  ledger: "#1E4D3A"
  ledger-tint: "#F2F7F3"
  ink: "#14202B"
  ink-muted: "#60726F"
  stamp: "#C23B22"
  paper: "#FDFDFB"
  paper-margin: "#E7E3D8"
  border: "#DDDFE0"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw + 1rem, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.12
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.15em"
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.05em"
spacing:
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "0px"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.stamp}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "0px"
    padding: "8px 16px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  table-header:
    backgroundColor: "{colors.ledger}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "16px 20px"
---

# Design System: Crewbase

## Overview

**Creative North Star: "Le registre à tampons"**

Crewbase reads as a notarial ledger, not a SaaS marketing page. The world's governing idea is that every plan, role, and invoice is a numbered ledger entry: nothing changes silently, everything is stamped. This lands as a deep-green-and-white register (bandes vertes et blanches), blue-black ink for text and rule lines, and a red stamp reserved for status and validation. The color strategy is committed, not decorative: green carries the page, red interrupts it to mean something.

The build rejects the generic SaaS vocabulary on purpose: no purple/blue gradients, no stock growth-chart or rocket illustration, no untouched Tailwind-UI layout, no instrument-panel chrome (dials, gauges — reserved by a sibling portfolio identity). Density comes from a strict monospace grid for tabular data, borrowed from high-density Japanese web layout and BBS/ANSI table conventions: hard column rules, no card shadows, no soft elevation.

**Key Characteristics:**
- Ledger green + near-white paper carry the page; stamp red is the only status/validation signal.
- Serif for prose and headlines, tabular monospace for anything that is data, a label, or a number.
- Flat throughout — no box-shadow anywhere in the shipped CSS; depth is conveyed by rules, fills, and the stamp device, not by elevation.
- Sequential entry numbering (folio/écriture numbers, "01/02/03" value props) is the recurring signature, not a one-off flourish.

## Colors

The palette is two committed registers: a green-and-white ledger surface, and a single red stamp reserved for state.

### Primary
- **Ledger Green** (`#1E4D3A`): the register's dominant surface — header bar, footer, table header row, pricing-table th backgrounds. Carries white/paper text on top of it.

### Secondary
- **Stamp Red** (`#C23B22`): reserved exclusively for state and validation — the trial stamp badge, "Oui" affirmatives in the comparison table, the highlighted plan's top border, the filled CTA, `::selection` and `:focus-visible`. Never used as a decorative accent.

### Neutral
- **Ink** (`#14202B`): body text, headline text, borders on outline buttons, footer background.
- **Ink Muted** (`#60726F`): secondary/supporting copy (folio marginalia, footnote text, price sub-notes at 70% opacity on green).
- **Paper** (`#FDFDFB`): base page background and text-on-dark color (over ledger green or ink).
- **Ledger Tint** (`#F2F7F3`): alternate row fill in the pricing/feature table (zebra striping on a registered grid, not a card background).
- **Paper Margin** (`#E7E3D8`): reserved margin/folio tone (declared as a token; not yet drawn on in this surface's shipped markup — carry forward, don't drop).
- **Border** (`#DDDFE0`): all hairline rules — table borders, column dividers, the folio-rail divider.

### Named Rules
**The One Stamp Rule.** Stamp red never appears as page decoration. It only marks a status, a validation, an affirmative, or an interactive commit point (trial badge, "Oui", highlighted-plan accent, filled CTA, selection/focus). If a use of stamp red isn't state, it's wrong.

## Typography

**Display/Body Font:** Source Serif 4 (with Georgia, serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace fallback)

**Character:** A notarial pairing — serif carries authored prose (headlines, body, section titles) with a restrained, unhurried voice; monospace carries anything that is a record, a label, or a number (nav, buttons, table headers, table data, folio marginalia, stamp text), always tracked wide and often uppercase to read as a stamped or typewritten entry.

### Hierarchy
- **Display** (400, `clamp(2.25rem, 4vw + 1rem, 3.75rem)`, 1.12 line-height, serif): the hero thesis statement only.
- **Title** (400, 1.25rem/20px, serif): value-prop and section subheads.
- **Body** (400, 1rem/16px, 1.625 line-height, serif): supporting paragraph copy, capped near max-w-md/max-w-xl containers (~55–65ch).
- **Label** (600, 0.75rem/12px, 0.15em tracking, mono, uppercase): nav items, buttons, plan names, stamp headline text.
- **Data** (400, 0.75rem/12px, 0.05em tracking, mono): table cell values, price sub-notes, footer legal line — not bolded unless it's a stamped affirmative ("Oui" is bold + stamp-red).

### Named Rules
**The Record Is Mono Rule.** Anything that functions as a record — a table cell, a number, a nav label, a legal/provenance line, an entry number — renders in IBM Plex Mono. Anything that is authored prose — headline, body paragraph, section title — renders in Source Serif 4. Mixing the two inside one text run doesn't happen.

## Layout

The page runs a centered `max-w-6xl` container with `px-6 md:px-12` gutters. Header and footer are full-bleed color blocks (ledger green, ink) with the same centered container inside them for alignment.

The main content area optionally exposes a fixed-width left folio rail (`w-10`, border-right, hidden below `md`) carrying a vertical (`writing-mode: vertical-rl`), rotated, tracked-out entry number in muted ink mono — a marginal annotation, not a nav element.

Pricing/comparison data renders as a real HTML `<table>` inside a bordered container (`overflow-x-auto`, `min-w-[720px]` to force horizontal scroll on narrow viewports rather than reflowing the grid) — the table is never simulated with flex/grid divs. Feature rows alternate `paper` / `ledger-tint` for scan-line legibility. The highlighted plan column gets side borders (`border-x-border`) to read as a physically ruled-off entry within the register.

Section rhythm below the fold uses a top rule (`border-t border-ink`) before a 3-column value-prop grid (`gap-10`, stacks to 1 column below `md`).

## Elevation & Depth

Flat throughout. No `box-shadow` appears anywhere in the shipped CSS or component markup. Depth and hierarchy are conveyed entirely by fill contrast (ledger green vs. paper vs. ledger-tint), hairline borders (`--color-border`), and the stamp device's own ink-bleed rendering — never by elevation or blur.

### Named Rules
**The No-Shadow Rule.** Surfaces do not lift. A ledger page lies flat on a desk; nothing here casts a shadow. Emphasis is built with fill, rule lines, and the stamp, not with box-shadow or blur.

## Shapes

Square corners everywhere (`border-radius: 0` on every button, table, badge, container observed in the build) — the register does not round its edges. Borders are hairline (1px, `--color-border`) for structural rules, escalating to `border-t-4` in stamp red only to flag the highlighted plan. The one deliberately irregular silhouette in the system is the stamp badge: a `-rotate-3` tilted rectangle with two overlaid SVG rects distorted via `feTurbulence`/`feDisplacementMap` filters (an ink-bleed border, not a clean rule) — the sanctioned exception to the otherwise ruler-straight geometry, because it reads as a physically stamped mark rather than a UI chrome element.

## Components

### Buttons
- **Shape:** square corners (0px radius), 1px border on outline variant, no border on filled.
- **Primary (filled):** `background: var(--color-stamp)`, `color: var(--color-paper)`, label typography, `padding: 8px 16px` (`px-4 py-2`); reserved for the highest-commitment CTA (start trial).
- **Secondary (outline):** `border: 1px solid var(--color-ink)`, `color: var(--color-ink)`, transparent background; hover inverts to `background: var(--color-ink)`, `color: var(--color-paper)`.
- **Header CTA variant:** outline on `--color-paper/70` border over ledger green, hover inverts to solid paper background with ledger-green text.
- **Hover / Focus:** color-inversion hovers (no transform, no shadow); `:focus-visible` is themed system-wide — `outline: 2px solid var(--color-stamp)`, `outline-offset: 2px` — not per-component.

### Cards / Containers
- No card component exists in this build. The register avoids the card metaphor entirely — content lives inside bordered table cells and rule-separated sections, not in shadowed/rounded boxes.

### Tables (signature pattern)
- **Corner Style:** square, `border-collapse`, outer 1px `--color-border` frame.
- **Header:** `background: var(--color-ledger)`, `color: var(--color-paper)`, label typography; highlighted column gets `border-top: 4px solid var(--color-stamp)`.
- **Body rows:** alternate `--color-paper` / `--color-ledger-tint`; data typography; affirmative values (`"Oui"`) render bold in stamp red — the only in-cell color deviation.
- **Footer row:** legal/provenance note in muted-ink data typography, left-aligned under the row-label column.

### Navigation
- Header nav items are mono label typography at `text-paper/85`, hover to full-opacity paper, no underline, no background pill. Disabled/未-linked items (e.g. "Documentation") render at `text-paper/40` with `aria-disabled` — greyed rather than removed, signaling roadmap rather than broken links.

### Stamp Badge (signature component)
The system's one bespoke device: a rotated (`-rotate-3`) rectangle carrying mono label text, framed by two overlaid SVG borders distorted through `feTurbulence` + `feDisplacementMap` (`stamp-ink`, `stamp-ink-bleed` filters) in `currentColor` (stamp red). Used to certify a state as authorized/validated (currently: the 14-day trial). This is the system's only permitted irregular/hand-marked visual element — reserve it for genuine certifications, not decoration.

## Do's and Don'ts

### Do:
- **Do** render anything tabular, numeric, or record-like in IBM Plex Mono with wide tracking; reserve Source Serif 4 for authored prose and headlines.
- **Do** keep every corner square (0px radius) — buttons, tables, badges, containers.
- **Do** use `--color-stamp` only for state (validation, affirmative, highlighted commitment, selection/focus) — never as page decoration.
- **Do** build tabular data as real `<table>` markup with a bordered frame and zebra rows, not simulated grid/flex layouts.
- **Do** keep the page flat: no `box-shadow`, no blur, no card elevation.

### Don't:
- **Don't** add gradients, especially purple/blue SaaS gradients — confirmed anti-reference in the direction contract.
- **Don't** add card shadows or rounded corners to any container — the register is flat and square by invariant, not by oversight.
- **Don't** add instrument-panel chrome (dials, gauges, cockpit framing) — explicitly reserved by a sibling portfolio identity and excluded from this world.
- **Don't** fabricate social proof (client logos, testimonials, traction numbers) on marketing surfaces — a durable PRODUCT.md commitment, not a style preference.
- **Don't** apply the stamp's ink-bleed/turbulence distortion to any element other than a genuine certification mark; it is not a general-purpose border texture.
