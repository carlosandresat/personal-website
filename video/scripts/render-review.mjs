// Full-quality renders for review (CRF 18 from remotion.config.ts):
// out/<slug>-<locale>-{16x9,9x16}.mp4. Pass slugs to limit it.
import { selectTrailers } from "./trailers.mjs";
import { remotion } from "./remotion.mjs";

const ASPECT = { landscape: "16x9", portrait: "9x16" };

for (const trailer of selectTrailers()) {
  for (const [format, aspect] of Object.entries(ASPECT)) {
    remotion(["render", trailer[format], `out/${trailer.slug}-${trailer.locale}-${aspect}.mp4`]);
  }
}
