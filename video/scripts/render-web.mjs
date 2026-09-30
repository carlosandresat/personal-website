// Renders every published trailer for the web: both formats, compressed,
// plus a JPEG poster each, into out/web/<slug>/<locale>/.
import { spawnSync } from "node:child_process";

import { FORMATS, POSTER_FRAME, TRAILERS, WEB_CRF, webDir } from "./trailers.mjs";

function remotion(args) {
  const { status } = spawnSync("pnpm", ["exec", "remotion", ...args], {
    stdio: "inherit",
    shell: true,
  });
  if (status !== 0) process.exit(status ?? 1);
}

for (const trailer of TRAILERS) {
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
