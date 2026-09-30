# Course trailers (Remotion)

Motion-graphics trailers for the course pages, written in React with
[Remotion](https://www.remotion.dev/). This folder is its own pnpm workspace:
nothing here is installed or built by the site or by Vercel.

```bash
cd video
pnpm install
pnpm studio      # live editor with a timeline scrubber
pnpm render      # review cuts → out/<slug>-<locale>-{16x9,9x16}.mp4
pnpm render scratch-kids   # every script takes slugs to limit it
pnpm typecheck
```

## Where the content comes from

- Course title, track and difficulty: `messages/<locale>.json` (`Courses.<key>`),
  the same copy the course page renders.
- "Start today because…" (a central idea plus reasons about coding and about
  the course): `Courses.<key>.motivations` in the same files.
- "When you finish, you'll be able to…": `Courses.<key>.outcomes`.
- Slug and image: `src/data/courses.ts`. Images are served from the site's
  `public/` (see `remotion.config.ts`).
- Things with no home on the site live in `src/course-trailer/trailer-copy.ts`:
  - the code scene, per locale: typed Python (`kind: "python"`) or a Scratch
    script snapping together (`kind: "blocks"`, in Scratch's block colours);
  - which pixel-art animation illustrates each motivation and outcome;
  - `labels` overriding the generic headings (e.g. copy addressed to parents);
  - `artwork: "mascot"` to show the trailers' own pixel kid instead of the
    course image — used for Scratch, since the Scratch Cat is a Scratch
    Foundation trademark.

Colours mirror the `.dark` tokens in `src/app/globals.css`; see `src/theme.ts`.

## Pixel-art stage

The reading scenes pair each list item with an animation on a 40×30 retro
screen (`src/pixel/`). Animations are components in `src/pixel/animations/`
that draw sprites (string grids, one character per pixel, tones `1`–`4`) from
their own local frame, registered in `animations/index.ts`. Each item is on
screen long enough to play its animation twice: one-shot animations (listed in
`ONE_SHOT`) must land their idea within `REPLAY_AFTER` frames, and the stage
restarts them once. Reading pace lives in `src/course-trailer/pacing.ts`; scene
lengths follow the item counts.

## Publishing to the site

Rendered files never go in Git. They live in the site's Vercel Blob store
(`carlosarevalo-media`, public) and the course page reads their URLs from
`src/data/course-trailers.json`.

```bash
# once: put the store token in video/.env.local (git-ignored)
pnpm add -g vercel
vercel link                               # from the repo root
vercel env pull video/.env.local

cd video
pnpm render:web   # out/web/<slug>/<locale>/{landscape,portrait}.{mp4,jpg}
pnpm upload       # uploads them and rewrites src/data/course-trailers.json
```

Uploaded pathnames carry a content hash, so every re-render gets fresh URLs
and nothing is served stale from the CDN. Commit the updated JSON to publish.
`scripts/trailers.mjs` lists which trailers are published.

## Adding a course trailer

1. Add `motivations` and `outcomes` under `Courses.<key>` in both message files.
2. Add a `TRAILER_EXTRAS.<key>` entry in `trailer-copy.ts`: the code demo per
   locale and one animation id per motivation and outcome.
3. Add it to `TRAILERS` in `src/Root.tsx` (both formats are registered).
4. Add it to `scripts/trailers.mjs`, then `pnpm render:web <slug> && pnpm upload <slug>`.
