import { Stage } from "../../pixel/Stage";
import type { PixelScene as PixelData } from "../types";
import { Shell } from "./Shell";

/** The retro screen, for metaphors and stories (never for graphs or functions). */
export function PixelScene({ scene }: { scene: PixelData }) {
  return (
    <Shell title={scene.title}>
      {() => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Stage cues={[{ animation: scene.animation, at: 0, label: scene.label }]} delay={2} />
        </div>
      )}
    </Shell>
  );
}
