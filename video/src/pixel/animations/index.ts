import { Ages } from "./ages";
import { BlockStack } from "./block-stack";
import { Blueprint } from "./blueprint";
import { Bricks } from "./bricks";
import { Build } from "./build";
import { BrowserBuild } from "./browser-build";
import { Bug } from "./bug";
import { City, CityKid } from "./city";
import { Clock } from "./clock";
import { Conveyor } from "./conveyor";
import { Diploma } from "./diploma";
import { Door } from "./door";
import { Files } from "./files";
import { Interactive } from "./interactive";
import { Journey } from "./journey";
import { Kickoff } from "./kickoff";
import { Launch } from "./launch";
import { Live } from "./live";
import { LivePreview } from "./live-preview";
import { Maze } from "./maze";
import { PlayToCreate } from "./play-to-create";
import { Portfolio } from "./portfolio";
import { Present } from "./present";
import { Profile } from "./profile";
import { Responsive } from "./responsive";
import { Snake } from "./snake";
import { SpriteStand, SpriteWalk } from "./sprite-walk";
import { Sprout } from "./sprout";
import { Story } from "./story";
import { Upkeep } from "./upkeep";

/**
 * Stage animations. Each one draws on the 40×30 screen from its own local
 * `frame` (0 = the moment its item appears). One-shot animations land their
 * idea within REPLAY_AFTER frames and then idle; the stage plays them a
 * second time from the start. The rest run continuously and never restart.
 */
export const PIXEL_ANIMATIONS = {
  city: City,
  cityKid: CityKid,
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
  playToCreate: PlayToCreate,
  blockStack: BlockStack,
  clock: Clock,
  story: Story,
  present: Present,
  journey: Journey,
  livePreview: LivePreview,
  portfolio: Portfolio,
  browserBuild: BrowserBuild,
  responsive: Responsive,
  interactive: Interactive,
  profile: Profile,
  spriteStand: SpriteStand,
  spriteWalk: SpriteWalk,
  // The development explainer: one story per phase, ~6 s each.
  kickoff: Kickoff,
  blueprint: Blueprint,
  build: Build,
  launch: Launch,
  upkeep: Upkeep,
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
  "playToCreate",
  "blockStack",
  "clock",
  "story",
  "present",
  "livePreview",
  "portfolio",
  "browserBuild",
  "interactive",
  "profile",
]);

export { Idle } from "./idle";
