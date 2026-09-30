// Renders published trailers for the web: both formats, compressed, plus a
// JPEG poster each, into out/web/<slug>/<locale>/. Pass slugs to limit it.
import { FORMATS, POSTER_FRAME, WEB_CRF, selectTrailers, webDir } from "./trailers.mjs";
import { remotion } from "./remotion.mjs";

for (const trailer of selectTrailers()) {
  const dir = webDir(trailer);
  for (const format of FORMATS) {
    const composition = trailer[format];
    remotion(["render", composition, `${dir}/${format}.mp4`, `--crf=${WEB_CRF}`]);
    remotion([
      "still",
      composition,
      `${dir}/${format}.jpg`,
      `--frame=${POSTER_FRAME}`,
      "--image-format=jpeg",
    ]);
  }
}
