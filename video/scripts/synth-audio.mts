// Generates the social trailer's soundtrack: a minimal 120 BPM synth pulse
// (filtered pulse-wave pad and eighth-note pulse, a sustained triangle bass,
// a soft kick the bed breathes under) plus subtle effects placed on the exact
// frames the scenes animate, read from the same pacing and copy the
// composition uses. Square waves keep the pixel timbre; filtering, a
// ping-pong delay and a small reverb keep it from sounding like a game.
// No samples, no dependencies: writes public/social-trailer/audio.wav
// (git-ignored), 44.1 kHz 16-bit stereo.

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

const sec = (frame: number) => frame / FPS;
const midiHz = (note: number) => 440 * 2 ** ((note - 69) / 12);

const BEAT_S = sec(BEAT);
const EIGHTH = BEAT_S / 2;
const barTime = (bar: number) => sec(bar * BAR);

/** Scene cuts in bars: the arrangement changes on them. */
const BARS = {
  tour: CUT.tour / BAR,
  development: CUT.development / BAR,
  courses: CUT.courses / BAR,
  closing: CUT.closing / BAR,
  end: DURATION / BAR,
};

// Deterministic white noise.
let seed = 0x2f6b;
const noise = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x3fffffff - 1;
};

// --- Buses -------------------------------------------------------------------

type Bus = { l: Float32Array; r: Float32Array };
const bus = (): Bus => ({ l: new Float32Array(length), r: new Float32Array(length) });

/** Pad and pulse: ducked under every kick. */
const bed = bus();
/** Kick, hats, clap and bass. */
const rhythm = bus();
const sfx = bus();
/** Mono send into the delay and the reverb. */
const space = new Float32Array(length);

/**
 * Adds `fn(t)` (t in seconds from `start`) to a bus for `dur` seconds,
 * panned -1…1, sending `send` of it to the delay and reverb. `fn` is called
 * once per sample in order, so voices can keep filter state in closures.
 */
function add(target: Bus, start: number, dur: number, pan: number, fn: (t: number) => number, send = 0) {
  const from = Math.max(0, Math.floor(start * RATE));
  const to = Math.min(length, Math.floor((start + dur) * RATE));
  const gl = Math.min(1, 1 - pan);
  const gr = Math.min(1, 1 + pan);
  for (let i = from; i < to; i++) {
    const v = fn(i / RATE - start);
    target.l[i] += v * gl;
    target.r[i] += v * gr;
    if (send) space[i] += v * send;
  }
}

// --- DSP helpers -------------------------------------------------------------

const pulse = (phase: number, duty = 0.5) => (phase % 1 < duty ? 1 : -1);
const triangle = (phase: number) => 4 * Math.abs((phase % 1) - 0.5) - 1;
/** Linear attack and release around a held note, so nothing clicks. */
const env = (t: number, dur: number, attack: number, release: number) =>
  Math.min(1, t / attack) * Math.min(1, Math.max(0, (dur - t) / release));

const coeff = (hz: number) => 1 - Math.exp((-2 * Math.PI * hz) / RATE);
/** Two one-pole low-passes in series (12 dB/octave): rounds off square waves. */
function lowpass() {
  let a = 0;
  let b = 0;
  return (x: number, hz: number) => {
    const k = coeff(hz);
    a += k * (x - a);
    b += k * (a - b);
    return b;
  };
}

/** Piecewise-linear automation over bars: [[bar, value], …]. */
function automation(points: [number, number][]) {
  return (time: number) => {
    const bar = time / barTime(1);
    const next = points.findIndex(([at]) => at > bar);
    if (next === -1) return points[points.length - 1][1];
    if (next === 0) return points[0][1];
    const [a, va] = points[next - 1];
    const [b, vb] = points[next];
    return va + ((vb - va) * (bar - a)) / (b - a);
  };
}

// The filters open as the video builds and close again over the ending.
const padCutoff = automation([
  [0, 280],
  [BARS.tour, 1100],
  [BARS.courses - 1, 1400],
  [BARS.courses, 1800],
  [BARS.closing, 1500],
  [BARS.end, 600],
]);
const pulseCutoff = automation([
  [1, 450],
  [BARS.tour, 900],
  [BARS.courses, 1300],
]);

// --- Harmony -----------------------------------------------------------------

type Chord = { bass: number; pad: number[] };

const AM9: Chord = { bass: 45, pad: [57, 60, 64, 67, 71] };
const FMAJ9: Chord = { bass: 41, pad: [53, 57, 60, 64, 67] };
const CMAJ7: Chord = { bass: 48, pad: [52, 55, 59, 60, 64] };
const G6: Chord = { bass: 43, pad: [55, 59, 62, 64, 67] };
const ESUS4: Chord = { bass: 40, pad: [52, 57, 59, 64, 69] };

const half = (from: number, to: number) => from + Math.floor((to - from) / 2);

/**
 * One chord per span, lined up with the scene cuts: A minor opens and closes,
 * and an E suspension in the bar before the courses pulls into them.
 */
const PROGRESSION: { from: number; to: number; chord: Chord }[] = [
  { from: 0, to: BARS.tour, chord: AM9 },
  { from: BARS.tour, to: half(BARS.tour, BARS.development), chord: FMAJ9 },
  { from: half(BARS.tour, BARS.development), to: BARS.development, chord: CMAJ7 },
  { from: BARS.development, to: BARS.courses - 1, chord: G6 },
  { from: BARS.courses - 1, to: BARS.courses, chord: ESUS4 },
  { from: BARS.courses, to: half(BARS.courses, BARS.closing), chord: FMAJ9 },
  { from: half(BARS.courses, BARS.closing), to: BARS.closing, chord: G6 },
  { from: BARS.closing, to: BARS.end, chord: AM9 },
];

const chordAt = (bar: number) => PROGRESSION.find((span) => bar >= span.from && bar < span.to)!.chord;

// --- Instruments -------------------------------------------------------------

const PAD_RELEASE = 0.6;

/** Two slightly detuned pulse waves per note, slowly breathing, filtered. */
function pad(start: number, dur: number, chord: Chord, gain: number) {
  chord.pad.forEach((note, i) => {
    for (const detune of [-0.07, 0.07]) {
      const hz = midiHz(note + detune);
      const lp = lowpass();
      const pan = (i / (chord.pad.length - 1) - 0.5) * 0.9 * Math.sign(detune);
      const total = dur + PAD_RELEASE;
      add(
        bed,
        start,
        total,
        pan,
        (t) => {
          const duty = 0.5 + 0.18 * Math.sin(2 * Math.PI * 0.2 * (start + t) + i);
          const x = pulse(t * hz + i * 0.13, duty);
          return lp(x, padCutoff(start + t)) * gain * env(t, total, 0.5, PAD_RELEASE);
        },
        0.3
      );
    }
  });
}

/** One staccato eighth of the pulse: the steady "engine" under the video. */
function pulseNote(start: number, note: number, gain: number, pan: number) {
  const hz = midiHz(note);
  const lp = lowpass();
  add(
    bed,
    start,
    0.16,
    pan,
    (t) => lp(pulse(t * hz, 0.3), pulseCutoff(start + t)) * gain * env(t, 0.16, 0.003, 0.05) * Math.exp(-9 * t),
    0.3
  );
}

/** Held bass note, softly re-struck each bar. */
function bass(start: number, dur: number, note: number, gain: number) {
  const hz = midiHz(note);
  const lp = lowpass();
  add(rhythm, start, dur, 0, (t) => lp(triangle(t * hz), 600) * gain * (0.7 + 0.3 * Math.exp(-3 * t)) * env(t, dur, 0.01, 0.12));
}

const kicks: number[] = [];

/** A round, low kick; the pad and pulse dip under it. */
function kick(start: number, gain = 0.75) {
  kicks.push(start);
  add(rhythm, start, 0.4, 0, (t) => {
    const phase = 48 * t + (100 / 30) * (1 - Math.exp(-30 * t));
    return Math.sin(2 * Math.PI * phase) * gain * Math.exp(-8 * t) * Math.min(1, t / 0.002);
  });
}

/** Soft closed hat: high-passed noise. */
function hat(start: number, gain = 0.05, pan = 0.25) {
  const lp = lowpass();
  add(rhythm, start, 0.06, pan, (t) => {
    const n = noise();
    return (n - lp(n, 6500)) * gain * Math.exp(-70 * t);
  });
}

/** A muted clap: three quick band-passed bursts. */
function clap(start: number, gain = 0.12) {
  const low = lowpass();
  const high = lowpass();
  add(
    rhythm,
    start,
    0.25,
    -0.1,
    (t) => {
      const n = noise();
      const band = low(n, 2200) - high(n, 700);
      const burst = t < 0.03 ? Math.exp(-200 * (t % 0.01)) : Math.exp(-25 * (t - 0.03));
      return band * gain * 3 * burst;
    },
    0.35
  );
}

/** Filtered noise rising into `end`, cut right on it. */
function swell(end: number, dur: number, gain: number) {
  const lp = lowpass();
  add(
    rhythm,
    end - dur,
    dur + 0.02,
    0,
    (t) => {
      const x = Math.min(1, t / dur);
      return lp(noise(), 250 + 4500 * x * x) * gain * x * x * 2.5;
    },
    0.3
  );
}

// --- Effects (sober) ---------------------------------------------------------

/** Filtered-noise sweep into a cut; peaks right on it. */
function whoosh(cutFrame: number, gain = 0.16) {
  const dur = 0.45;
  const lp = lowpass();
  add(
    sfx,
    sec(cutFrame) - dur * 0.8,
    dur,
    0,
    (t) => {
      const x = t / dur;
      return lp(noise(), 300 + 3500 * x * x) * gain * Math.sin(Math.PI * x) * 3;
    },
    0.25
  );
}

/** A soft key click. */
function tick(frame: number, gain = 0.05) {
  const lp = lowpass();
  add(sfx, sec(frame), 0.02, 0.1, (t) => (Math.sin(2 * Math.PI * 1500 * t) * 0.5 + lp(noise(), 3200) * 2) * gain * Math.exp(-280 * t));
}

/** A low, short "tock" on a chord tone, for things landing on screen. */
function tock(frame: number, note: number, gain = 0.16) {
  const hz = midiHz(note);
  add(
    sfx,
    sec(frame),
    0.45,
    -0.1,
    (t) => (triangle(t * hz) + 0.3 * Math.sin(2 * Math.PI * 2 * hz * t) * Math.exp(-20 * t)) * gain * Math.exp(-14 * t) * Math.min(1, t / 0.002),
    0.25
  );
}

/** The tour's clip change: a muted camera click. */
function shutter(frame: number) {
  const lp = lowpass();
  add(sfx, sec(frame), 0.08, 0, (t) => lp(noise(), 2400) * 0.35 * (Math.exp(-150 * t) + (t > 0.035 ? 0.6 * Math.exp(-150 * (t - 0.035)) : 0)));
}

/** A clean, strummed chime when the URL finishes typing. */
function chime(frame: number) {
  [69, 76, 81].forEach((note, i) => {
    const hz = midiHz(note);
    add(
      sfx,
      sec(frame) + i * 0.035,
      3,
      (i - 1) * 0.3,
      (t) => (0.6 * triangle(t * hz) + 0.25 * Math.sin(2 * Math.PI * 2 * hz * t)) * 0.09 * Math.exp(-2.2 * t) * Math.min(1, t / 0.003),
      0.5
    );
  });
}

/** A soft, low thump as the screen boots. */
function thump(frame: number) {
  add(sfx, sec(frame), 0.9, 0, (t) => Math.sin(2 * Math.PI * 55 * t) * 0.35 * Math.exp(-5 * t) * Math.min(1, t / 0.005));
}

// --- Arrangement -------------------------------------------------------------

// Pad: the bed of the whole video, swelling in under the hook.
for (const { from, to, chord } of PROGRESSION) {
  pad(barTime(from), barTime(to - from), chord, from === 0 ? 0.04 : 0.045);
}

for (let bar = 0; bar < BARS.end; bar++) {
  const t0 = barTime(bar);
  const chord = chordAt(bar);
  const drums = bar >= BARS.tour && bar < BARS.closing;
  const breakdown = bar === BARS.courses - 1;

  // Pulse: eighths on the root an octave up, the fifth on every fourth,
  // fading in through the hook's second bar and gone for the closing.
  if (bar >= 1 && bar < BARS.closing) {
    for (let e = 0; e < 8; e++) {
      const fadeIn = bar < BARS.tour ? (e + 1) / 9 : 1;
      const accent = e % 2 === 0 ? 1 : 0.7;
      const note = chord.bass + 12 + (e % 4 === 3 ? 7 : 0);
      pulseNote(t0 + e * EIGHTH, note, 0.11 * accent * fadeIn, e % 2 ? 0.2 : -0.2);
    }
  }

  // Bass from the tour on, one held note per bar.
  if (drums) bass(t0, barTime(1) + 0.05, chord.bass, 0.24);

  if (drums) {
    for (let beat = 0; beat < 4; beat++) {
      const t = t0 + beat * BEAT_S;
      // The bar before the courses drops its second half for a swell.
      if (!(breakdown && beat >= 2)) kick(t);
      if (bar >= BARS.development && !breakdown) hat(t + EIGHTH);
      if (bar >= BARS.courses && beat % 2 === 1) clap(t);
    }
  }
}

swell(barTime(BARS.tour), 1.2, 0.07);
swell(barTime(BARS.courses), barTime(0.5), 0.1);

// The closing lands on one soft kick and a low A held to the end.
kick(barTime(BARS.closing), 0.6);
bass(barTime(BARS.closing), barTime(BARS.end - BARS.closing), AM9.bass - 12, 0.26);

// --- Effects on the scenes' frames ------------------------------------------

thump(0);

// Hook: the eyebrow typing, then a quiet tock per title word, up the chord.
const eyebrowChars = Array.from(SOCIAL_COPY.hook.eyebrow).length;
for (let c = 0; c < eyebrowChars; c += 2) tick(HOOK.eyebrowAt + Math.floor(c / HOOK.eyebrowCharsPerFrame), 0.04);
SOCIAL_COPY.hook.title.split(" ").forEach((_, i) => tock(HOOK.titleAt + i * HOOK.titleStagger, AM9.pad[i % AM9.pad.length], 0.06));

// Cuts between scenes.
for (const cut of [CUT.tour, CUT.development, CUT.courses, CUT.closing]) whoosh(cut);

// The site tour's clip changes.
TOUR_CLIPS.slice(1).forEach((clip) => shutter(clip.from));

// Rows landing in the development and courses lists, on tones of the chord
// playing at that moment.
const rowTock = (scene: "development" | "courses", i: number) => {
  const frame = sceneStart(scene) + itemAt(scene, i);
  const tones = chordAt(frame / BAR).pad;
  tock(frame, tones[(i + 1) % tones.length]);
};
SOCIAL_COPY.development.rows.forEach((_, i) => rowTock("development", i));
SOCIAL_COPY.courses.areas.forEach((_, i) => rowTock("courses", i));

// The URL typing out, then the chime.
const urlStart = sceneStart("closing") + CLOSING.urlAt;
const urlChars = Array.from(SOCIAL_COPY.closing.url).length;
for (let c = 0; c < urlChars; c++) tick(urlStart + Math.floor(c / CLOSING.urlCharsPerFrame));
chime(urlStart + Math.ceil(urlChars / CLOSING.urlCharsPerFrame));

// --- Space: ping-pong delay and a small reverb on the send ------------------

/** Dotted-eighth ping-pong; each repeat a little darker. */
function pingPong(input: Float32Array, feedback = 0.42) {
  const d = Math.round(EIGHTH * 1.5 * RATE);
  // Two delay lines feeding each other: the input enters on the left and
  // each repeat crosses sides. The wet output is what leaves each line.
  const lineL = new Float32Array(length);
  const lineR = new Float32Array(length);
  const wetL = new Float32Array(length);
  const wetR = new Float32Array(length);
  const dampL = lowpass();
  const dampR = lowpass();
  for (let i = 0; i < length; i++) {
    wetL[i] = i >= d ? lineL[i - d] : 0;
    wetR[i] = i >= d ? lineR[i - d] : 0;
    lineL[i] = input[i] + dampR(wetR[i], 3000) * feedback;
    lineR[i] = dampL(wetL[i], 3000) * feedback;
  }
  return { l: wetL, r: wetR };
}

/** Schroeder reverb: parallel damped combs into series all-passes. */
function reverb(input: Float32Array, spread: number) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356].map((n) => n + spread);
  const out = new Float32Array(length);
  for (const n of combs) {
    const buf = new Float32Array(n);
    let pos = 0;
    let damp = 0;
    for (let i = 0; i < length; i++) {
      const y = buf[pos];
      damp += 0.3 * (y - damp);
      buf[pos] = input[i] + damp * 0.8;
      out[i] += y / combs.length;
      pos = (pos + 1) % n;
    }
  }
  for (const n of [556, 441, 341].map((m) => m + spread)) {
    const buf = new Float32Array(n);
    let pos = 0;
    for (let i = 0; i < length; i++) {
      const delayed = buf[pos];
      const x = out[i];
      buf[pos] = x + delayed * 0.5;
      out[i] = delayed - x * 0.5;
      pos = (pos + 1) % n;
    }
  }
  return out;
}

const echoes = pingPong(space);
const roomIn = new Float32Array(length);
for (let i = 0; i < length; i++) roomIn[i] = space[i] + 0.4 * (echoes.l[i] + echoes.r[i]);
const roomL = reverb(roomIn, 0);
const roomR = reverb(roomIn, 23);

// --- Mix and master ----------------------------------------------------------

// The bed dips under each kick and recovers within a beat.
const duck = new Float32Array(length).fill(1);
for (const k of kicks) {
  const from = Math.floor(k * RATE);
  const to = Math.min(length, from + Math.floor(0.3 * RATE));
  for (let i = from; i < to; i++) duck[i] = Math.min(duck[i], 1 - 0.4 * Math.exp(-(i - from) / RATE / 0.08));
}

const left = new Float32Array(length);
const right = new Float32Array(length);
for (let i = 0; i < length; i++) {
  left[i] = rhythm.l[i] + bed.l[i] * duck[i] + sfx.l[i] + echoes.l[i] * 0.4 + roomL[i] * 0.1;
  right[i] = rhythm.r[i] + bed.r[i] * duck[i] + sfx.r[i] + echoes.r[i] * 0.4 + roomR[i] * 0.1;
}

// Gentle saturation for a fuller level without hard peaks, then a fade.
let peak = 0;
for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const drive = 1.1;
for (let i = 0; i < length; i++) {
  left[i] = Math.tanh((left[i] / peak) * drive) / Math.tanh(drive);
  right[i] = Math.tanh((right[i] / peak) * drive) / Math.tanh(drive);
}

const fade = Math.floor(1.2 * RATE);
for (let i = 0; i < fade; i++) {
  const g = i / fade;
  left[length - 1 - i] *= g;
  right[length - 1 - i] *= g;
}

peak = 0;
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
