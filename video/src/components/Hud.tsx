import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../fonts";
import { useLayout } from "../lib/motion";
import { color } from "../theme";

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * The persistent frame around every scene: site URL, the site's ledger-style
 * "01 / 05" counter and a progress hairline.
 */
export function Hud({ sceneStarts }: { sceneStarts: number[] }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { portrait, padX } = useLayout();

  const scene = sceneStarts.filter((start) => frame >= start).length;
  const progress = frame / (durationInFrames - 1);
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const top = portrait ? 150 : 64;
  const bottom = portrait ? 200 : 64;

  return (
    <AbsoluteFill style={{ opacity, fontFamily: mono }}>
      <div
        style={{
          position: "absolute",
          top,
          left: padX,
          right: padX,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: color.mutedForeground(),
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{ width: 10, height: 10, background: color.brand() }}
          />
          carlosarevalo.dev
        </span>
        <span>
          <span style={{ color: color.brand() }}>{pad2(scene)}</span>
          {" / "}
          {pad2(sceneStarts.length)}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom,
          left: padX,
          right: padX,
          height: 2,
          background: color.border(),
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: color.brand(),
            boxShadow: `0 0 10px ${color.brand(0.7)}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
