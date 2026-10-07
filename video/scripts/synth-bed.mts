// Generates the explainers' background bed: a calm, seamless loop meant to sit
// far under the voice. A filtered pulse-wave pad over a soft triangle bass and
// a quiet eighth-note arpeggio, in the same synth family as the social
// trailer's soundtrack but without drums. No samples, no dependencies:
// writes public/redes/fondo.wav (git-ignored), 44.1 kHz 16-bit stereo.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RATE = 44100;
const BPM = 84;
const BEAT = 60 / BPM;
const BAR = 4 * BEAT;
const BARS = 8;
const LOOP = BARS * BAR;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../../public/redes/fondo.wav");

/** Am – F – C – G, twice: roots and triads as MIDI notes. */
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [48, 52, 55],
  [55, 59, 62],
];
const midiHz = (n: number) => 440 * 2 ** ((n - 69) / 12);

// Rendered one loop longer than needed; the tail is folded onto the start so
// the file loops without a seam.
const length = Math.ceil(LOOP * RATE);
const L = new Float32Array(length * 2);
const R = new Float32Array(length * 2);

function voice(start: number, dur: number, pan: number, fn: (t: number) => number) {
  const from = Math.floor(start * RATE);
  const to = Math.min(L.length, Math.floor((start + dur) * RATE));
  const gl = Math.min(1, 1 - pan);
  const gr = Math.min(1, 1 + pan);
  for (let i = from; i < to; i++) {
    const v = fn(i / RATE - start);
    L[i] += v * gl;
    R[i] += v * gr;
  }
}

/** Attack–release envelope over `dur` seconds. */
const env = (t: number, dur: number, attack: number, release: number) =>
  Math.min(1, t / attack) * Math.min(1, Math.max(0, (dur - t) / release));

/** One-pole low-pass, as a stateful filter. */
function lowpass(cutoff: number) {
  const a = Math.exp((-2 * Math.PI * cutoff) / RATE);
  let y = 0;
  return (x: number) => (y = (1 - a) * x + a * y);
}

const pulse = (phase: number, width: number) => (phase % 1 < width ? 1 : -1);

for (let bar = 0; bar < BARS; bar++) {
  const chord = CHORDS[bar % CHORDS.length];
  const start = bar * BAR;

  // Pad: each chord note as two detuned pulse waves, slowly breathing.
  chord.forEach((note, k) => {
    const hz = midiHz(note);
    const filter = lowpass(900);
    const dur = BAR + 0.9;
    voice(start, dur, (k - 1) * 0.35, (t) => {
      const width = 0.3 + 0.12 * Math.sin(2 * Math.PI * 0.18 * (start + t));
      const raw = 0.5 * pulse(hz * t, width) + 0.5 * pulse(hz * 1.004 * t + 0.3, width);
      return 0.05 * env(t, dur, 0.8, 0.9) * filter(raw);
    });
  });

  // Bass: the root an octave down, a soft triangle.
  const root = midiHz(chord[0] - 12);
  voice(start, BAR, 0, (t) => {
    const phase = (root * t) % 1;
    const tri = 4 * Math.abs(phase - 0.5) - 1;
    return 0.11 * env(t, BAR, 0.05, 0.4) * tri;
  });

  // Arpeggio: eighth notes up the chord, quiet and dark, alternating sides.
  for (let i = 0; i < 8; i++) {
    const note = chord[i % 3] + 12;
    const hz = midiHz(note);
    const filter = lowpass(1400);
    const t0 = start + (i * BEAT) / 2;
    voice(t0, 0.5, i % 2 ? 0.4 : -0.4, (t) => 0.035 * Math.exp(-t * 7) * filter(pulse(hz * t, 0.25)));
  }
}

// Fold the tail onto the start, then normalise to −6 dBFS.
for (let i = 0; i < length; i++) {
  L[i] += L[i + length];
  R[i] += R[i + length];
}
let peak = 0;
for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const gain = 0.5 / (peak || 1);

const data = Buffer.alloc(length * 4);
for (let i = 0; i < length; i++) {
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * gain)) * 32767), i * 4);
  data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * gain)) * 32767), i * 4 + 2);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.concat([header, data]));
console.log(`wrote ${OUT} (${LOOP.toFixed(2)} s loop)`);
