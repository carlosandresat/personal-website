import { Px, Sprite, lerp, progress, step, type Grid } from "../draw";
import { CURSOR } from "./browser";

// "Real projects for your portfolio": three project cards land in a grid
// and a pointer browses them.

const CARD_Y = 9;
const CARD_W = 10;
const CARD_H = 13;
const CARDS = [3, 15, 27];
const STAR: Grid = [".4.", "444", ".4."];

function CardContent({ index, x, y }: { index: number; x: number; y: number }) {
  if (index === 0) {
    // A chart.
    return (
      <>
        {[4, 7, 5].map((h, i) => (
          <Px key={i} x={x + 2 + i * 2} y={y + CARD_H - 2 - h} w={1} h={h} c={i === 1 ? "4" : "3"} />
        ))}
      </>
    );
  }
  if (index === 1) {
    // A little game.
    return (
      <>
        <Px x={x + 1} y={y + CARD_H - 3} w={CARD_W - 2} c="2" />
        <Px x={x + 2} y={y + CARD_H - 5} w={2} h={2} c="4" />
        <Px x={x + 6} y={y + CARD_H - 6} w={2} h={3} c="3" />
      </>
    );
  }
  // A profile page.
  return (
    <>
      <Px x={x + 3} y={y + 4} w={4} h={3} c="4" />
      <Px x={x + 2} y={y + 8} w={6} c="3" />
      <Px x={x + 2} y={y + 10} w={5} c="2" />
    </>
  );
}

export function Portfolio({ frame }: { frame: number }) {
  const browsing = frame >= 18;
  const hovered = browsing ? step(frame - 18, 3) % 3 : -1;
  const target = CARDS[Math.max(0, hovered)] + CARD_W / 2;
  const sinceMove = browsing ? (frame - 18) % 10 : 0;
  // The first move comes in from the corner; later ones go card to card.
  const firstMove = frame - 18 < 10;
  const glide = progress(sinceMove, 0, 4);
  const fromX = firstMove ? 36 : CARDS[(hovered + 2) % 3] + CARD_W / 2;
  const cursorX = browsing ? lerp(fromX, target, glide) : 36;
  const cursorY = browsing ? lerp(firstMove ? 28 : CARD_Y + 7, CARD_Y + 7, glide) : 28;

  return (
    <>
      <Px x={3} y={3} w={6} h={2} c="4" />
      <Px x={11} y={4} w={14} c="2" />

      {CARDS.map((x, i) => {
        if (frame < 2 + i * 5) return null;
        const lifted = hovered === i;
        const y = CARD_Y - (lifted ? 1 : 0);
        const fresh = frame < 4 + i * 5;
        return (
          <g key={x}>
            <Px x={x} y={y} w={CARD_W} h={CARD_H} c={lifted || fresh ? "4" : "2"} />
            <Px x={x + 1} y={y + 1} w={CARD_W - 2} h={CARD_H - 2} c="1" />
            <CardContent index={i} x={x} y={y} />
          </g>
        );
      })}

      {frame >= 30 && hovered >= 0 && step(frame, 4) % 2 === 0 ? (
        <Sprite grid={STAR} x={CARDS[hovered] + 3} y={CARD_Y - 5} />
      ) : null}
      {frame >= 14 ? <Sprite grid={CURSOR} x={cursorX} y={cursorY} /> : null}
    </>
  );
}
