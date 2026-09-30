import { useId } from "react";
import { useCurrentFrame } from "remotion";

import { Window } from "../components/primitives";
import { useLayout } from "../lib/motion";
import { color } from "../theme";
import {
  Idle,
  ONE_SHOT,
  PIXEL_ANIMATIONS,
  REPLAY_AFTER,
  type PixelAnimationId,
} from "./animations";
import { hash } from "./draw";
import { PIXEL, SCREEN_H, SCREEN_W } from "./palette";

/** An animation that takes over the stage at scene frame `at`. */
export type StageCue = { animation: PixelAnimationId; at: number; label: string };

const DISSOLVE_FRAMES = 8;

/** 2×2 blocks of the screen in a fixed shuffled order, for the dissolve. */
const BLOCKS = Array.from({ length: (SCREEN_W / 2) * (SCREEN_H / 2) }, (_, k) => ({
  x: (k % (SCREEN_W / 2)) * 2,
  y: Math.floor(k / (SCREEN_W / 2)) * 2,
  order: hash(k, 7),
})).sort((a, b) => a.order - b.order);

function Animation({ id, frame }: { id: PixelAnimationId | null; frame: number }) {
  if (!id) return <Idle frame={frame} />;
  const Component = PIXEL_ANIMATIONS[id];
  return <Component frame={frame} />;
}

/**
 * The retro screen beside a list. Plays whichever cue is current, and
 * dissolves block by block into the next one.
 */
export function Stage({ cues, delay = 0 }: { cues: StageCue[]; delay?: number }) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const clipId = `dissolve-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Integer pixel scale keeps every screen pixel the same size.
  const width = portrait ? 680 : 640;
  const px = width / SCREEN_W;

  // One-shot animations play twice: a second cue restarts them, dissolving
  // from the finished first play, if the next item isn't already due.
  const timeline = cues.flatMap((cue, i) => {
    const replay = cue.at + REPLAY_AFTER;
    const next = cues[i + 1]?.at ?? Infinity;
    return ONE_SHOT.has(cue.animation) && replay < next ? [cue, { ...cue, at: replay }] : [cue];
  });

  let index = -1;
  timeline.forEach((cue, i) => {
    if (frame >= cue.at) index = i;
  });
  const current = timeline[index];
  const previous = timeline[index - 1];
  const since = current ? frame - current.at : 0;
  const revealed = current
    ? Math.floor(Math.min(1, since / DISSOLVE_FRAMES) * BLOCKS.length)
    : BLOCKS.length;
  const dissolving = revealed < BLOCKS.length;

  const dot = Math.floor(frame / 12) % 2 === 0 ? 1 : 0.25;

  return (
    <Window
      title={current?.label ?? ""}
      label={<span style={{ opacity: dot }}>●</span>}
      delay={delay}
      style={{ width, flexShrink: 0 }}
    >
      <div style={{ position: "relative", width, height: SCREEN_H * px }}>
        <svg
          viewBox={`0 0 ${SCREEN_W} ${SCREEN_H}`}
          width={width}
          height={SCREEN_H * px}
          shapeRendering="crispEdges"
          style={{ display: "block" }}
        >
          <defs>
            {dissolving ? (
              <clipPath id={clipId}>
                {BLOCKS.slice(0, revealed).map((b) => (
                  <rect key={`${b.x}:${b.y}`} x={b.x} y={b.y} width={2} height={2} />
                ))}
              </clipPath>
            ) : null}
          </defs>
          <rect width={SCREEN_W} height={SCREEN_H} fill={PIXEL["0"]} />
          {dissolving ? (
            <Animation
              id={previous?.animation ?? null}
              frame={previous ? frame - previous.at : frame}
            />
          ) : null}
          <g clipPath={dissolving ? `url(#${clipId})` : undefined}>
            <rect width={SCREEN_W} height={SCREEN_H} fill={PIXEL["0"]} />
            <Animation id={current?.animation ?? null} frame={since} />
          </g>
        </svg>

        {/* LCD rows and a soft vignette. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(to bottom, transparent 0, transparent ${px - 2}px, rgba(0, 0, 0, 0.28) ${px - 2}px, rgba(0, 0, 0, 0.28) ${px}px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, transparent 55%, ${color.background(0.55)})`,
          }}
        />
      </div>
    </Window>
  );
}
