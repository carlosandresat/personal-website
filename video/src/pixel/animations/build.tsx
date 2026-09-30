import { Px, Sprite, lerp, progress, step, type Grid } from "../draw";
import type { PixelTone } from "../palette";
import { BrowserFrame, CURSOR } from "./browser";
import { BUG, SPLAT } from "./bug";
import { CHECK } from "./people";

// Development: the page is sketched as a wireframe (design), filled in block
// by block (code), then a bug is caught and squashed (testing).

type Block = { x: number; y: number; w: number; h: number; c: PixelTone };

const BLOCKS: Block[] = [
  { x: 7, y: 6, w: 26, h: 2, c: "3" },
  { x: 7, y: 10, w: 11, h: 8, c: "2" },
  { x: 20, y: 10, w: 13, h: 1, c: "4" },
  { x: 20, y: 12, w: 10, h: 1, c: "3" },
  { x: 20, y: 14, w: 12, h: 1, c: "3" },
  { x: 20, y: 16, w: 6, h: 2, c: "4" },
  { x: 7, y: 20, w: 7, h: 4, c: "2" },
  { x: 16, y: 20, w: 7, h: 4, c: "2" },
  { x: 25, y: 20, w: 8, h: 4, c: "2" },
];
const SKETCH_FROM = 4;
const SKETCH_EACH = 5;
const BUILD_FROM = 56;
const BUILD_EACH = 6;
const BUG_FROM = 112;
const CLICK = 136;

const PENCIL: Grid = ["..3", ".2.", "4.."];

/** A dashed outline, the wireframe version of a block. */
function Sketch({ x, y, w, h }: Block) {
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const edge = i === 0 || j === 0 || i === w - 1 || j === h - 1;
      if (edge && (x + i + y + j) % 2 === 0) dots.push(<Px key={`${i}:${j}`} x={x + i} y={y + j} c="2" />);
    }
  }
  return <>{dots}</>;
}

/** The hero image once built: a sun over a hill. */
function HeroImage({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Px x={x + 7} y={y + 1} w={2} h={2} c="4" />
      <Px x={x + 2} y={y + 5} w={3} c="3" />
      <Px x={x + 1} y={y + 6} w={6} c="3" />
      <Px x={x} y={y + 7} w={11} c="3" />
    </>
  );
}

export function Build({ frame }: { frame: number }) {
  const sketching = Math.min(BLOCKS.length - 1, Math.floor((frame - SKETCH_FROM) / SKETCH_EACH));
  const sketched = frame >= SKETCH_FROM ? sketching + 1 : 0;
  const pencilOn = frame >= SKETCH_FROM && frame < SKETCH_FROM + BLOCKS.length * SKETCH_EACH + 4;
  const target = BLOCKS[Math.max(0, sketching)];

  const bugX = lerp(5, 15, progress(frame, BUG_FROM, CLICK - 2));
  const bugOn = frame >= BUG_FROM && frame < CLICK;
  const splatOn = frame >= CLICK && frame < CLICK + 14;
  const cursorT = progress(frame, BUG_FROM + 6, CLICK);
  const cursorX = frame < 150 ? lerp(38, bugX + 2, cursorT) : lerp(bugX + 2, 23, progress(frame, 150, 164));
  const cursorY = frame < 150 ? lerp(29, 22, cursorT) : lerp(22, 17, progress(frame, 150, 164));
  const pressed = (frame >= CLICK && frame < CLICK + 3) || (frame >= 168 && frame < 171);
  const tested = frame >= CLICK + 4;

  return (
    <>
      <BrowserFrame x={4} y={2} w={32} h={26} body="0" />

      {BLOCKS.map((block, i) => {
        const from = BUILD_FROM + i * BUILD_EACH;
        const built = progress(frame, from, from + BUILD_EACH - 1);
        const w = Math.round(block.w * built);
        return (
          <g key={i}>
            {i < sketched && built < 1 ? <Sketch {...block} /> : null}
            <Px x={block.x} y={block.y} w={w} h={block.h} c={block.c} />
            {w > 0 && w < block.w ? <Px x={block.x + w - 1} y={block.y} h={block.h} c="4" /> : null}
            {i === 1 && built === 1 ? <HeroImage x={block.x} y={block.y} /> : null}
            {i >= 6 && built === 1 ? <Px x={block.x} y={block.y} w={block.w} c="3" /> : null}
          </g>
        );
      })}

      {/* The button, once the page is tested, blinks for a click. */}
      {tested ? <Px x={20} y={16} w={6} h={2} c={frame >= 168 && frame < 176 ? "3" : "4"} /> : null}

      {pencilOn ? <Sprite grid={PENCIL} x={target.x + target.w - 1} y={target.y + target.h - 3} /> : null}

      {bugOn ? <Sprite grid={BUG[step(frame, 8) % 2]} x={bugX} y={20} /> : null}
      {splatOn ? <Sprite grid={SPLAT} x={bugX} y={21} /> : null}

      {tested ? (
        <>
          <Px x={26} y={19} w={10} h={9} c="0" />
          <Px x={26} y={19} w={10} c="3" />
          <Px x={26} y={27} w={10} c="3" />
          <Px x={26} y={19} h={9} c="3" />
          <Px x={35} y={19} h={9} c="3" />
          <Sprite grid={CHECK} x={27} y={frame < CLICK + 7 ? 21 : 20} />
        </>
      ) : null}

      {frame >= BUG_FROM + 6 ? (
        <Sprite grid={CURSOR} x={cursorX} y={cursorY + (pressed ? 1 : 0)} tone={pressed ? "3" : undefined} />
      ) : null}
    </>
  );
}
