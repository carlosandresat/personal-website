import { interpolateColors } from "remotion";

import { ITEM_FRAMES, pad2 } from "../course-trailer/pacing";
import { mono } from "../fonts";
import { useEnter, useLayout } from "../lib/motion";
import { color } from "../theme";

const STAGE_GAP = 48;

/**
 * List beside the stage on landscape; stage on top on portrait. `children`
 * is the list side, `stage` the retro screen.
 */
export function StageLayout({
  stage,
  children,
}: {
  stage: React.ReactNode;
  children: React.ReactNode;
}) {
  const { portrait } = useLayout();

  if (portrait) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ alignSelf: "center" }}>{stage}</div>
        {children}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: STAGE_GAP }}>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {stage}
    </div>
  );
}

/**
 * A list row that slides in at `at` and stays highlighted, wired to the
 * stage on landscape, until `next`. `marker` is its mono tag ("01", "TÚ").
 */
export function RevealRow({
  text,
  marker,
  at,
  next,
}: {
  text: string;
  marker: string;
  at: number;
  /** When the next row arrives and takes the highlight; null for the last. */
  next: number | null;
}) {
  const { portrait } = useLayout();
  const enter = useEnter(at);
  const handOff = useEnter(next ?? Number.MAX_SAFE_INTEGER);
  const active = enter * (1 - handOff);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: portrait ? "20px 28px" : "18px 28px",
        borderRadius: 16,
        border: `1px solid ${interpolateColors(active, [0, 1], [color.border(), color.brand(0.5)])}`,
        background: interpolateColors(active, [0, 1], [color.background(0.85), "hsla(142, 40%, 6%, 0.92)"]),
        boxShadow: `inset ${Math.round(4 * active)}px 0 0 ${color.brand()}`,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -40}px)`,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 22,
          color: interpolateColors(active, [0, 1], [color.mutedForeground(), color.brand()]),
        }}
      >
        {marker}
      </span>
      <span
        style={{
          fontSize: portrait ? 34 : 32,
          fontWeight: 500,
          lineHeight: 1.28,
          color: interpolateColors(active, [0, 1], [color.mutedForeground(), color.foreground()]),
        }}
      >
        {text}
      </span>
      {/* Wire from the highlighted row to the stage. */}
      {portrait ? null : (
        <span
          style={{
            position: "absolute",
            left: "100%",
            top: "50%",
            width: STAGE_GAP,
            height: 2,
            background: color.brand(),
            opacity: active,
            transform: `scaleX(${active})`,
            transformOrigin: "left",
          }}
        />
      )}
    </div>
  );
}

/**
 * Rows that arrive one per ITEM_FRAMES from `start`. The newest row is the
 * highlighted one. Every row is laid out from frame 0, so arrivals never
 * shift the list.
 */
export function RevealList({
  items,
  start,
  numberFrom = 0,
}: {
  items: string[];
  start: number;
  numberFrom?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((text, i) => (
        <RevealRow
          key={i}
          text={text}
          marker={pad2(numberFrom + i + 1)}
          at={start + i * ITEM_FRAMES}
          next={i < items.length - 1 ? start + (i + 1) * ITEM_FRAMES : null}
        />
      ))}
    </div>
  );
}
