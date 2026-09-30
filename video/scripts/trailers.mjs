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
];

export const FORMATS = ["landscape", "portrait"];

/** Title scene with the title fully in: the frame shown before playback. */
export const POSTER_FRAME = 80;

/** Lighter than the review renders (CRF 18); still crisp on the pixel art. */
export const WEB_CRF = 23;

export const webDir = (trailer) => `out/web/${trailer.slug}/${trailer.locale}`;
