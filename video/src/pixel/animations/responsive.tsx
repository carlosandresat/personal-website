import { Px, lerp, progress } from "../draw";
import type { PixelTone } from "../palette";
import { BrowserFrame } from "./browser";

// "Pages that adapt to mobile and desktop": one layout reflowing from three
// columns (desktop) to two (tablet) to one (phone), and back around.

const WIDTHS = [34, 24, 14];
const PHASE = 30;
const RESIZE = 8;
const TOP = 2;
const HEIGHT = 26;
const TONES: PixelTone[] = ["3", "2", "4", "2", "3", "4"];

export function Responsive({ frame }: { frame: number }) {
  const phase = Math.floor(frame / PHASE);
  const from = WIDTHS[(phase + WIDTHS.length - 1) % WIDTHS.length];
  const to = WIDTHS[phase % WIDTHS.length];
  const w = Math.round(phase === 0 ? to : lerp(from, to, progress(frame % PHASE, 0, RESIZE)));
  const left = Math.round(20 - w / 2);

  const cols = w >= 30 ? 3 : w >= 20 ? 2 : 1;
  const inner = w - 4;
  const cardW = Math.floor((inner - (cols - 1)) / cols);
  const cards = TONES.slice(0, cols === 1 ? 3 : 6);

  return (
    <>
      <BrowserFrame x={left} y={TOP} w={w} h={HEIGHT} />
      <Px x={left + 2} y={TOP + 4} w={w - 4} h={2} c="4" />
      {cards.map((c, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const y = TOP + 8 + row * 6;
        if (y + 5 > TOP + HEIGHT - 1) return null;
        return <Px key={i} x={left + 2 + col * (cardW + 1)} y={y} w={cardW} h={5} c={c} />;
      })}
    </>
  );
}
