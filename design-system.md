# Architecture Notes — Design System

Design system extracted from the "Offline-First, in the Field" architecture-notes artifact. Grounded in the towing/dispatch domain — asphalt, steel, and a beacon amber — rather than a generic tech palette.

## Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#ECEAE4` | `#10141A` | Page background (concrete paper / asphalt) |
| `--bg-raised` | `#F8F7F3` | `#191F27` | Cards, diagram nodes |
| `--bg-sunken` | `#DFDCD3` | `#0B0E12` | Recessed surfaces |
| `--text` | `#191D22` | `#E9E5DC` | Primary ink |
| `--text-dim` | `#565C64` | `#8B93A0` | Secondary text — blue-grey tinted, not neutral grey |
| `--border` | `#D2CFC5` | `#2A313C` | Hairlines, node borders |
| `--accent` | `#A8641E` | `#E8A33D` | Beacon amber — the one bold color; used sparingly (eyebrows, emphasis nodes, callout rule) |
| `--accent2` | `#35678A` | `#74A6CC` | Steel blue — secondary accent for connectors/arrows and data emphasis |
| `--code-bg` | `#E1DED3` | `#1C222B` | Inline `code` chips |
| `--accent-soft` | `rgba(168,100,30,0.10)` | `rgba(232,163,61,0.14)` | Amber tint for glow/callout backgrounds |
| `--shadow` | `rgba(25,29,34,0.08)` | `rgba(0,0,0,0.35)` | Reserved for raised elements |

**Rule of thumb:** amber marks *"this is the important thing"*; steel marks *"this is a system relationship."* They never compete — amber is spent in one place per section at most.

Theming is token-driven: base values live on `:root`, overridden under `@media (prefers-color-scheme: dark)`, then overridden again by `:root[data-theme="light"]` / `:root[data-theme="dark"]` so an explicit viewer toggle always wins over the OS preference.

## Type

Two-role system-font pairing — no webfonts, no CDN risk.

| Role | Stack | Used for |
|---|---|---|
| Display / labels / data | `ui-monospace, "SF Mono", "SFMono-Regular", "IBM Plex Mono", Menlo, Consolas, "Liberation Mono", monospace` | `h1`/`h2`, eyebrows, diagram node labels, stat numbers, chips |
| Body | `Charter, "Iowan Old Style", "Palatino Linotype", Georgia, serif` | All prose, ~65ch measure |

A monospace headline is the deliberate choice — it reads as an engineering log / terminal readout, not a marketing display face. The serif body is there for contrast and warmth against it.

**Numerals:** `font-variant-numeric: tabular-nums` on the stat strip so digits align in columns.

### Type scale

| Size | Usage | Notes |
|---|---|---|
| `0.62–0.72rem` | Eyebrows, arrow labels, stat labels | `letter-spacing: 0.06–0.14em`, uppercase |
| `0.78–0.87rem` | Byline, chips, `node-sub`, inline code | mono |
| `0.95–0.98rem` | Callout body | serif |
| `1.0625rem` | Base body text | serif, `line-height: 1.65` |
| `1.32rem` | `h2` (section titles) | mono, `font-weight: 700` |
| `clamp(1.6rem, 4vw, 2.35rem)` | `h1` (hero title) | mono, `text-wrap: balance`, max `30ch` |

## Layout

- Single-column memo, content `max-width: 46rem`, centered.
- Sections separated by a hairline `border-top`, not cards — a document, not a dashboard.
- Section anatomy: eyebrow → mono `h2` → diagram → prose → amber-left-border "Why it matters" callout.
- **Diagrams:** CSS-only — a flex row of bordered "node" boxes joined by arrow glyphs (`→`, `⇉`, `+`). Wrapped in its own `overflow-x: auto` container so a wide diagram scrolls independently and the page body never does.
- **Radius:** sharp `3–4px` throughout — a schematic/manifest feel, deliberately not the rounded-card default.
- **Motion:** one moment only — a slow (7s), low-opacity radial "beacon glow" pulsing behind the hero title. Disabled under `prefers-reduced-motion: reduce`.
- **Stat strip:** CSS grid, `auto-fit, minmax(7.5rem, 1fr)`, 1px hairline gaps forming a table-like readout.

## Components

- **Chip** — mono, `0.72rem`, 1px border, `3px` radius, `--bg-raised` fill. Used for stack tags and module-router names.
- **Node** — diagram building block: bordered box with a mono title + dim mono subtext. `.emphasis` variant adds an amber border + soft glow ring for the node the section is actually about. `.muted` variant (strikethrough, reduced opacity) marks something deprecated/removed (e.g. the retired global `AppRouter`).
- **Callout** — 2px amber left border, amber-tinted background, `0 4px 4px 0` radius, small mono uppercase tag ("Why it matters") above a serif sentence.
- **Inline code** — mono, `--code-bg` background, `3px` radius, `0.87em`.

## Principles

1. One accent, spent deliberately — never decorative.
2. Every structural device (eyebrow, node emphasis, callout) encodes real meaning, not just visual rhythm.
3. Diagrams are built from real DOM boxes, not illustration — legible, scrollable, theme-aware.
4. Type pairing (mono + serif) is chosen for the *subject* (a technical field-ops memo), not defaulted to a generic sans/serif combo.
