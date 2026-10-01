// Renders the social trailer, with its soundtrack, to
// out/social/carlosarevalo-es-{16x9,9x16}.mp4, plus a cover image per format.
// Needs `pnpm record` and `pnpm audio` first (see README).
import { remotion } from "./remotion.mjs";

const FORMATS = { Landscape: "16x9", Portrait: "9x16" };
/** The hook with its title fully in: the cover the platforms show. */
const COVER_FRAME = 80;

for (const [suffix, aspect] of Object.entries(FORMATS)) {
  const base = `out/social/carlosarevalo-es-${aspect}`;
  remotion(["render", `SocialTrailer${suffix}`, `${base}.mp4`]);
  remotion(["still", `SocialTrailer${suffix}`, `${base}.jpg`, `--frame=${COVER_FRAME}`, "--image-format=jpeg"]);
}
