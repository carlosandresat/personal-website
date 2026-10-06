import { useId } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../../fonts";
import { enterAt } from "../../lib/motion";
import { stepFrame } from "../pacing";
import { accent, alpha, amber, fg, line, muted } from "../theme";
import type { Curve, PlotScene as PlotData } from "../types";
import { Shell } from "./Shell";

const TONE: Record<NonNullable<Curve["tone"]>, string> = { accent, amber, fg };
const SAMPLES = 240;
const DRAW_FRAMES = 40;
const PAD = { left: 96, right: 30, top: 30, bottom: 80 };

/** Round tick steps (1, 2, 5 × 10ⁿ), about five per axis. */
function ticks([min, max]: [number, number]) {
  const raw = (max - min) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  const out: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(6)));
  return out;
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1)).replace("-", "−");

/** Axes, functions drawn left to right, and labelled points. */
export function PlotScene({ scene, frames }: { scene: PlotData; frames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <Shell title={scene.title}>
      {({ width, height }) => {
        const plotW = width - PAD.left - PAD.right;
        const plotH = height - PAD.top - PAD.bottom - 20;
        const [x0, x1] = scene.x;
        const [y0, y1] = scene.y;
        const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * plotW;
        const sy = (y: number) => PAD.top + plotH - ((y - y0) / (y1 - y0)) * plotH;

        const axes = enterAt(frame, fps, 0);
        const n = scene.curves.length;
        const marks = scene.marks ?? [];

        return (
          <svg width={width} height={height} style={{ overflow: "visible", fontFamily: mono }}>
            {/* Grid and ticks. */}
            <g opacity={axes}>
              {(scene.yTicks ?? ticks(scene.y)).map((v) => (
                <g key={`y${v}`}>
                  <line x1={PAD.left} x2={PAD.left + plotW} y1={sy(v)} y2={sy(v)} stroke={line} strokeWidth={2} />
                  <text x={PAD.left - 18} y={sy(v) + 9} textAnchor="end" fontSize={26} fill={muted}>
                    {fmt(v)}
                  </text>
                </g>
              ))}
              {(scene.xTicks ?? ticks(scene.x)).map((v) => (
                <text key={`x${v}`} x={sx(v)} y={PAD.top + plotH + 44} textAnchor="middle" fontSize={26} fill={muted}>
                  {fmt(v)}
                </text>
              ))}
              <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={PAD.top + plotH} stroke={muted} strokeWidth={3} />
              <line
                x1={PAD.left}
                x2={PAD.left + plotW}
                y1={sy(Math.max(y0, Math.min(0, y1)))}
                y2={sy(Math.max(y0, Math.min(0, y1)))}
                stroke={muted}
                strokeWidth={3}
              />
              {scene.xLabel ? (
                <text x={PAD.left + plotW} y={PAD.top + plotH + 84} textAnchor="end" fontSize={26} fill={muted}>
                  {scene.xLabel}
                </text>
              ) : null}
              {scene.yLabel ? (
                <text x={PAD.left} y={PAD.top - 12} fontSize={26} fill={muted}>
                  {scene.yLabel}
                </text>
              ) : null}
            </g>

            <defs>
              <clipPath id={`${id}-area`}>
                <rect x={PAD.left - 10} y={PAD.top - 10} width={plotW + 20} height={plotH + 20} />
              </clipPath>
            </defs>

            {scene.curves.map((curve, i) => {
              const start = stepFrame(frames, i, n, curve.at, 0.1, 0.45);
              const p = interpolate(frame, [start, start + DRAW_FRAMES], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.inOut(Easing.cubic),
              });
              const tone = TONE[curve.tone ?? (i === 0 ? "accent" : "amber")];
              const points = Array.from({ length: SAMPLES + 1 }, (_, k) => {
                const x = x0 + ((x1 - x0) * k) / SAMPLES;
                return [x, curve.fn(x)] as const;
              }).filter(([, y]) => Number.isFinite(y));
              const d = points
                .map(([x, y], k) => `${k === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
                .join(" ");
              const lx = curve.labelX ?? x1;
              const ly = Math.min(y1, Math.max(y0, curve.fn(lx)));

              return (
                <g key={i}>
                  <clipPath id={`${id}-c${i}`}>
                    <rect x={PAD.left - 10} y={0} width={(plotW + 20) * p} height={height} />
                  </clipPath>
                  <g clipPath={`url(#${id}-area)`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={tone}
                      strokeWidth={7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      clipPath={`url(#${id}-c${i})`}
                    />
                  </g>
                  {curve.label ? (
                    <text
                      x={sx(lx) - 8}
                      y={sy(ly) - 22}
                      textAnchor="end"
                      fontSize={30}
                      fontWeight={500}
                      fill={tone}
                      opacity={interpolate(p, [0.85, 1], [0, 1], { extrapolateLeft: "clamp" })}
                    >
                      {curve.label}
                    </text>
                  ) : null}
                </g>
              );
            })}

            {marks.map((mark, i) => {
              const enter = enterAt(frame, fps, stepFrame(frames, i, marks.length, mark.at, 0.55, 0.75), 14);
              const cx = sx(mark.x);
              const cy = sy(mark.y);
              return (
                <g key={i} opacity={Math.min(1, enter)}>
                  {mark.guides ? (
                    <g stroke={alpha(fg, 0.45)} strokeWidth={2} strokeDasharray="8 10">
                      <line x1={cx} x2={cx} y1={cy} y2={PAD.top + plotH} />
                      <line x1={PAD.left} x2={cx} y1={cy} y2={cy} />
                    </g>
                  ) : null}
                  <circle cx={cx} cy={cy} r={13 * enter} fill={fg} stroke={accent} strokeWidth={5} />
                  {mark.label ? (
                    <text x={cx - 22} y={cy - 26} textAnchor="end" fontSize={32} fontWeight={500} fill={fg}>
                      {mark.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        );
      }}
    </Shell>
  );
}
