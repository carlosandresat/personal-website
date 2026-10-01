import { Px, lerp, progress, step } from "../draw";

// "Databases and analysis": rows of a table turn into the bars of a chart,
// then a trend line is drawn across them.

const VALUES = [5, 9, 7, 12, 15];
const ROW_X = 2;
const ROW_Y = 6;
const CHART_X = 17;
const BASE_Y = 25;
const BAR_W = 3;
const BAR_GAP = 1;
/** When each row flies across to become its bar. */
const FLY = 6;
const ROW_EVERY = 5;
const LINE_AT = 4 + VALUES.length * ROW_EVERY + 2;

const barX = (i: number) => CHART_X + 2 + i * (BAR_W + BAR_GAP);

export function DataChart({ frame }: { frame: number }) {
  const line = progress(frame, LINE_AT, LINE_AT + 8);

  return (
    <>
      {/* Axes. */}
      <Px x={CHART_X} y={6} w={1} h={BASE_Y - 5} c="2" />
      <Px x={CHART_X} y={BASE_Y} w={22} h={1} c="2" />

      {VALUES.map((value, i) => {
        const start = 4 + i * ROW_EVERY;
        const flown = progress(frame, start, start + FLY);
        const rowY = ROW_Y + i * 4;
        return (
          <g key={i}>
            {/* The row in the table, dimmed once it has been charted. */}
            <Px x={ROW_X} y={rowY} w={3} h={2} c={flown > 0 ? "1" : "3"} />
            <Px x={ROW_X + 4} y={rowY} w={2 + (value >> 1)} h={2} c={flown > 0 ? "1" : "2"} />
            {flown > 0 && flown < 1 ? (
              <Px x={lerp(ROW_X + 4, barX(i), flown)} y={lerp(rowY, BASE_Y - 2, flown)} w={2} h={2} c="4" />
            ) : null}
            {flown >= 1 ? (
              <Px
                x={barX(i)}
                y={BASE_Y - Math.round(value * progress(frame, start + FLY, start + FLY + 3))}
                w={BAR_W}
                h={Math.round(value * progress(frame, start + FLY, start + FLY + 3))}
                c={frame < start + FLY + 4 ? "4" : "3"}
              />
            ) : null}
          </g>
        );
      })}

      {/* Trend line, one dot per bar top, drawn left to right. */}
      {VALUES.map((value, i) => {
        if (line * VALUES.length < i + 1) return null;
        const x = barX(i) + 1;
        const y = BASE_Y - value - 3;
        const next = VALUES[i + 1];
        return (
          <g key={`l${i}`}>
            <Px x={x} y={y} w={1} h={1} c="4" />
            {next !== undefined && line * VALUES.length >= i + 2 ? (
              <Px x={x + 1} y={Math.round((y + BASE_Y - next - 3) / 2)} w={3} h={1} c={step(frame, 4) % 2 ? "4" : "3"} />
            ) : null}
          </g>
        );
      })}
    </>
  );
}
