import { Px, Sprite, hash, lerp, progress, step, type Grid } from "../draw";
import { BrowserFrame } from "./browser";

// Maintenance: a monitor keeps the app's pulse. Something breaks, a wrench
// fixes it; then an update installs and a new feature appears.

const PULSE_Y = 25;
/** One heartbeat, as offsets from the baseline, repeating every 20 pixels. */
const BEAT = [0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -4, 3, 0, 0, 0, -1, 0, 0];

const BREAK_AT = 30;
const WRENCH_IN = 46;
const FIXED_AT = 74;
const UPDATE_FROM = 100;
const UPDATE_TO = 130;

const BROKEN = { x: 6, y: 8, w: 12, h: 5 };

const WRENCH: Grid = ["4.4...", "444...", ".44...", "..33..", "...33.", "....33"];
const BANG: Grid = ["4", "4", "4", ".", "4"];
const TICK: Grid = ["....4", "...44", "4.44.", "444..", ".4..."];
const ARROW: Grid = [".4.", "444", ".4.", ".4."];

export function Upkeep({ frame }: { frame: number }) {
  const broken = frame >= BREAK_AT && frame < FIXED_AT;
  const tapping = frame >= WRENCH_IN + 10 && frame < FIXED_AT;
  const tap = tapping && step(frame, 10) % 2 === 0;
  const wrenchX = Math.round(lerp(40, BROKEN.x + BROKEN.w - 2, progress(frame, WRENCH_IN, WRENCH_IN + 10)));
  const wrenchOut = progress(frame, FIXED_AT + 2, FIXED_AT + 10);
  const flash = frame >= FIXED_AT && frame < FIXED_AT + 4;
  const updating = frame >= UPDATE_FROM && frame < UPDATE_TO + 2;
  const updated = frame >= UPDATE_TO + 2;
  const shift = Math.floor(frame * 0.7);
  const pulse = Array.from({ length: 36 }, (_, i) => {
    const beat = BEAT[(i + shift) % BEAT.length];
    const erratic = broken ? Math.round((hash(i + shift, 3) - 0.5) * 4) : 0;
    return Math.min(28, Math.max(22, PULSE_Y + beat + erratic));
  });

  return (
    <>
      <BrowserFrame x={3} y={1} w={34} h={19} body="0" />
      <Px x={6} y={5} w={12} h={2} c="4" />
      <Px x={20} y={8} w={13} h={5} c="2" />
      <Px x={20} y={8} w={13} c="3" />

      {/* The block that breaks: glitching rows until it's fixed. */}
      {broken ? (
        Array.from({ length: BROKEN.h }, (_, j) => {
          const offset = Math.round((hash(j, step(frame, 10)) - 0.5) * 4);
          return <Px key={j} x={BROKEN.x + offset} y={BROKEN.y + j} w={BROKEN.w - 2} c={j % 2 ? "2" : "1"} />;
        })
      ) : (
        <Px x={BROKEN.x} y={BROKEN.y} w={BROKEN.w} h={BROKEN.h} c={flash ? "4" : "3"} />
      )}
      {broken && frame < WRENCH_IN + 10 && step(frame, 6) % 2 === 0 ? (
        <>
          <Px x={10} y={7} w={3} h={7} c="0" />
          <Sprite grid={BANG} x={11} y={8} />
        </>
      ) : null}

      {frame >= WRENCH_IN && wrenchOut < 1 ? (
        <>
          <Sprite
            grid={WRENCH}
            x={wrenchX + Math.round(wrenchOut * 30)}
            y={BROKEN.y + 1 + (tap ? 1 : 0) - Math.round(wrenchOut * 10)}
          />
          {tap ? <Px x={wrenchX - 1} y={BROKEN.y + 1} c="4" /> : null}
        </>
      ) : null}
      {frame >= FIXED_AT && frame < UPDATE_FROM ? <Sprite grid={TICK} x={20} y={14} /> : null}

      {/* The update: a badge, a progress bar, then the new feature. */}
      {frame >= UPDATE_FROM ? <Sprite grid={ARROW} x={31} y={4 - (updating ? step(frame, 6) % 2 : 0)} /> : null}
      {updating ? (
        <>
          <Px x={6} y={16} w={27} c="1" />
          <Px x={6} y={16} w={Math.round(27 * progress(frame, UPDATE_FROM, UPDATE_TO))} c="4" />
        </>
      ) : null}
      {updated ? (
        <>
          <Px x={6} y={15} w={27} h={3} c={frame < UPDATE_TO + 6 ? "4" : "3"} />
          <Px x={7} y={16} w={8} c="1" />
          {[
            [4, 14],
            [34, 14],
            [19, 19],
          ].map(([x, y], i) => ((step(frame, 4) + i) % 3 !== 0 ? <Px key={i} x={x} y={y} c="4" /> : null))}
        </>
      ) : null}

      {/* The monitor: a heartbeat that goes erratic while something's wrong. */}
      <Px x={2} y={21} w={36} c="1" />
      <Px x={2} y={29} w={36} c="1" />
      {pulse.map((y, i) => {
        // Joined to the previous point, so spikes read as one stroke.
        const from = Math.min(y, pulse[i - 1] ?? y);
        const to = Math.max(y, pulse[i - 1] ?? y);
        return <Px key={i} x={2 + i} y={from} h={to - from + 1} c={i === pulse.length - 1 ? "4" : "3"} />;
      })}
    </>
  );
}
