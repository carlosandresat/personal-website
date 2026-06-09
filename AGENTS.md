# Agent Guidelines & Project Reference

This document provides context for agents working on this personal website repository. Keep modifications aligned with these technologies, design guidelines, and structure.

## Tech Stack
* **Framework:** Next.js 16 (App Router) & React 19
* **Package Manager:** `pnpm` (use `pnpm` for all dependency management and running tasks)
* **Styling:** Tailwind CSS v3 & CSS Variables (defined in `src/app/globals.css`)
* **UI Components:** `shadcn/ui` (Vega/Nova style with Radix primitives)
* **Localization:** `next-intl` (Locales: `en`, `es`. Source strings in `messages/{locale}.json`)
* **Analytics:** `@vercel/analytics`

## File Structure
* `src/app/[locale]/` - Next.js localized page router
* `src/components/` - Main site components (custom layouts, sections)
* `src/components/ui/` - Installed `shadcn/ui` components
* `messages/` - Localization JSON files (e.g. `en.json`, `es.json`)
* `tailwind.config.js` - Tailwind CSS config

## Design & Aesthetics
* **Font:** `Chakra_Petch` (technical, sci-fi/developer vibe display font, loaded via Google Fonts in the root layout).
* **Color System:** Semantic variables in `src/app/globals.css` with Tailwind classes (`bg-background`, `text-foreground`, etc.). Keep manual color codes minimal; prefer theme tokens.
* **Component Conventions:**
  * Use the `@/` alias for imports (e.g., `@/components/ui/button` or `@/lib/utils`).
  * Follow `shadcn/ui` guidelines: use `cn()` for conditional classNames, avoid `space-y-*` or `space-x-*` (prefer `flex flex-col gap-*`), and use `size-*` instead of `w-* h-*`.

## Key Commands
* Dev Server: `pnpm dev`
* Build: `pnpm build`
* Lint: `pnpm lint`
* Add shadcn component: `pnpm dlx shadcn@latest add <component>`
