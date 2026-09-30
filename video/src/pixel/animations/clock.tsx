import { Px, Sprite, progress, type Grid } from "../draw";
import type { PixelTone } from "../palette";

// "45 of every 60 minutes are practice": an hour fills in, the first quarter
// dim (the lecture), the other three bright (the workshop).

const CX = 20;
const CY = 15;
const R = 11;

const BOOK: Grid = ["22...22", "2122212", "2122212", "2222222"];
const HAMMER: Grid = ["4444", "4444", ".2..", ".2..", ".2.."];

/** Clockwise degrees from 12 o'clock to the centre of pixel (x, y). */
function angleOf(x: number, y: number) {
  const deg = (Math.atan2(x + 0.5 - CX, -(y + 0.5 - CY)) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export function Clock({ frame }: { frame: number }) {
  const sweep = 360 * progress(frame, 4, 34);
  const pixels: React.ReactNode[] = [];

  for (let y = CY - R; y < CY + R; y++) {
    for (let x = CX - R; x < CX + R; x++) {
      const dist = Math.hypot(x + 0.5 - CX, y + 0.5 - CY);
      if (dist > R) continue;
      let c: PixelTone = "1";
      if (dist > R - 1) c = "3";
      else if (angleOf(x, y) <= sweep) c = angleOf(x, y) < 90 ? "2" : "4";
      pixels.push(<Px key={`${x}:${y}`} x={x} y={y} c={c} />);
    }
  }

  const hand = (sweep * Math.PI) / 180;

  return (
    <>
      {pixels}
      {[0, 90, 180, 270].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <Px key={deg} x={Math.floor(CX + Math.sin(a) * (R - 2.5))} y={Math.floor(CY - Math.cos(a) * (R - 2.5))} c="3" />
        );
      })}
      {Array.from({ length: R - 3 }, (_, k) => (
        <Px key={k} x={Math.floor(CX + Math.sin(hand) * k)} y={Math.floor(CY - Math.cos(hand) * k)} c="0" />
      ))}

      {/* Lecture on the left, workshop on the right, as each part fills. */}
      {sweep >= 90 ? <Sprite grid={BOOK} x={1} y={13} /> : null}
      {sweep >= 360 ? <Sprite grid={HAMMER} x={34} y={13} /> : null}
    </>
  );
}
