# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website / portfolio for Carlos Arévalo (carlosarevalo.dev), deployed on Vercel.
Next.js 16 App Router + React 19, TypeScript, Tailwind CSS v3, shadcn/ui, `next-intl` (en/es).

`AGENTS.md` holds the design/aesthetic conventions (font, color tokens, shadcn rules); read it before making UI changes.

## Commands

Package manager is **pnpm** (pinned via `packageManager`, Node >= 20.9).

```bash
pnpm dev      # dev server on :3000
pnpm build    # production build — run this before claiming a change works
pnpm lint     # eslint (flat config, next/core-web-vitals)
```

Add a shadcn component: `pnpm dlx shadcn@latest add <component>`.

There is **no test suite** and no test runner configured. Verification means `pnpm build` plus `pnpm lint`.

Extra agent skills are vendored under `.agents/skills/` (shadcn, next-upgrade, vercel-react-best-practices, frontend-design), tracked by `skills-lock.json`.

## Architecture

### Routing and i18n

Every route lives under `src/app/[locale]/`. The locale segment is always present in the URL (`localePrefix: 'always'`, default `en`) — there are no unprefixed routes.

The i18n wiring is spread across four files and they must stay consistent:

- `src/navigation.ts` — `defineRouting` + `createNavigation`. Exports the locale-aware `Link`, `redirect`, `usePathname`, `useRouter`. **Import `Link` from `@/navigation`, not `next/link`**, or the locale prefix is lost.
- `src/proxy.ts` — the middleware (Next 16 renamed `middleware.ts` → `proxy.ts`). Runs `createMiddleware(routing)`; its matcher skips `_next`, `favicon.ico`, and anything with a file extension.
- `src/i18n/request.ts` — `getRequestConfig`, loads `messages/{locale}.json`, `notFound()` on an unknown locale. Note it hardcodes its own `locales` array, separate from `src/navigation.ts`.
- `messages/en.json` and `messages/es.json` — flat top-level namespaces (`HomePage`, `Navbar`, `Projects`, `Experiences`, `TechStack`, `Services`, `Courses`, `Development`, `Students`). **The two files must have identical key trees**; a missing key surfaces as a next-intl error instead of copy, and a past bug was exactly a mistyped Spanish key.

### Static rendering

The whole site is prerendered. Two things are required for that and are easy to drop when adding a page:

1. Call `setRequestLocale(locale)` at the top of every page/layout, before any `useTranslations`.
2. Export `generateStaticParams` returning all locales (see `src/app/[locale]/layout.tsx`, and `students/[id]/page.tsx` for the locale × dynamic-param cross product).

Pages are Server Components that take `params: Promise<{ locale: string }>` and unwrap it with `use(...)` (sync components) or `await` (async `generateMetadata`). Only leaf components that need interactivity are `"use client"` (`navbar`, `language-select`, `mode-toggle`, dialogs, carousel).

### Metadata and OG images

`generateMetadata` is written per-page with an explicit `if (locale == "es") / if (locale == "en")` branch returning a full metadata object — verbose, but that is the existing pattern. The exception is `courses/[slug]`, which reads `Courses.<key>.meta` from messages via `getTranslations`.

**OG images must live in `public/`, not colocated next to the route as `opengraph-image.png`.** Colocated image files break the prerender build (two separate commits exist to fix this). Reference them by path, e.g. `/opengraph-image.png` or `/courses/scratch-kids/opengraph-image.png`.

### Content

Page content lives in two places and neither is a CMS:

- Translatable copy → `messages/{locale}.json`.
- Structured, non-translated records → hardcoded arrays in the component or in `src/data/` (e.g. `src/data/students-data.ts`, which drives both `/students` and the `/students/[id]` static params). Section components like `projects-section.tsx` (~740 lines) and `tech-stack-section.tsx` embed their own data arrays and pull labels via `useTranslations`.

### Course pages

Every course with a detail page is an entry in `src/data/courses.ts`, rendered by `CourseDetail` (`src/components/course-detail.tsx`) at `courses/[slug]`. An entry lists `blocks` in teaching order: modules (lecture + workshop, optional homework) and standalone projects, with durations in minutes. Total hours, per-module durations and every count (detail aside, catalog cards) are derived from those blocks — never hardcode them.

To add a course: add the registry entry, then `Courses.<key>` in **both** message files with `title`, `description`, `summary`, `meta.{title,description}`, `difficulty`, `objectives`, `req`, and `modules.<n>.{lecture,workshop}` for every module (numbered from 1). Shared labels (session kinds, durations, plural counts, pricing) live directly under `Courses`. The catalog card in `courses/page.tsx` links to the detail page automatically when its `key` matches a registry entry. An OG image, if any, goes in `public/courses/<slug>/`.

### Styling

- `tailwind.config.js` is the live config (shadcn tokens, `darkMode: ["class"]`, animations) and is what `components.json` points at. `tailwind.config.ts` is a leftover from `create-next-app` and is **not** used — Tailwind resolves `.js` first. Edit the `.js` one.
- Theme tokens are HSL CSS variables in `src/app/globals.css`, light in `:root` and dark in `.dark`. Dark mode is driven by `next-themes` (`ThemeProvider` in the locale layout, `attribute="class"`).
- shadcn style is `new-york`, base color `neutral`, RSC enabled. Path alias is `@/*` → `src/*`.

## Gotchas

- `language-select.tsx` deliberately uses `usePathname`/`useRouter` from `next/navigation` (not `@/navigation`) so it can string-slice the locale prefix: `router.push("/en" + pathname.slice(3))`. This assumes a 2-char locale code — adding a locale like `pt-BR` would break it.
- `navbar.tsx` also uses raw `next/navigation` `usePathname`, so its active-link checks compare against locale-prefixed paths (`pathname === "/es"`, `pathname.endsWith("/courses")`).
- `next.config.js` wraps the config in `createNextIntlPlugin()`; `allowedDevOrigins` is set for LAN dev testing.
- `README.md` is still the untouched `create-next-app` boilerplate — don't treat it as a source of truth.
