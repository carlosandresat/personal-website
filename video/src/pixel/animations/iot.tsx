import { Px, Sprite, step, type Grid } from "../draw";

// "Internet of Things": a board with a sensor blinks its LED and sends
// readings over Wi-Fi to a phone, whose chart keeps scrolling.

const BOARD: Grid = [
  "2.2.2.2.2.2.2.",
  "22222222222222",
  "21111111111112",
  "21333311111112",
  "21333311144112",
  "21333311144112",
  "21111111111112",
  "21111111111112",
  "22222222222222",
  "2.2.2.2.2.2.2.",
];

const PHONE: Grid = [
  "22222222222",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "21111111112",
  "22222322222",
];

const BOARD_X = 2;
const BOARD_Y = 16;
const PHONE_X = 27;
const PHONE_Y = 6;
/** One reading every SEND frames. */
const SEND = 12;

/** A smooth-looking but deterministic reading for sample `n`. */
const reading = (n: number) => 3 + Math.round(3 + 2.6 * Math.sin(n * 0.9) + 1.4 * Math.sin(n * 2.3));

export function Iot({ frame }: { frame: number }) {
  const sent = Math.floor(frame / SEND);
  const since = frame % SEND;
  const led = step(frame, 4) % 2 === 0;

  return (
    <>
      <Sprite grid={BOARD} x={BOARD_X} y={BOARD_Y} />
      {/* LED and the sensor lead. */}
      <Px x={BOARD_X + 11} y={BOARD_Y + 7} w={2} h={1} c={led ? "4" : "1"} />
      <Px x={BOARD_X + 4} y={BOARD_Y - 4} w={1} h={3} c="2" />
      <Px x={BOARD_X + 3} y={BOARD_Y - 6} w={3} h={2} c={since < 3 ? "4" : "3"} />

      {/* Wi-Fi arcs leaving the board with each reading. */}
      {[0, 1, 2].map((arc) => {
        const r = 2 + arc * 3;
        if (since < arc * 2 || since > arc * 2 + 6) return null;
        const cx = BOARD_X + 15;
        const cy = BOARD_Y - 1;
        return (
          <g key={arc}>
            <Px x={cx} y={cy - r} w={r} h={1} c={arc === 2 ? "2" : "3"} />
            <Px x={cx + r} y={cy - r} w={1} h={r} c={arc === 2 ? "2" : "3"} />
          </g>
        );
      })}

      <Sprite grid={PHONE} x={PHONE_X} y={PHONE_Y} />
      {/* The phone's chart: the last eight readings, newest on the right. */}
      {Array.from({ length: 8 }, (_, i) => {
        const n = sent - 7 + i;
        if (n < 0) return null;
        const h = reading(n);
        const newest = i === 7 && since < 4;
        return <Px key={n} x={PHONE_X + 1 + i} y={PHONE_Y + 14 - h} w={1} h={h} c={newest ? "4" : "3"} />;
      })}
      <Px x={PHONE_X + 2} y={PHONE_Y + 2} w={4} h={1} c="4" />
    </>
  );
}
