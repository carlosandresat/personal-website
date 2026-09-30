import { Px, Sprite, progress, step, type Grid } from "../draw";

// "Your own project and a certificate": code on a screen, then a diploma
// unrolls and gets stamped.

const SEAL: Grid = [".333.", "33433", "34443", "33433", ".333.", ".3.3.", "3...3"];
const SPARKLE: Grid = [".4.", "444", ".4."];

const CENTER = 27;
const TOP = 7;
const HEIGHT = 15;

export function Diploma({ frame }: { frame: number }) {
  const width = Math.round(2 + progress(frame, 6, 18) * 20);
  const left = CENTER - Math.floor(width / 2);
  const text = progress(frame, 18, 26);
  const sealY = Math.round(-8 + progress(frame, 26, 30) * 22);
  const stamped = frame >= 30;

  return (
    <>
      {/* The project: a small screen typing code. */}
      <Px x={1} y={9} w={12} h={10} c="2" />
      <Px x={2} y={10} w={10} h={8} c="1" />
      {[5, 3, 6, 4].map((len, i) => (
        <Px key={i} x={3 + (i % 2)} y={11 + i * 2} w={Math.round(len * progress(frame, i * 3, i * 3 + 6))} c={i % 2 ? "4" : "3"} />
      ))}
      <Px x={5} y={19} w={4} c="2" />

      {/* Paper between two rolled ends. */}
      <Px x={left} y={TOP} w={width} h={HEIGHT} c="4" />
      <Px x={left - 1} y={TOP - 1} h={HEIGHT + 2} c="2" />
      <Px x={left + width} y={TOP - 1} h={HEIGHT + 2} c="2" />

      {text > 0 ? (
        <>
          <Px x={CENTER - 5} y={TOP + 3} w={Math.round(10 * text)} c="1" />
          <Px x={CENTER - 7} y={TOP + 6} w={Math.round(14 * text)} c="2" />
          <Px x={CENTER - 7} y={TOP + 8} w={Math.round(11 * text)} c="2" />
          <Px x={CENTER - 7} y={TOP + 12} w={Math.round(6 * text)} c="2" />
        </>
      ) : null}

      {/* The seal flashes bright for a moment when it lands. */}
      {frame >= 26 ? (
        <Sprite grid={SEAL} x={CENTER + 3} y={sealY} tone={stamped && frame < 33 && frame % 2 === 0 ? "1" : undefined} />
      ) : null}

      {stamped
        ? [
            [15, 2],
            [33, 2],
            [15, 25],
            [35, 25],
          ].map(([x, y], i) =>
            (step(frame, 4) + i) % 3 !== 0 ? <Sprite key={i} grid={SPARKLE} x={x - 1} y={y} /> : null
          )
        : null}
    </>
  );
}
