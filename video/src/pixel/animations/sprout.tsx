import { Px, Sprite, hash, step, type Grid } from "../draw";

// "No experience needed": a seed in bare soil grows into a flowering plant.

const SOIL = 23;
const STEM_X = 20;
const FULL_HEIGHT = 13;

/** Heights along the stem where leaves grow, and which side. */
const LEAVES: { at: number; side: -1 | 1 }[] = [
  { at: 3, side: -1 },
  { at: 6, side: 1 },
  { at: 9, side: -1 },
  { at: 11, side: 1 },
];

const FLOWER: Grid = ["..4..", ".444.", "44344", ".444.", "..4.."];
const FLOWER_ALT: Grid = [".4.4.", "4.4.4", ".434.", "4.4.4", ".4.4."];

const SUN: Grid = [".333.", "33333", "33333", "33333", ".333."];

export function Sprout({ frame }: { frame: number }) {
  const height = Math.max(0, Math.min(FULL_HEIGHT, Math.floor((frame - 4) / 2.4)));
  const bloomed = height === FULL_HEIGHT && frame >= 36;

  return (
    <>
      <Sprite grid={SUN} x={32} y={3} />
      {step(frame, 4) % 2 === 0 ? (
        <>
          <Px x={30} y={5} c="2" />
          <Px x={38} y={5} c="2" />
          <Px x={34} y={1} c="2" />
          <Px x={34} y={9} c="2" />
        </>
      ) : null}

      <Px x={0} y={SOIL} w={40} c="2" />
      <Px x={0} y={SOIL + 1} w={40} h={6} c="1" />
      {Array.from({ length: 10 }, (_, i) => (
        <Px key={i} x={Math.floor(hash(i, 1) * 40)} y={SOIL + 2 + Math.floor(hash(i, 2) * 4)} c="2" />
      ))}
      <Px x={STEM_X - 1} y={SOIL + 1} w={2} c="3" />

      {height > 0 ? <Px x={STEM_X} y={SOIL + 1 - height} h={height} c="3" /> : null}
      {LEAVES.filter(({ at }) => height > at + 1).map(({ at, side }) => {
        const y = SOIL - at;
        const grown = height > at + 3;
        return (
          <g key={at}>
            <Px x={side === -1 ? STEM_X - 1 : STEM_X + 1} y={y} c="4" />
            {grown ? <Px x={side === -1 ? STEM_X - 3 : STEM_X + 2} y={y - 1} w={2} c="4" /> : null}
          </g>
        );
      })}

      {bloomed ? (
        <>
          <Sprite grid={step(frame, 3) % 2 === 0 ? FLOWER : FLOWER_ALT} x={STEM_X - 2} y={SOIL - FULL_HEIGHT - 5} />
          {[0, 1, 2, 3].map((i) =>
            (step(frame, 5) + i) % 3 === 0 ? (
              <Px key={i} x={12 + i * 5} y={4 + (i % 2) * 3} c="4" />
            ) : null
          )}
        </>
      ) : null}
    </>
  );
}
