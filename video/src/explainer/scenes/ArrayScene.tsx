import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../../fonts";
import { enterAt, rise } from "../../lib/motion";
import { Emph } from "../Emph";
import { stepFrame } from "../pacing";
import { accent, alpha, fg, ink, ink2, line } from "../theme";
import type { ArrayScene as ArrayData, ArrayStep } from "../types";
import { Shell } from "./Shell";

const SETTLE = 8;

type State = { values: (number | string)[]; range: [number, number] | null; focus: number | null; found: boolean };

/** What the row looks like after step `index` (−1: before any step). */
function stateAt(scene: ArrayData, index: number): State {
  let state: State = { values: scene.values, range: null, focus: null, found: false };
  scene.steps.slice(0, index + 1).forEach((step: ArrayStep) => {
    state = {
      values: step.values ?? state.values,
      range: step.range ?? state.range,
      focus: step.focus ?? null,
      found: step.found ?? false,
    };
  });
  return state;
}

const inPlay = (s: State, i: number) => (s.range ? i >= s.range[0] && i <= s.range[1] : true);

/** A row of cells walked through step by step: searching, sorting, indexing. */
export function ArrayScene({ scene, frames }: { scene: ArrayData; frames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = scene.values.length;
  const starts = scene.steps.map((step, i) => stepFrame(frames, i, scene.steps.length, step.at, 0.12, 0.78));

  let index = -1;
  starts.forEach((start, i) => {
    if (frame >= start) index = i;
  });
  const prev = stateAt(scene, index - 1);
  const curr = stateAt(scene, index);
  const t = index < 0 ? 1 : interpolate(frame - starts[index], [0, SETTLE], [0, 1], { extrapolateRight: "clamp" });
  const note = index >= 0 ? scene.steps[index].note : undefined;
  const noteIn = index >= 0 ? enterAt(frame, fps, starts[index]) : 0;
  const rowIn = enterAt(frame, fps, 2);

  return (
    <Shell title={scene.title}>
      {({ width, height }) => {
        const gap = n > 10 ? 6 : 12;
        const cell = Math.min(120, Math.floor((width - gap * (n - 1)) / n));
        const font = Math.min(44, Math.round(cell * 0.44));

        return (
          <div style={{ height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 70, paddingBottom: 60 }}>
            <div style={{ display: "flex", gap, ...rise(rowIn, 30) }}>
              {curr.values.map((value, i) => {
                const play = interpolate(t, [0, 1], [inPlay(prev, i) ? 1 : 0.22, inPlay(curr, i) ? 1 : 0.22]);
                const focused = curr.focus === i;
                const lit = focused ? t : prev.focus === i ? 1 - t : 0;
                const found = focused && curr.found;
                return (
                  <div key={i} style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: -54,
                        textAlign: "center",
                        fontSize: 34,
                        color: accent,
                        opacity: focused ? t : 0,
                      }}
                    >
                      ▼
                    </span>
                    <div
                      style={{
                        width: cell,
                        height: Math.max(84, cell * 1.2),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        border: `3px solid ${lit > 0.5 ? accent : line}`,
                        background: lit > 0 ? alpha(accent, lit) : ink2,
                        boxShadow: found ? `0 0 34px ${alpha(accent, 0.8 * t)}` : undefined,
                        fontFamily: mono,
                        fontSize: font,
                        fontWeight: 500,
                        color: lit > 0.5 ? ink : fg,
                        opacity: play,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ minHeight: 140, fontSize: 50, fontWeight: 600, lineHeight: 1.2, textAlign: "center", ...rise(noteIn, 20) }}>
              {note ? <Emph text={note} /> : null}
            </div>
          </div>
        );
      }}
    </Shell>
  );
}
