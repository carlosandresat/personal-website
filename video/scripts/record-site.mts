// Films the site tour for the social trailer, frame by frame, from a running
// copy of the site (default http://localhost:3000; `pnpm build && pnpm start`
// at the repo root first, or set SITE_URL). Writes, under the site's public/
// (git-ignored):
//   social-trailer/clips/<shot>-<format>.mp4   the filmed pages
//   social-trailer/recording.json              clip paths + where each <video> sits
//
// Each frame is a screenshot taken after scrolling to an exact position and
// seeking every CSS animation to the same virtual clock, so the footage is
// smooth at 30 fps and identical on every run. Pass shot ids to limit it.
//
// Headless Chromium can't decode the site's H.264 trailers, so the page's
// <video> is filmed empty; the composition renders the trailer's own
// composition over it. Set CHROMIUM_PATH to use an already installed Chromium.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium, type Page } from "playwright";

import { FPS } from "../src/social-trailer/pacing.ts";
import {
  RECORD_VIEWPORTS,
  SHOTS,
  type EmbedRect,
  type RecordFormat,
  type Recording,
  type ScrollKey,
} from "../src/social-trailer/shots.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "../public/social-trailer");
const FRAMES = join(ROOT, "out/record");
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";
const FORMATS = Object.keys(RECORD_VIEWPORTS) as RecordFormat[];

const only = process.argv.slice(2);
const shots = only.length ? SHOTS.filter((s) => only.includes(s.id)) : SHOTS;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Puts every CSS animation and transition on a clock the script advances. */
async function installClock(page: Page) {
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const seen = new Map<Animation, { base: number; from: number }>();
    (window as unknown as { __seek: (frame: number) => void }).__seek = (frame) => {
      for (const animation of document.getAnimations()) {
        if (!seen.has(animation)) {
          // Running loops keep their phase; ones started by this frame's
          // scroll begin from zero.
          const base = frame === 0 ? Number(animation.currentTime ?? 0) : 0;
          seen.set(animation, { base, from: frame });
        }
        const { base, from } = seen.get(animation)!;
        animation.pause();
        animation.currentTime = base + ((frame - from) * 1000) / 30;
      }
    };
  });
}

async function resolveTarget(page: Page, target: ScrollKey[1]) {
  if (typeof target === "number") return target;
  return page.evaluate(() => {
    const video = [...document.querySelectorAll("video")].find((v) => v.getBoundingClientRect().width > 0);
    if (!video) throw new Error("No visible <video> to scroll to");
    const rect = video.getBoundingClientRect();
    return Math.max(0, window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2);
  });
}

function scrollAt(keys: [number, number][], frame: number) {
  const next = keys.findIndex(([at]) => at > frame);
  if (next === -1) return keys[keys.length - 1][1];
  if (next === 0) return keys[0][1];
  const [a, ya] = keys[next - 1];
  const [b, yb] = keys[next];
  return ya + (yb - ya) * easeInOut((frame - a) / (b - a));
}

function ffmpeg(args: string[]) {
  const { status } = spawnSync("pnpm", ["exec", "remotion", "ffmpeg", "-loglevel", "error", "-y", ...args], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (status !== 0) process.exit(status ?? 1);
}

const recordingFile = join(PUBLIC, "recording.json");
const recording: Partial<Recording> = existsSync(recordingFile)
  ? JSON.parse(readFileSync(recordingFile, "utf8"))
  : {};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
mkdirSync(join(PUBLIC, "clips"), { recursive: true });

for (const format of FORMATS) {
  const { width, height, ...device } = RECORD_VIEWPORTS[format];
  const context = await browser.newContext({ viewport: { width, height }, ...device, colorScheme: "dark" });

  for (const shot of shots) {
    console.log(`${shot.id} (${format}): ${shot.frames} frames`);
    const page = await context.newPage();
    await page.goto(SITE_URL + shot.path, { waitUntil: "networkidle" });
    // Let load-in animations and the GitHub counter settle.
    await page.waitForTimeout(2500);

    const keys: [number, number][] = [];
    for (const [at, target] of shot.scroll[format]) keys.push([at, await resolveTarget(page, target)]);
    await page.evaluate((y) => window.scrollTo(0, y), keys[0][1]);
    await page.waitForTimeout(600);
    await installClock(page);

    const dir = join(FRAMES, format, shot.id);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const rects: EmbedRect[] = [];

    for (let frame = 0; frame < shot.frames; frame++) {
      if (format === "landscape" && shot.id === "hero") {
        // A pointer sweeping the hero, so its spotlight follows it.
        const t = frame / shot.frames;
        await page.mouse.move(width * (0.2 + 0.6 * t), height * (0.42 + 0.22 * Math.sin(t * Math.PI * 2)));
      }
      const rect = await page.evaluate(
        ([y, f]) =>
          new Promise<EmbedRect>((resolve) => {
            window.scrollTo(0, y);
            (window as unknown as { __seek: (frame: number) => void }).__seek(f);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                const video = [...document.querySelectorAll("video")].find((v) => v.getBoundingClientRect().width > 0);
                const r = video?.getBoundingClientRect();
                resolve(r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null);
              })
            );
          }),
        [scrollAt(keys, frame), frame] as const
      );
      rects.push(rect);
      await page.screenshot({ path: join(dir, `${String(frame).padStart(4, "0")}.jpg`), type: "jpeg", quality: 95 });
    }
    await page.close();

    const clip = `social-trailer/clips/${shot.id}-${format}.mp4`;
    ffmpeg([
      "-framerate", String(FPS),
      "-i", join(dir, "%04d.jpg"),
      "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p",
      join(PUBLIC, "..", clip),
    ]);

    if (shot.embed && rects.every((rect) => rect === null)) {
      throw new Error(`${shot.id} (${format}): the page shows no <video> to lay ${shot.embed} over`);
    }
    recording[format] = {
      ...recording[format],
      [shot.id]: { clip, embed: shot.embed ? { slug: shot.embed, rects } : null },
    } as Recording[RecordFormat];
  }
  await context.close();
}

await browser.close();
writeFileSync(recordingFile, JSON.stringify(recording, null, 2) + "\n");
console.log(`Wrote ${recordingFile}`);
