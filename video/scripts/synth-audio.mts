// Generates the social trailer's soundtrack: a 120 BPM chiptune (triangle
// bass, square arpeggio and lead, noise drums) plus sound effects placed on
// the exact frames the scenes animate, read from the same pacing and copy
// the composition uses. No samples, no dependencies: writes
// public/social-trailer/audio.wav (git-ignored), 44.1 kHz 16-bit stereo.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  BAR,
  BEAT,
  CLOSING,
  CUT,
  DURATION,
  FPS,
  HOOK,
  TOUR_CLIPS,
  itemAt,
  sceneStart,
} from "../src/social-trailer/pacing.ts";
import { SOCIAL_COPY } from "../src/social-trailer/social-copy.ts";

const RATE = 44100;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../../public/social-trailer/audio.wav");

const length = Math.ceil((DURATION / FPS) * RATE);
const left = new Float32Array(length);
const right = new Float32Array(length);

const sec = (frame: number) => frame / FPS;
const midiHz = (note: number) => 440 * 2 ** ((note - 69) / 12);

// Deterministic white noise.
let seed = 0x2f6b;
const noise = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return (seed / 0x3fffffff) - 1;
};

/** Adds `fn(t)` (t in seconds from `start`) for `dur` seconds, panned -1…1. */
function add(start: number, dur: number, pan: number, fn: (t: number) => number) {
  const from = Math.max(0, Math.floor(start * RATE));
  const to = Math.min(length, Math.floor((start + dur) * RATE));
  const gl = Math.min(1, 1 - pan);
  const gr = Math.min(1, 1 + pan);
  for (let i = from; i < to; i++) {
    const v = fn(i / RATE - start);
    left[i] += v * gl;
    right[i] += v * gr;
  }
}

const square = (phase: number, duty = 0.5) => (phase % 1 < duty ? 1 : -1);
const triangle = (phase: number) => 4 * Math.abs((phase % 1) - 0.5) - 1;
/** Attack/decay envelope with a short release so notes never click. */
const env = (t: number, dur: number, attack = 0.004, release = 0.03) =>
  Math.min(1, t / attack) * Math.min(1, Math.max(0, (dur - t) / release));

// --- Instruments -------------------------------------------------------------

function tone(start: number, dur: number, note: number, gain: number, pan: number, wave: (p: number) => number, decay = 0) {
  const hz = midiHz(note);
  add(start, dur, pan, (t) => wave(t * hz) * gain * env(t, dur) * Math.exp(-decay * t));
}

function kick(start: number, gain = 0.9) {
  add(start, 0.22, 0, (t) => {
    const phase = 45 * t + (110 / 18) * (1 - Math.exp(-18 * t));
    return Math.sin(2 * Math.PI * phase) * gain * Math.exp(-14 * t);
  });
}

function snare(start: number, gain = 0.4) {
  add(start, 0.16, 0, (t) => (noise() * 0.8 + Math.sin(2 * Math.PI * 190 * t) * 0.5) * gain * Math.exp(-24 * t));
}

function hat(start: number, gain = 0.12, pan = 0.3) {
  let last = 0;
  add(start, 0.04, pan, (t) => {
    const n = noise();
    const high = n - last; // crude high-pass
    last = n;
    return high * gain * Math.exp(-90 * t);
  });
}

// --- Sound effects -----------------------------------------------------------

/** Filtered-noise sweep into a cut; peaks right on it. */
function whoosh(cutFrame: number, gain = 0.32) {
  const dur = 0.45;
  const start = sec(cutFrame) - dur * 0.8;
  let low = 0;
  add(start, dur, 0, (t) => {
    const x = t / dur;
    const cutoff = 0.02 + 0.5 * x * x; // opens up as it approaches the cut
    low += cutoff * (noise() - low);
    return low * gain * Math.sin(Math.PI * x) * 2.2;
  });
}

function tick(frame: number, gain = 0.16) {
  add(sec(frame), 0.018, 0.15, (t) => square(t * 2400, 0.3) * gain * Math.exp(-220 * t));
}

function blip(frame: number, note: number, gain = 0.2) {
  add(sec(frame), 0.12, -0.15, (t) => {
    const hz = midiHz(note) * (1 + 0.5 * Math.exp(-40 * t)); // a quick downward chirp
    return square(t * hz, 0.25) * gain * env(t, 0.12) * Math.exp(-14 * t);
  });
}

function shutter(frame: number) {
  add(sec(frame), 0.05, 0, (t) => noise() * 0.28 * Math.exp(-120 * t));
  add(sec(frame) + 0.035, 0.04, 0, (t) => noise() * 0.18 * Math.exp(-140 * t));
}

/** The coin "ding" when the URL finishes typing. */
function ding(frame: number) {
  tone(sec(frame), 0.08, 83, 0.22, 0, (p) => square(p, 0.5), 0); // B5
  tone(sec(frame) + 0.08, 0.6, 88, 0.22, 0, (p) => square(p, 0.5), 5); // E6
}

/** Rising power-on chirp under the boot sweep. */
function powerOn(frame: number) {
  add(sec(frame), 0.5, 0, (t) => {
    const hz = 120 + 900 * (t / 0.5) ** 2;
    return square(t * hz, 0.5) * 0.08 * env(t, 0.5, 0.01, 0.1);
  });
}

// --- Music -------------------------------------------------------------------

/** Am – F – C – G, one chord a bar: root (MIDI) and its triad. */
const CHORDS = [
  { root: 45, triad: [57, 60, 64] },
  { root: 41, triad: [53, 57, 60] },
  { root: 48, triad: [60, 64, 67] },
  { root: 43, triad: [55, 59, 62] },
];

/** Lead motif, eighth notes per bar of the 4-bar loop; null rests. */
const MOTIF: (number | null)[][] = [
  [76, null, 81, null, 79, 76, null, 74],
  [72, null, 77, null, 76, 72, null, 69],
  [76, null, 79, null, 84, null, 83, 79],
  [74, null, 79, null, 83, 81, 79, 74],
];

const EIGHTH = sec(BEAT) / 2;
const SIXTEENTH = EIGHTH / 2;
const bars = DURATION / BAR;
const barStart = (bar: number) => sec(bar * BAR);

const BAR_OF = (frame: number) => frame / BAR;
const tourBar = BAR_OF(CUT.tour);
const coursesBar = BAR_OF(CUT.courses);
const closingBar = BAR_OF(CUT.closing);

for (let bar = 0; bar < bars; bar++) {
  const chord = CHORDS[bar % 4];
  const t0 = barStart(bar);
  const full = bar >= tourBar && bar < closingBar;
  const lastBeforeCourses = bar === coursesBar - 1;
  const closing = bar >= closingBar;

  // Arpeggio: sixteenths through the triad, up an octave in the courses.
  const lift = bar >= coursesBar && bar < closingBar ? 12 : 0;
  const pattern = [0, 1, 2, 1];
  for (let s = 0; s < 16; s++) {
    if (closing && bar === bars - 1 && s >= 8) break;
    const note = chord.triad[pattern[s % 4]] + 12 + lift;
    const gain = bar < 1 ? 0.035 + 0.035 * (s / 16) : 0.07;
    tone(t0 + s * SIXTEENTH, SIXTEENTH * 0.9, note, gain, -0.35, (p) => square(p, 0.25));
  }

  // Bass: eighths, octave bounce, from the second bar on.
  if (bar >= 1) {
    for (let e = 0; e < 8; e++) {
      if (bar === 1 && e < 4) continue;
      if (closing && bar === bars - 1 && e > 0) break;
      const note = chord.root + (e % 4 === 2 ? 12 : 0);
      const dur = closing && bar === bars - 1 ? 1.6 : EIGHTH * 0.85;
      tone(t0 + e * EIGHTH, dur, note, 0.3, 0, triangle);
    }
  }

  // Drums.
  if (full) {
    const breakdown = lastBeforeCourses;
    for (let beat = 0; beat < 4; beat++) {
      if (breakdown && beat >= 2) continue;
      const t = t0 + beat * sec(BEAT);
      if (beat % 2 === 0) kick(t);
      else snare(t);
      hat(t + EIGHTH, 0.1);
      if (bar >= coursesBar) hat(t + SIXTEENTH * 3, 0.06, -0.3);
    }
    if (breakdown) {
      // Snare roll into the courses.
      for (let s = 0; s < 8; s++) snare(t0 + sec(2 * BEAT) + s * SIXTEENTH, 0.12 + 0.03 * s);
    }
  } else if (bar === tourBar - 1) {
    // The hook's second bar: hats creeping in, a roll into the tour.
    for (let e = 4; e < 8; e++) hat(t0 + e * EIGHTH, 0.08);
    for (let s = 12; s < 16; s++) snare(t0 + s * SIXTEENTH, 0.1 + 0.04 * (s - 12));
  } else if (closing) {
    if (bar === closingBar) kick(t0);
  }

  // Lead: the motif over the tour and development, an octave up after.
  if (full && !lastBeforeCourses) {
    MOTIF[bar % 4].forEach((note, e) => {
      if (note === null) return;
      const held = MOTIF[bar % 4][e + 1] === null;
      const dur = held ? EIGHTH * 1.9 : EIGHTH * 0.9;
      tone(t0 + e * EIGHTH, dur, note + (bar >= coursesBar ? 0 : -12), 0.085, 0.3, (p) => square(p, 0.5), 2.2);
    });
  }
}

// Closing chord stab on the cut.
for (const note of [57, 60, 64, 69]) tone(barStart(closingBar), 1.4, note, 0.07, 0, (p) => square(p, 0.5), 2);

// --- Effects on the scenes' frames ------------------------------------------

powerOn(0);

// Hook: the eyebrow typing, then a blip per title word.
const eyebrowChars = Array.from(SOCIAL_COPY.hook.eyebrow).length;
for (let c = 0; c < eyebrowChars; c += 2) tick(HOOK.eyebrowAt + Math.floor(c / HOOK.eyebrowCharsPerFrame));
SOCIAL_COPY.hook.title.split(" ").forEach((_, i) => blip(HOOK.titleAt + i * HOOK.titleStagger, 76 + i * 2, 0.1));

// Cuts between scenes.
for (const cut of [CUT.tour, CUT.development, CUT.courses, CUT.closing]) whoosh(cut);

// The site tour's clip changes.
TOUR_CLIPS.slice(1).forEach((clip) => shutter(clip.from));

// Rows landing in the development and courses lists, climbing the scale.
const STEPS = [72, 74, 76, 79];
SOCIAL_COPY.development.rows.forEach((_, i) => blip(sceneStart("development") + itemAt("development", i), STEPS[i]));
SOCIAL_COPY.courses.areas.forEach((_, i) => blip(sceneStart("courses") + itemAt("courses", i), STEPS[i] + 5));

// The URL typing out, then the ding.
const urlStart = sceneStart("closing") + CLOSING.urlAt;
const urlChars = Array.from(SOCIAL_COPY.closing.url).length;
for (let c = 0; c < urlChars; c++) tick(urlStart + Math.floor(c / CLOSING.urlCharsPerFrame), 0.13);
ding(urlStart + Math.ceil(urlChars / CLOSING.urlCharsPerFrame));

// --- Master: fade out, normalize to -1 dBFS, write ----------------------------

const fade = Math.floor(0.6 * RATE);
for (let i = 0; i < fade; i++) {
  const g = i / fade;
  left[length - 1 - i] *= g;
  right[length - 1 - i] *= g;
}

let peak = 0;
for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const gain = 10 ** (-1 / 20) / peak;

const data = Buffer.alloc(length * 4);
for (let i = 0; i < length; i++) {
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left[i] * gain)) * 32767), i * 4);
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right[i] * gain)) * 32767), i * 4 + 2);
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(2, 22); // stereo
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.concat([header, data]));
console.log(`Wrote ${OUT} (${(length / RATE).toFixed(2)} s)`);
