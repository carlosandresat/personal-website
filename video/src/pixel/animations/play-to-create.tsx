import { Px, Sprite, progress, step, type Grid } from "../draw";

// "From just playing video games to making them": a game on a TV, the screen
// flips to an editor, blocks stack up and the same game gets built.

const SCREEN = { x: 8, y: 3, w: 24, h: 16 };
const STAR: Grid = ["..4..", ".444.", "44444", ".4.4."];

/** The little runner game, drawn inside [x0, x0 + w) of the screen. */
function MiniGame({ frame, x0, w, ground = true, obstacle = true, player = true }: {
  frame: number;
  x0: number;
  w: number;
  ground?: boolean;
  obstacle?: boolean;
  player?: boolean;
}) {
  const floor = SCREEN.y + SCREEN.h - 3;
  // Until the game half is wide enough, only its ground is drawn.
  const ready = w >= 8;
  const f = Math.max(0, frame);
  const obstacleX = x0 + w - 3 - ((f * 1.2) % (w - 2));
  const jump = Math.max(0, Math.round(4 * Math.sin((Math.PI * (f % 16)) / 16)));
  return (
    <>
      {ground ? <Px x={x0} y={floor} w={w} c="2" /> : null}
      {obstacle && ready ? <Px x={obstacleX} y={floor - 3} w={2} h={3} c="3" /> : null}
      {player && ready ? <Px x={x0 + 3} y={floor - 2 - jump} w={2} h={2} c="4" /> : null}
    </>
  );
}

export function PlayToCreate({ frame }: { frame: number }) {
  // 0–13 playing, 13–19 the screen flips, 19+ editor with the game rebuilt.
  const flip = progress(frame, 13, 19);
  const flipWidth = Math.round(SCREEN.w * Math.abs(Math.cos(Math.PI * flip)));
  const editing = frame >= 16;
  const midX = SCREEN.x + SCREEN.w / 2;

  return (
    <>
      {/* TV and gamepad. */}
      <Px x={SCREEN.x - 1} y={SCREEN.y - 1} w={SCREEN.w + 2} h={SCREEN.h + 2} c="2" />
      <Px x={midX - 3} y={SCREEN.y + SCREEN.h + 1} w={6} c="2" />
      <Px x={14} y={23} w={12} h={4} c="2" />
      <Px x={15} y={24} w={3} c="3" />
      <Px x={16} y={23} h={3} c="3" />
      <Px x={22} y={24} c={!editing && frame % 16 < 3 ? "4" : "3"} />
      <Px x={24} y={24} c="3" />

      {frame < 13 ? (
        <>
          <Px x={SCREEN.x} y={SCREEN.y} w={SCREEN.w} h={SCREEN.h} c="1" />
          <MiniGame frame={frame} x0={SCREEN.x} w={SCREEN.w} />
        </>
      ) : frame < 19 ? (
        <Px x={midX - flipWidth / 2} y={SCREEN.y} w={flipWidth} h={SCREEN.h} c={editing ? "1" : "2"} />
      ) : (
        <>
          <Px x={SCREEN.x} y={SCREEN.y} w={SCREEN.w} h={SCREEN.h} c="1" />
          <Px x={midX - 1} y={SCREEN.y + 1} h={SCREEN.h - 2} c="2" />

          {/* Blocks stacking in the editor half. */}
          {[7, 9, 6, 8].map((w, i) =>
            frame >= 20 + i * 3 ? (
              <g key={i}>
                <Px x={SCREEN.x + 1} y={SCREEN.y + 2 + i * 3} w={w} h={2} c={i % 2 ? "4" : "3"} />
                <Px x={SCREEN.x + 2} y={SCREEN.y + 4 + i * 3} w={2} c={i % 2 ? "4" : "3"} />
              </g>
            ) : null
          )}

          {/* The game half, assembled piece by piece. */}
          <MiniGame
            frame={frame - 36}
            x0={midX + 1}
            w={Math.round((SCREEN.w / 2 - 2) * progress(frame, 22, 28))}
            obstacle={frame >= 30}
            player={frame >= 33}
          />
        </>
      )}

      {frame >= 38 && step(frame, 4) % 2 === 0 ? <Sprite grid={STAR} x={33} y={0} /> : null}
    </>
  );
}
