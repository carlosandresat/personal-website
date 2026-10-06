import { useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../../fonts";
import { enterAt, rise } from "../../lib/motion";
import { Emph } from "../Emph";
import { stepFrame } from "../pacing";
import { accent, line } from "../theme";
import type { PointsScene as PointsData } from "../types";
import { Shell } from "./Shell";

/** Numbered points appearing one by one. */
export function PointsScene({ scene, frames }: { scene: PointsData; frames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = scene.points.length;

  return (
    <Shell title={scene.title}>
      {() => (
        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 30 }}>
          {scene.points.map((point, i) => {
            const enter = enterAt(frame, fps, stepFrame(frames, i, n, point.at, 0.08, 0.6));
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 28,
                  paddingBottom: 30,
                  borderBottom: `2px solid ${line}`,
                  ...rise(enter, 30),
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 30, color: accent, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.18 }}>
                  <Emph text={point.text} />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Shell>
  );
}
