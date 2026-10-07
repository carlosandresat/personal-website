# Course trailers (Remotion)

Motion-graphics trailers for the course pages, plus an explainer for the
development page ([below](#development-explainer)), written in React with
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

## Development explainer

A ~40 s video for `/development` (`src/process-explainer/`, compositions
`DevelopmentExplainer{Landscape,Portrait}`): the title, then the five phases one
by one under a rail that fills as the process moves on, then a closing
invitation. Each phase shows its title, a one-line summary and who does what
("Tú" / "Yo"), beside its own stage animation (`kickoff`, `blueprint`,
`build`, `launch`, `upkeep`). Unlike the list animations, these are ~6 s
stories that play once per phase and are not in `ONE_SHOT`.

- Phase titles: `Development.<phase>.title`, the page's own tabs.
- Summary and roles: `Development.<phase>.brief` in both message files.
- Phase order, animations, and the video-only headings and tags:
  `src/process-explainer/explainer-copy.ts`.

It publishes like a trailer, under the slug `development`:
`pnpm render:web development && pnpm upload development`. The page shows it
above the tabs once `src/data/course-trailers.json` has an entry for the locale.

## Social trailer

A 30 s announcement for social media (`src/social-trailer/`, compositions
`SocialTrailer{Landscape,Portrait}`), Spanish only: the redesigned site,
filmed; the kinds of software I build; the course areas; then the URL. It is
not published to the site: the MP4s are uploaded to the networks by hand.

Scenes are cut on a 120 BPM grid (`src/social-trailer/pacing.ts`) so every
change lands on a downbeat of the generated soundtrack. The copy lives in
`social-copy.ts`; course areas list `Courses.<key>` entries, and the counts
on screen come from them.

```bash
# at the repo root, serve the site to film it
pnpm build && pnpm start

cd video
pnpm record          # → ../public/social-trailer/clips/*.mp4 + recording.json
pnpm audio           # → ../public/social-trailer/audio.wav
pnpm render:social   # → out/social/carlosarevalo-es-{16x9,9x16}.{mp4,jpg}
```

- `pnpm record` films each page in `shots.ts` frame by frame with Playwright:
  it scrolls to an exact position and seeks every CSS animation to the same
  clock before each screenshot, so the footage is smooth and identical on
  every run. `SITE_URL` points it elsewhere, `CHROMIUM_PATH` at an installed
  Chromium (otherwise run `pnpm exec playwright install chromium` once), and
  shot ids limit it (`pnpm record hero`). Headless Chromium can't play the
  site's H.264 trailers, so it also saves where each page's `<video>` sits;
  the composition renders that trailer's own composition in its place.
- `pnpm audio` synthesizes a minimal synth pulse: a filtered pulse-wave
  pad and eighth-note pulse over a held bass and a soft kick they duck
  under, through a ping-pong delay and a small reverb. Square waves keep the
  pixel timbre, but there is no lead melody, so it reads as a tech launch
  rather than a game. Subtle effects (typing, low tocks, whooshes, a closing
  chime) land on the frames the scenes animate. No samples or licences.
- Both scripts run TypeScript through Node's type stripping (Node ≥ 22.6).
  What they write is git-ignored; rerun them after changing the site or the
  pacing.

## Social-media explainers

Vertical (1080×1920) explainers for the professional accounts
(`src/explainer/`, compositions `Redes-<slug>`): one scene per line of
voice, the visual in a band clear of the Reels/TikTok UI, burned-in
subtitles under it, the handle on top. They use the print palette
(`src/explainer/theme.ts`) in a clean register: pixel art only in a `pixel`
scene, for metaphors, kids' content and promotion — never for graphs.

A piece is a file in `src/explainer/pieces/` (registered in `index.ts`): a
list of scenes, each with `say`, the line recorded for it, which also
becomes the subtitles (`*asterisks*` colour words). Scene kinds: `hook`,
`points`, `plot` (functions on axes), `graph` (boxes, arrows and a moving
packet), `array` (cells walked step by step), `code`, `pixel`, `outro`.
`Redes-muestrario` shows each once. The outro is the fixed close: the voice
says "Ahora que ya sabes X, podrás Y. Tarea para la casa: …", the screen shows
the homework (`tarea`), the tagline ("Si no lo entiendes, ¿cómo lo usas?"),
the mascot and the handle, with a soft or WhatsApp call to action (`cta`).

```bash
# one take per scene, numbered: ../public/redes/<slug>/grabaciones/01.m4a, 02.m4a …
pnpm audio:redes                     # → ../public/redes/fondo.wav, the background bed (once)
pnpm voz busqueda-binaria            # → ../public/redes/<slug>/voz/01.wav … (trimmed, normalised)
pnpm studio                          # check it with the voice
pnpm render:redes busqueda-binaria   # → out/redes/<slug>.mp4 + <slug>-portada.jpg
```

- Without recordings, scenes are sized from their text at a calm speaking
  pace, so a piece can be previewed before recording. With them, each scene
  lasts its take plus a short lead and tail (`pacing.ts`); `hold` adds
  seconds for an animation to breathe, and `at` (a 0–1 fraction) pins a
  step to the voice.
- `pnpm voz` uses the ffmpeg bundled with Remotion: it trims the silence at
  both ends of each take and normalises loudness. iPhone Voice Memos work
  as recorded ("Compressed" quality, AAC); "Lossless" (ALAC) isn't supported.
- `pnpm audio:redes` synthesizes a calm, seamless 23 s loop (pulse-wave pad,
  triangle bass, a quiet arpeggio; no drums) that plays far under the voice,
  about 18 dB below it. Without the file, videos render without music.
- Recordings and the bed are git-ignored (`public/redes/`), like the renders in `out/`.
