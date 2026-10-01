import { Px, Sprite, lerp, progress, type Grid } from "../draw";

// "Databases": records leave the database one by one and fill a table, then
// a query sweeps the rows and picks one out.

const CYLINDER: Grid = [
  "..22222222..",
  ".2444444442.",
  ".2222222222.",
  ".3333333333.",
  ".3333333333.",
  ".2333333332.",
  ".3222222223.",
  ".3333333333.",
  ".3333333333.",
  ".2333333332.",
  ".3222222223.",
  ".3333333333.",
  ".3333333333.",
  ".2333333332.",
  "..22222222..",
];

const DB_X = 2;
const DB_Y = 8;
const TABLE_X = 18;
const TABLE_W = 20;
const ROW_H = 4;
const ROWS_Y = 9;
/** When each record arrives in the table. */
const INSERTS = [4, 11, 18, 25];
const TRAVEL = 5;
const QUERY_AT = 31;
const MATCH = 2;

export function Database({ frame }: { frame: number }) {
  const sending = INSERTS.findIndex((at) => frame >= at - TRAVEL && frame < at);
  const query = progress(frame, QUERY_AT, QUERY_AT + 8);
  const scanY = ROWS_Y + query * (INSERTS.length * ROW_H - 1);

  return (
    <>
      <Sprite grid={CYLINDER} x={DB_X} y={DB_Y} />
      {/* The band lights up while a record leaves. */}
      {sending >= 0 ? <Px x={DB_X + 1} y={DB_Y + 1} w={10} h={1} c="4" /> : null}

      {/* Table header and frame. */}
      <Px x={TABLE_X} y={4} w={TABLE_W} h={3} c="2" />
      <Px x={TABLE_X + 1} y={5} w={4} c="4" />
      <Px x={TABLE_X + 7} y={5} w={5} c="4" />
      <Px x={TABLE_X + 14} y={5} w={4} c="4" />
      <Px x={TABLE_X} y={7} w={TABLE_W} c="3" />

      {INSERTS.map((at, i) => {
        const y = ROWS_Y + i * ROW_H;
        if (frame < at) {
          // The record on its way, a small packet along the row.
          if (frame < at - TRAVEL) return null;
          const t = progress(frame, at - TRAVEL, at);
          return <Px key={i} x={lerp(DB_X + 12, TABLE_X, t)} y={y + 1} w={2} h={1} c="4" />;
        }
        const fresh = frame < at + 3;
        const matched = query >= 1 && i === MATCH;
        const tone = fresh || matched ? "4" : "2";
        return (
          <g key={i}>
            <Px x={TABLE_X + 1} y={y} w={4} h={2} c={tone} />
            <Px x={TABLE_X + 7} y={y} w={3 + ((i * 3) % 4)} h={2} c={tone} />
            <Px x={TABLE_X + 14} y={y} w={2 + ((i * 2) % 3)} h={2} c={matched ? "4" : "3"} />
            {matched ? <Px x={TABLE_X - 2} y={y} w={1} h={2} c="4" /> : null}
          </g>
        );
      })}

      {frame >= QUERY_AT && query < 1 ? <Px x={TABLE_X} y={scanY} w={TABLE_W} h={1} c="4" /> : null}
    </>
  );
}
