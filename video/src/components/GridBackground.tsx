import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import { GRID_CELL, color } from "../theme";

/** The site's .circuit-grid: hairlines at the start of every cell. */
function gridLines(line: string): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
    backgroundSize: `${GRID_CELL}px ${GRID_CELL}px`,
  };
}

/**
 * A streak running along one grid line, like the site's touch pulses.
 * `at` is where the line sits across the canvas (0–1); frames are absolute.
 */
type Pulse = { axis: "x" | "y"; at: number; period: number; offset: number };

const PULSES: Pulse[] = [
  { axis: "x", at: 0.18, period: 150, offset: 0 },
  { axis: "y", at: 0.82, period: 180, offset: 40 },
  { axis: "x", at: 0.74, period: 165, offset: 85 },
  { axis: "y", at: 0.12, period: 195, offset: 120 },
  { axis: "x", at: 0.46, period: 210, offset: 150 },
];

const STREAK = 260;

function PulseStreak({ pulse }: { pulse: Pulse }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Crossing takes the first 60% of the period; the rest is offscreen.
  const t = ((frame + pulse.offset) % pulse.period) / pulse.period / 0.6;
  if (t > 1) return null;

  const horizontal = pulse.axis === "x";
  const span = horizontal ? width : height;
  const cross = horizontal ? height : width;
  const line = Math.round((cross * pulse.at) / GRID_CELL) * GRID_CELL;
  const travel = -STREAK + t * (span + STREAK);

  return (
    <div
      style={{
        position: "absolute",
        left: horizontal ? travel : line,
        top: horizontal ? line : travel,
        width: horizontal ? STREAK : 1,
        height: horizontal ? 1 : STREAK,
        background: `linear-gradient(${horizontal ? "to right" : "to bottom"}, transparent, ${color.brand()})`,
        boxShadow: `0 0 12px ${color.brand(0.6)}`,
      }}
    />
  );
}

/**
 * Circuit grid + a drifting brand spotlight + travelling pulses — the hero
 * backdrop of the site, animated on the video's own clock.
 */
export function GridBackground() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // A slow Lissajous drift stands in for the pointer the site follows.
  const spotX = width * (0.5 + 0.34 * Math.sin(frame / 95));
  const spotY = height * (0.5 + 0.3 * Math.sin(frame / 70 + 1.2));

  return (
    <AbsoluteFill style={{ backgroundColor: color.background() }}>
      <AbsoluteFill
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 85%)",
        }}
      >
        <AbsoluteFill style={gridLines(color.border())} />
        <AbsoluteFill
          style={{
            ...gridLines(color.brand(0.55)),
            backgroundColor: color.brand(0.04),
            maskImage: `radial-gradient(circle 420px at ${spotX}px ${spotY}px, black, transparent)`,
          }}
        />
        {PULSES.map((pulse, i) => (
          <PulseStreak key={i} pulse={pulse} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
