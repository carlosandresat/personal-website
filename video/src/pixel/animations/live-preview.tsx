import { Px, progress, step } from "../draw";
import { BrowserFrame } from "./browser";

// "You see your code's result instantly": each line typed on the left
// changes the page on the right the moment it's done.

/** When each line finishes typing; the page updates right then. */
const LINES = [
  { start: 2, done: 10, w: 10 },
  { start: 14, done: 22, w: 12 },
  { start: 26, done: 34, w: 8 },
];

export function LivePreview({ frame }: { frame: number }) {
  const flashing = LINES.some(({ done }) => frame >= done && frame < done + 4);
  const lineDone = (i: number) => frame >= LINES[i].done;

  return (
    <>
      {/* Editor. */}
      <Px x={1} y={3} w={17} h={24} c="1" />
      {LINES.map(({ start, done, w }, i) => {
        const width = Math.round(w * progress(frame, start, done));
        const typing = frame >= start && frame < done;
        return (
          <g key={i}>
            <Px x={3} y={6 + i * 4} w={width} c={i === 1 ? "4" : "3"} />
            {typing && step(frame, 8) % 2 === 0 ? <Px x={3 + width} y={6 + i * 4} c="4" /> : null}
          </g>
        );
      })}

      {/* The arrow lights whenever the page updates. */}
      <Px x={18} y={14} w={2} c={flashing ? "4" : "2"} />

      <BrowserFrame x={20} y={3} w={19} h={24} outline={flashing ? "4" : "2"} />
      {lineDone(0) ? <Px x={22} y={8} w={12} h={2} c={lineDone(2) ? "4" : "3"} /> : null}
      {lineDone(1) ? (
        <>
          <Px x={22} y={12} w={9} h={6} c="2" />
          <Px x={28} y={13} c="4" />
          <Px x={23} y={16} w={4} c="3" />
          <Px x={24} y={15} w={2} c="3" />
        </>
      ) : null}
      {lineDone(2) ? <Px x={22} y={20} w={7} h={2} c="4" /> : null}
    </>
  );
}
