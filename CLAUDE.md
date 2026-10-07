# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website / portfolio for Carlos Arévalo (carlosarevalo.dev), deployed on Vercel.
Next.js 16 App Router + React 19, TypeScript, Tailwind CSS v3, shadcn/ui, `next-intl` (en/es).

`AGENTS.md` holds the design/aesthetic conventions (font, color tokens, shadcn rules); read it before making UI changes.

## Areas and skills

Each area of work has its own skill in `.claude/skills/`, so a chat only loads the context it needs:

- `sitio-web`: detail for working on the site and `video/` (courses, `/explora`, `/links`, trailers, `/wa` redirects, metadata, styling, gotchas). Load it for any code change.
- `redes-sociales`, `plan-ingresos` and `educacion`: social-media content, the income plan and the teaching method and offer. They are personal and git-ignored, together with their plans in `negocio/`, so they only exist on Carlos's machine.

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

## Rules that break the build

### Routing and i18n

Every route lives under `src/app/[locale]/`. The locale segment is always present in the URL (`localePrefix: 'always'`, default `en`); there are no unprefixed routes.

The i18n wiring is spread across four files and they must stay consistent:

- `src/navigation.ts`: `defineRouting` + `createNavigation`. Exports the locale-aware `Link`, `redirect`, `usePathname`, `useRouter`. **Import `Link` from `@/navigation`, not `next/link`**, or the locale prefix is lost.
- `src/proxy.ts`: the middleware (Next 16 renamed `middleware.ts` → `proxy.ts`). Runs `createMiddleware(routing)`; its matcher skips `_next`, `wa/`, `favicon.ico`, and anything with a file extension.
- `src/i18n/request.ts`: `getRequestConfig`, loads `messages/{locale}.json`, `notFound()` on an unknown locale. It hardcodes its own `locales` array, separate from `src/navigation.ts`.
- `messages/en.json` and `messages/es.json`: flat top-level namespaces (`HomePage`, `Navbar`, `Projects`, `Experiences`, `TechStack`, `Services`, `Courses`, `Development`, `Students`). **The two files must have identical key trees.** A missing key surfaces as a next-intl error instead of copy; a past bug was exactly a mistyped Spanish key.

### Static rendering

The whole site is prerendered. Two things are required for that and are easy to drop when adding a page:

1. Call `setRequestLocale(locale)` at the top of every page/layout, before any `useTranslations`.
2. Export `generateStaticParams` returning all locales (see `src/app/[locale]/layout.tsx`, and `students/[id]/page.tsx` for the locale × dynamic-param cross product).

Pages are Server Components that take `params: Promise<{ locale: string }>` and unwrap it with `use(...)` (sync components) or `await` (async `generateMetadata`). Only leaf components that need interactivity are `"use client"` (`navbar`, `language-select`, `mode-toggle`, dialogs, carousel).

### Other

- **OG images must live in `public/`, not colocated next to the route as `opengraph-image.png`.** Colocated image files break the prerender build (two separate commits exist to fix this). Reference them by path, e.g. `/opengraph-image.png` or `/courses/scratch-kids/opengraph-image.png`.
- Edit `tailwind.config.js`, not `tailwind.config.ts`: the `.ts` file is an unused `create-next-app` leftover.
- `video/` is a separate Remotion project. Never add Remotion packages to the root `package.json`.
- Never rename the `/wa/<source>` paths: they are printed on QR codes and linked from social profiles.
