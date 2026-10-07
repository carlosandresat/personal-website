---
name: sitio-web
description: "Working on the carlosarevalo.dev site code in this repo — pages, components, i18n copy, course pages, the /wa WhatsApp redirects, styling, metadata/OG images, Vercel deploys, and the Remotion videos in video/ (course trailers, the /development explainer, the social trailer). Use for any change to the Next.js app or the video/ project, not for social-media or income planning."
---

# Sitio web (carlosarevalo.dev)

`CLAUDE.md` has the project overview, commands and the rules that break the build (i18n parity, static rendering, `Link` from `@/navigation`, OG images in `public/`). This skill holds the area-specific detail. `AGENTS.md` holds the visual conventions; read it before UI changes.

Verification is always `pnpm lint` + `pnpm build` (there is no test suite), plus checking the page in the preview when it renders something.

## Content

Page content lives in two places and neither is a CMS:

- Translatable copy → `messages/{locale}.json`.
- Structured, non-translated records → hardcoded arrays in the component or in `src/data/` (e.g. `src/data/students-data.ts`, which drives both `/students` and the `/students/[id]` static params). Section components like `projects-section.tsx` (~740 lines) and `tech-stack-section.tsx` embed their own data arrays and pull labels via `useTranslations`.

## Metadata

Every page's `generateMetadata` reads its `meta.{title,description}` from messages with `getTranslations` and returns `pageMetadata()` from `src/lib/seo.ts`, which sets the canonical, hreflang alternates and Open Graph/Twitter cards. Pass `noindex: true` for pages that shouldn't rank (the `/links` hubs, the English `/explora` pages). New indexable paths go in `src/app/sitemap.ts`.

## /explora (topics explained in depth)

The social videos' subjects, explained further with visualizations and interactive pieces. Spanish only for now: the English routes exist (with an "available in Spanish" badge) but are noindex, and only the Spanish URLs are in the sitemap.

- Topics are entries in `src/data/explora.ts` (slug, series, season, Spanish title and summary). Titles live there, not in messages, because they aren't translated.
- Each topic's body is a component in `src/components/explora/`, registered by slug in `index.ts`, built from the shared blocks in `prose.tsx` (`Section`, `P`, `List`, `Code`, `InlineCode`, `Homework`). Interactive pieces are small client components next to it (e.g. `binary-guess-game.tsx`).
- UI labels (series names, season, read time) are in `Explora` in both message files.

## /links/<source> (bio links)

`src/app/[locale]/links/[source]/page.tsx` is the hub the professional profiles link to (`/es/links/instagram`, `tiktok`, `facebook`, `linkedin`). Its WhatsApp button goes to `/wa/<source>`, so contacts stay counted per network. Noindex and out of the sitemap. Never rename the sources: they are in the profiles.

## Course pages

Every course with a detail page is an entry in `src/data/courses.ts`, rendered by `CourseDetail` (`src/components/course-detail.tsx`) at `courses/[slug]`.

- An entry lists `blocks` in teaching order: modules (lecture + workshop, optional homework) and standalone projects, with durations in minutes.
- Total hours, per-module durations and every count (detail aside, catalog cards) are derived from those blocks. Never hardcode them.

To add a course:

1. Add the registry entry.
2. Add `Courses.<key>` in **both** message files with `title`, `description`, `summary`, `meta.{title,description}`, `difficulty`, `objectives`, `req`, and `modules.<n>.{lecture,workshop}` for every module (numbered from 1).

Notes:

- Shared labels (session kinds, durations, plural counts, pricing) live directly under `Courses`.
- The catalog card in `courses/page.tsx` links to the detail page automatically when its `key` matches a registry entry.
- An OG image, if any, goes in `public/courses/<slug>/`.

## Videos (`video/`)

`video/` is a separate Remotion project with its own `pnpm-workspace.yaml` and install. It is excluded from the site's `tsconfig.json` and eslint. **Never add Remotion packages to the root `package.json`.** Read `video/README.md` before working there.

- **Course trailers.** Rendered from the same `messages/*.json` and `src/data/courses.ts`. `Courses.<key>.outcomes` and `Courses.<key>.motivations` exist only for the trailers.
- **Trailer hosting.** Rendered files live on Vercel Blob, not in Git. `src/data/course-trailers.json` maps slug → locale → `{ landscape, portrait }` URLs and is written by `pnpm upload` in `video/`; don't edit it by hand. `CourseDetail` renders a trailer section only when that JSON has an entry for the course and locale (portrait below `md`, landscape above), via the client component `course-trailer.tsx`.
- **Process explainer.** `video/src/process-explainer/` renders the explainer for `/development`, published under the manifest key `development` and shown above the phase tabs when that key has the locale. It reads `Development.<phase>.title` and `Development.<phase>.brief.{summary,client,developer}`. `brief` and `Development.video` (player labels) exist in both message files, though only the Spanish video is rendered for now.
- **Social trailer.** `video/src/social-trailer/` is a 30 s announcement for social media (Spanish, both formats), not shown on the site. Its site tour is filmed from a running copy of the site by `pnpm record` (Playwright) into the git-ignored `public/social-trailer/`. Its soundtrack (a minimal synth pulse, deliberately not game-like) is synthesized by `pnpm audio`. Re-record after visual changes to the home, `/courses`, a course page or `/development`.
- **Social-media explainers.** `video/src/explainer/` (compositions `Redes-<slug>`) renders vertical videos for the professional accounts: see the "Social-media explainers" section of `video/README.md`. Their content is planned in the private `redes-sociales` skill.

## WhatsApp redirects (`/wa/<source>`)

`src/app/wa/[source]/route.ts` is the target of printed QR codes, of the floating `whatsapp-button.tsx`, and of the social-media bio links. It redirects to WhatsApp with a message naming the source.

- Sources: `local`, `poste`, `volante`, `negocios`, `web`, `web-en`, `instagram`, `tiktok`, `facebook`, `linkedin` (the last four via the `/links/<source>` hubs).
- **Never rename these paths.** They are printed and linked from profiles. Add new sources instead.
- Each click logs `wa-click source=<source>` (visible in the Vercel logs); that is how contacts per channel are counted.
- The route sits outside `[locale]`, so `src/proxy.ts` excludes `wa/`.
- It needs the `WHATSAPP_NUMBER` env var (country code, no "+"). Without it, the route falls back to `/es`. The number stays out of the public repo.
- The print sources live in the git-ignored `marketing/print/` (`node render.mjs` there renders PDFs with local Chrome).

## Styling

- `tailwind.config.js` is the live config (shadcn tokens, `darkMode: ["class"]`, animations) and is what `components.json` points at. `tailwind.config.ts` is a leftover from `create-next-app` and is **not** used: Tailwind resolves `.js` first. Edit the `.js` one.
- Theme tokens are HSL CSS variables in `src/app/globals.css`, light in `:root` and dark in `.dark`. Dark mode is driven by `next-themes` (`ThemeProvider` in the locale layout, `attribute="class"`).
- shadcn style is `new-york`, base color `neutral`, RSC enabled. Path alias is `@/*` → `src/*`.

## Gotchas

- `language-select.tsx` deliberately uses `usePathname`/`useRouter` from `next/navigation` (not `@/navigation`) so it can string-slice the locale prefix: `router.push("/en" + pathname.slice(3))`. This assumes a 2-character locale code; adding a locale like `pt-BR` would break it.
- `navbar.tsx` also uses raw `next/navigation` `usePathname`, so its active-link checks compare against locale-prefixed paths (`pathname === "/es"`, `pathname.endsWith("/courses")`).
- `next.config.js` wraps the config in `createNextIntlPlugin()`; `allowedDevOrigins` is set for LAN dev testing.
- `README.md` is still the untouched `create-next-app` boilerplate; don't treat it as a source of truth.
- If a Vercel deploy fails while fetching Google Fonts, redeploy without "Use existing Build Cache".

## When you finish

- Commit directly to `master` and push (no feature branches in this repo).
- If you changed something documented here or in `CLAUDE.md`, update it in the same commit.
