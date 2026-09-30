import { PIXEL, type PixelTone } from "./palette";

/** A sprite: one string per row, one character per pixel ("." = empty). */
export type Grid = readonly string[];

/**
 * Draws a grid at a pixel position. Runs of the same tone become one rect,
 * and positions are rounded so motion always moves whole pixels.
 */
export function Sprite({
  grid,
  x,
  y,
  tone,
}: {
  grid: Grid;
  x: number;
  y: number;
  /** Paint every lit pixel in this tone instead of its own. */
  tone?: PixelTone;
}) {
  const left = Math.round(x);
  const top = Math.round(y);
  const rects: React.ReactNode[] = [];

  grid.forEach((row, j) => {
    let i = 0;
    while (i < row.length) {
      const c = row[i] as PixelTone | ".";
      if (c === ".") {
        i++;
        continue;
      }
      let n = 1;
      while (row[i + n] === c) n++;
      rects.push(
        <rect
          key={`${j}:${i}`}
          x={left + i}
          y={top + j}
          width={n}
          height={1}
          fill={PIXEL[tone ?? c]}
        />
      );
      i += n;
    }
  });

  return <>{rects}</>;
}

/** A filled block of pixels. */
export function Px({
  x,
  y,
  w = 1,
  h = 1,
  c,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  c: PixelTone;
}) {
  if (w <= 0 || h <= 0) return null;
  return (
    <rect
      x={Math.round(x)}
      y={Math.round(y)}
      width={Math.round(w)}
      height={Math.round(h)}
      fill={PIXEL[c]}
    />
  );
}

/** Sprite-animation step: retro sprites flip at ~`fps`, not at 30 fps. */
export function step(frame: number, fps = 6) {
  return Math.floor(frame / (30 / fps));
}

/** Deterministic 0–1 noise, so every render of a frame is identical. */
export function hash(a: number, b = 0) {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** 0→1 progress of `frame` through [from, to]. */
export function progress(frame: number, from: number, to: number) {
  return clamp01((frame - from) / (to - from));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Rotates a grid a quarter turn (rows become columns). */
export function transpose(grid: Grid): Grid {
  const width = Math.max(...grid.map((row) => row.length));
  return Array.from({ length: width }, (_, i) =>
    grid.map((row) => row[i] ?? ".").join("")
  );
}
