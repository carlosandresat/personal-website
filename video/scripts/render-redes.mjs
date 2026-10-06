// Renders social-media explainers to out/redes/<slug>.mp4, plus
// out/redes/<slug>-portada.jpg (the hook with its headline in) for the cover.
// Usage: pnpm render:redes <slug> [<slug> …]   (record and run `pnpm voz <slug>` first)
import { remotion } from "./remotion.mjs";

/** Keep in sync with COVER_FRAME in src/explainer/pacing.ts. */
const COVER_FRAME = 70;

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("Usage: pnpm render:redes <slug> [<slug> …]  (slugs are in src/explainer/pieces/)");
  process.exit(1);
}

for (const slug of slugs) {
  const id = `Redes-${slug}`;
  remotion(["render", id, `out/redes/${slug}.mp4`]);
  remotion(["still", id, `out/redes/${slug}-portada.jpg`, `--frame=${COVER_FRAME}`, "--image-format=jpeg"]);
}
