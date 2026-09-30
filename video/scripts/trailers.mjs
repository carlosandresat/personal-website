/**
 * Trailers published to the site, with the composition that renders each
 * format. Landscape plays on desktop, portrait on phones.
 */
export const TRAILERS = [
  {
    slug: "basics-python",
    locale: "es",
    landscape: "PythonTrailerLandscape",
    portrait: "PythonTrailerPortrait",
  },
  {
    slug: "scratch-kids",
    locale: "es",
    landscape: "ScratchTrailerLandscape",
    portrait: "ScratchTrailerPortrait",
  },
];

export const FORMATS = ["landscape", "portrait"];

/** Title scene with the title fully in: the frame shown before playback. */
export const POSTER_FRAME = 80;

/** Lighter than the review renders (CRF 18); still crisp on the pixel art. */
export const WEB_CRF = 23;

export const webDir = (trailer) => `out/web/${trailer.slug}/${trailer.locale}`;

/**
 * The trailers a script should act on: all of them, or only the slugs
 * passed on the command line (`pnpm render:web scratch-kids`).
 */
export function selectTrailers(argv = process.argv.slice(2)) {
  if (argv.length === 0) return TRAILERS;
  const selected = TRAILERS.filter((t) => argv.includes(t.slug));
  if (selected.length === 0) {
    console.error(`No trailer matches ${argv.join(", ")}. Known: ${TRAILERS.map((t) => t.slug).join(", ")}`);
    process.exit(1);
  }
  return selected;
}
