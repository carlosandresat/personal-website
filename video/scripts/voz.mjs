// Turns phone recordings into an explainer's voice track: one take per scene,
// silence trimmed at both ends, loudness normalised, mono 48 kHz WAV.
//
// Usage: pnpm voz <slug>
//   in:  ../public/redes/<slug>/grabaciones/01*.m4a, 02*.m4a …  (the number is the scene)
//   out: ../public/redes/<slug>/voz/01.wav, 02.wav …            (what the composition plays)
//
// Uses the ffmpeg bundled with Remotion, so nothing else to install.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: pnpm voz <slug>");
  process.exit(1);
}

const base = join(here, "..", "..", "public", "redes", slug);
const input = join(base, "grabaciones");
const output = join(base, "voz");
if (!existsSync(input)) {
  console.error(`No recordings: put the takes in ${input} (01.m4a, 02.m4a …, one per scene)`);
  process.exit(1);
}
mkdirSync(output, { recursive: true });

/** Seconds of breath kept before and after the speech. */
const PAD = 0.12;

function ffmpeg(args) {
  const quoted = args.map((a) => (/[\s"&|<>^]/.test(a) || a === "" ? JSON.stringify(a) : a));
  const { status, stderr } = spawnSync("pnpm", ["exec", "remotion", "ffmpeg", "-hide_banner", ...quoted], {
    shell: true,
    encoding: "utf8",
  });
  return { ok: status === 0, log: stderr ?? "" };
}

/** Where the speech starts and ends, from ffmpeg's silence detection. */
function speechBounds(file) {
  const { ok, log } = ffmpeg(["-i", file, "-af", "silencedetect=noise=-40dB:d=0.25", "-f", "null", "-"]);
  if (!ok) {
    if (/alac/i.test(log)) {
      throw new Error(
        `${file} is lossless (ALAC). On the iPhone set Settings › Voice Memos › Audio Quality to "Compressed" and record again, or share the memo as a compressed file.`
      );
    }
    throw new Error(`ffmpeg couldn't read ${file}:\n${log.slice(-800)}`);
  }
  const [, h, m, s] = log.match(/Duration: (\d+):(\d+):([\d.]+)/) ?? [];
  const duration = Number(h) * 3600 + Number(m) * 60 + Number(s);
  const starts = [...log.matchAll(/silence_start: (-?[\d.]+)/g)].map((x) => Number(x[1]));
  const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((x) => Number(x[1]));

  let start = 0;
  if (starts.length && starts[0] <= 0.05 && ends.length) start = ends[0];
  let end = duration;
  const last = starts[starts.length - 1];
  // A silence that starts and never ends (or ends at the very end) is the tail.
  if (last !== undefined && last > start && (ends.length < starts.length || ends[ends.length - 1] >= duration - 0.05)) {
    end = last;
  }
  return { start: Math.max(0, start - PAD), end: Math.min(duration, end + PAD), duration };
}

const takes = readdirSync(input)
  .filter((name) => /^\d+/.test(name) && !name.startsWith("."))
  .sort();
if (!takes.length) {
  console.error(`No takes in ${input}: name them by scene number (01.m4a, 02.m4a …)`);
  process.exit(1);
}

for (const name of takes) {
  const scene = name.match(/^\d+/)[0].padStart(2, "0");
  const file = join(input, name);
  const { start, end, duration } = speechBounds(file);
  const target = join(output, `${scene}.wav`);
  const filter = `atrim=start=${start.toFixed(3)}:end=${end.toFixed(3)},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11`;
  const { ok, log } = ffmpeg(["-y", "-i", file, "-af", filter, "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", target]);
  if (!ok) throw new Error(`ffmpeg failed on ${file}:\n${log.slice(-800)}`);
  console.log(`${scene}: ${name} → voz/${scene}.wav (${(end - start).toFixed(2)} s of ${duration.toFixed(2)} s)`);
}
