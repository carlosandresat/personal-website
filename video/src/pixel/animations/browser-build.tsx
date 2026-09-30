import { Px, Sprite, lerp, progress } from "../draw";
import type { PixelTone } from "../palette";
import { BrowserFrame, CURSOR } from "./browser";

// "Build complete web pages from scratch": a page assembles piece by piece
// inside a browser, then its button gets clicked.

const X = 3;
const Y = 2;

/** Each piece of the page and when it drops in. */
const PIECES: { at: number; x: number; y: number; w: number; h: number; c: PixelTone }[] = [
  { at: 3, x: 4, y: 5, w: 32, h: 1, c: "2" }, // nav bar
  { at: 9, x: 5, y: 8, w: 15, h: 9, c: "2" }, // hero image
  { at: 15, x: 22, y: 9, w: 12, h: 2, c: "4" }, // title
  { at: 19, x: 22, y: 13, w: 11, h: 1, c: "2" }, // text
  { at: 22, x: 22, y: 15, w: 9, h: 1, c: "2" }, // text
  { at: 27, x: 22, y: 18, w: 7, h: 2, c: "3" }, // button
  { at: 31, x: 4, y: 24, w: 32, h: 1, c: "2" }, // footer
];

export function BrowserBuild({ frame }: { frame: number }) {
  const click = frame >= 40 && frame < 44;
  const cursorIn = progress(frame, 33, 39);

  return (
    <>
      <BrowserFrame x={X} y={Y} w={34} h={26} />
      {PIECES.map(({ at, x, y, w, h, c }, i) => {
        if (frame < at) return null;
        const fresh = frame < at + 2;
        const isButton = i === 5;
        return <Px key={i} x={x} y={y} w={w} h={h} c={fresh || (isButton && click) ? "4" : c} />;
      })}
      {/* The hero image: sun and a mountain. */}
      {frame >= 11 ? (
        <>
          <Px x={16} y={10} w={2} h={2} c="4" />
          <Px x={8} y={13} w={6} h={4} c="3" />
          <Px x={10} y={11} w={2} h={2} c="3" />
        </>
      ) : null}
      {frame >= 33 ? <Sprite grid={CURSOR} x={lerp(38, 26, cursorIn)} y={lerp(28, 19, cursorIn)} /> : null}
    </>
  );
}
