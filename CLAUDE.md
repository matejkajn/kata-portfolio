# kata-portfolio — Project Instructions

A personal portfolio web application. Built from designs created in Figma, styled with Tailwind, backed by Supabase.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript (strict mode).
  - Note: the brief refers to this as a "React TypeScript application." The repo is scaffolded with Next.js — work within the App Router (`src/app/`), do not migrate to plain CRA/Vite.
- **Styling:** Tailwind CSS v4 (configured via `@tailwindcss/postcss`; theme/config lives in `src/app/globals.css`, not a `tailwind.config.js`).
- **Backend:** Supabase — the content store and backing data layer for the site's CMS. It holds all manageable content (images first; articles, text, and other portfolio content later) that the public site reads from and that Iteration 2's admin page will edit.
- **Path alias:** `@/*` → `./src/*`.

## Commands

- `npm run dev` — local dev server.
- `npm run build` — production build (run before considering a feature done).
- `npm run lint` — ESLint (`eslint-config-next`).

## Iterations

The project ships in two iterations. **Focus only on Iteration 1.** Do not build admin/CMS features unless explicitly asked.

### Iteration 1 (current scope)
Build the fully functional public-facing portfolio: a React/Next.js + TypeScript app, styled per the Figma designs, with a Supabase backend that serves content — for now, primarily **images**. Implement all the pages defined in the designs, responsive across the desktop and mobile variants.

### Iteration 2 (later — out of scope for now)
A very simple administration page to edit all portfolio content: articles, adding images, text, etc. Do not start this until Iteration 1 is complete and the user asks.

## Designs / Knowledge Base

Figma exports live in `.knowledge/raw/` as PDFs, one per page in both **desktop** (`*_desktop.pdf`) and **mobile** (`*_mobil.pdf`) variants. Read these as the source of truth for layout, spacing, and visuals. Notable pages:

- `domu_*` — home page ("domů").
- `portfolio_*` — portfolio listing.
- `menu_mobil.png` — mobile navigation menu.
- Individual project/case-study pages: `praguepride_*`, `activeestatesro_*`, `gabrielamladkova_*`, `fusionfitnes_*` / `fusionfitness_*`, `vidix_*`, `tanecliberec_*`, `latkyrudolf_*`, `roberthajek_*`.
- `figma.rtf` — additional Figma reference notes.

`.knowledge/` is a structured knowledge base with its own conventions — see `.knowledge/CLAUDE.md`. The `raw/` folder is immutable source-of-truth; never modify it.

## Conventions

- Match the existing code style in `src/app/` (naming, formatting, idioms).
- Build for the responsive breakpoints shown in the desktop/mobile design pairs.
- Keep secrets (Supabase keys) in environment variables, never committed.
- Commit messages must not include any Claude co-authorship attribution (no `Co-Authored-By: Claude` trailer, no "Generated with Claude Code" line).

### React + TypeScript Best Practices

Always follow React + TypeScript best practices. Treat the following as hard rules:

- **Small, single-responsibility components.** Split large components into smaller ones. A component that grows past a screenful or mixes unrelated concerns should be broken up. Prefer composition over big monolithic components.
- **Reusable components.** Extract shared UI (buttons, cards, layout primitives, image blocks, etc.) into reusable components rather than duplicating markup. Keep them generic and prop-driven.
- **Separate hooks from components.** Custom hooks live in their own files (e.g. `src/hooks/useX.ts`), not inline inside component files. Components consume hooks; they don't define them. Extract any non-trivial stateful or side-effecting logic out of the component and into a custom hook.
- **Strong typing.** Strict mode is on — no implicit `any`. Type all props, state, hook returns, and Supabase data with explicit interfaces/types. Prefer precise types and discriminated unions over loose ones.
- **Clear file structure.** Group by concern — e.g. `components/` (reusable UI), `hooks/` (custom hooks), `lib/` (Supabase client, utilities), `types/` (shared types). One component per file; name the file after the component.
- **Separation of concerns.** Keep data fetching, business logic, and presentation apart. Presentational components stay dumb; logic lives in hooks or `lib/`.
- **Avoid duplication (DRY).** Factor repeated logic and markup into shared hooks, components, or helpers.
