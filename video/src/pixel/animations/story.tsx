import { Px, Sprite, progress, step, type Grid } from "../draw";
import { MASCOT, MASCOT_H } from "../mascot";

// "Interactive stories and animations": a book opens, a page turns, and the
// hero climbs out of it to say something.

const BOOK_TOP = 19;
const PAGE_W = 11;
const SPINE = 20;

const BUBBLE: Grid = [
  ".3333333.",
  "3.......3",
  "3.......3",
  "3.......3",
  ".3333333.",
  "..33.....",
  "..3......",
];

function PageLines({ x }: { x: number }) {
  return (
    <>
      {[2, 4, 6].map((dy, i) => (
        <Px key={dy} x={x + 2} y={BOOK_TOP + dy} w={PAGE_W - 4 - (i % 2) * 2} c="2" />
      ))}
    </>
  );
}

export function Story({ frame }: { frame: number }) {
  if (frame < 6) {
    return (
      <>
        <Px x={14} y={BOOK_TOP - 1} w={12} h={9} c="3" />
        <Px x={14} y={BOOK_TOP - 1} h={9} c="2" />
        <Px x={17} y={BOOK_TOP + 2} w={6} c="4" />
      </>
    );
  }

  // One page turns right to left, like any page flip: shrink, then regrow.
  const turn = progress(frame, 10, 18);
  const turning = turn > 0 && turn < 1;
  const turnW = Math.round(PAGE_W * Math.abs(Math.cos(Math.PI * turn)));
  const rise = progress(frame, 22, 30);
  const heroY = Math.round(BOOK_TOP - MASCOT_H * rise);
  const dots = frame >= 32 ? 1 + (step(frame - 32, 3) % 3) : 0;

  return (
    <>
      {/* The hero climbs out: only the rows above the book show. */}
      {rise > 0 ? (
        <Sprite
          grid={MASCOT[step(frame, 5) % 2].slice(0, BOOK_TOP - heroY)}
          x={SPINE - 5}
          y={heroY}
        />
      ) : null}

      <Px x={SPINE - PAGE_W - 1} y={BOOK_TOP + 8} w={PAGE_W * 2 + 2} c="3" />
      <Px x={SPINE - PAGE_W} y={BOOK_TOP} w={PAGE_W} h={8} c="4" />
      <Px x={SPINE} y={BOOK_TOP} w={PAGE_W} h={8} c="4" />
      <PageLines x={SPINE - PAGE_W} />
      <PageLines x={SPINE} />
      <Px x={SPINE} y={BOOK_TOP} h={8} c="2" />

      {turning ? (
        turn < 0.5 ? (
          <Px x={SPINE} y={BOOK_TOP - 1} w={turnW} h={9} c="3" />
        ) : (
          <Px x={SPINE - turnW} y={BOOK_TOP - 1} w={turnW} h={9} c="3" />
        )
      ) : null}

      {dots > 0 ? (
        <>
          <Sprite grid={BUBBLE} x={27} y={4} />
          {Array.from({ length: dots }, (_, i) => (
            <Px key={i} x={29 + i * 2} y={6} c="4" />
          ))}
        </>
      ) : null}

      {frame >= 30
        ? [
            [6, 8],
            [33, 16],
            [8, 20],
          ].map(([x, y], i) => ((step(frame, 4) + i) % 3 !== 0 ? <Px key={i} x={x} y={y} c="4" /> : null))
        : null}
    </>
  );
}
