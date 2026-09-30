import { Ages } from "./ages";
import { Bricks } from "./bricks";
import { Bug } from "./bug";
import { City } from "./city";
import { Conveyor } from "./conveyor";
import { Diploma } from "./diploma";
import { Door } from "./door";
import { Files } from "./files";
import { Live } from "./live";
import { Maze } from "./maze";
import { Snake } from "./snake";
import { Sprout } from "./sprout";

/**
 * Stage animations. Each one draws on the 40×30 screen from its own local
 * `frame` (0 = the moment its item appears). One-shot animations land their
 * idea within REPLAY_AFTER frames and then idle; the stage plays them a
 * second time from the start. The rest run continuously and never restart.
 */
export const PIXEL_ANIMATIONS = {
  city: City,
  ages: Ages,
  sprout: Sprout,
  maze: Maze,
  door: Door,
  live: Live,
  bricks: Bricks,
  diploma: Diploma,
  conveyor: Conveyor,
  files: Files,
  snake: Snake,
  bug: Bug,
} satisfies Record<string, React.FC<{ frame: number }>>;

export type PixelAnimationId = keyof typeof PIXEL_ANIMATIONS;

/** Frames a one-shot animation gets before the stage replays it. */
export const REPLAY_AFTER = 45;

/** Animations that build to a finished state, so they are worth replaying. */
export const ONE_SHOT: ReadonlySet<PixelAnimationId> = new Set([
  "sprout",
  "maze",
  "door",
  "live",
  "bricks",
  "diploma",
  "bug",
]);

export { Idle } from "./idle";
