import { Px, lerp, progress, step } from "../draw";
import type { PixelTone } from "../palette";

// "They code with blocks, not typed code": blocks slide in and snap into a
// script, then the finished script lights up as it runs.

const X = 12;
const TOP = 6;
const ROW = 4;

const BLOCKS: { w: number; c: PixelTone }[] = [
  { w: 11, c: "4" },
  { w: 15, c: "3" },
  { w: 12, c: "3" },
  { w: 15, c: "2" },
  { w: 10, c: "4" },
];

const ENTER_EVERY = 7;
const SLIDE = 5;

export function BlockStack({ frame }: { frame: number }) {
  const running = frame >= 38;

  return (
    <>
      {BLOCKS.map(({ w, c }, i) => {
        const start = 2 + i * ENTER_EVERY;
        if (frame < start) return null;
        const x = Math.round(lerp(40, X, progress(frame, start, start + SLIDE)));
        const y = TOP + i * ROW;
        const snapped = frame - (start + SLIDE);
        const tone: PixelTone = snapped >= 0 && snapped < 2 ? "4" : c;
        return (
          <g key={i}>
            {/* Hat block: rounded top. */}
            {i === 0 ? <Px x={x + 1} y={y - 1} w={6} c={tone} /> : null}
            <Px x={x} y={y} w={w} h={3} c={tone} />
            {/* Label, then the tab that locks into the block below. */}
            <Px x={x + 2} y={y + 1} w={w - 5} c="1" />
            <Px x={x + 2} y={y + 3} w={3} c={tone} />
          </g>
        );
      })}

      {/* Running: an outline steps down the script, one block at a time. */}
      {running
        ? (() => {
            const i = step(frame - 38, 7) % BLOCKS.length;
            const { w } = BLOCKS[i];
            const y = TOP + i * ROW;
            return (
              <>
                <Px x={X - 1} y={y - 1} w={w + 2} c="4" />
                <Px x={X - 1} y={y + 3} w={w + 2} c="4" />
                <Px x={X - 1} y={y} h={3} c="4" />
                <Px x={X + w} y={y} h={3} c="4" />
              </>
            );
          })()
        : null}
    </>
  );
}
