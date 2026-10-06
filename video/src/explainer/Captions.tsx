import { useCurrentFrame } from "remotion";

import { display } from "../fonts";
import { enterAt } from "../lib/motion";
import { Emph } from "./Emph";
import { FPS, LEAD } from "./pacing";
import { LAYOUT, fg, ink } from "./theme";

const MAX_CHARS = 24;
const MAX_WORDS = 6;

/**
 * Splits a line into subtitle chunks: up to ~24 characters (one line), breaking early
 * after punctuation. An *emphasis* spanning words stays in one chunk.
 */
export function chunk(say: string) {
  const words = say.split(/\s+/).filter(Boolean);
  // Re-join *multi word* emphasis so it is never split across chunks.
  const units: string[] = [];
  for (const word of words) {
    const open = units.length > 0 && (units[units.length - 1].match(/\*/g)?.length ?? 0) % 2 === 1;
    if (open) units[units.length - 1] += ` ${word}`;
    else units.push(word);
  }

  const chunks: string[] = [];
  let current: string[] = [];
  const length = (parts: string[]) => parts.join(" ").replace(/\*/g, "").length;
  for (const unit of units) {
    if (current.length > 0 && (length([...current, unit]) > MAX_CHARS || current.length >= MAX_WORDS)) {
      chunks.push(current.join(" "));
      current = [];
    }
    current.push(unit);
    if (/[.,;:?!]\*?$/.test(unit) && length(current) >= 12) {
      chunks.push(current.join(" "));
      current = [];
    }
  }
  if (current.length > 0) chunks.push(current.join(" "));
  // Don't leave a lone word for the end ("datos."): fold it into the line before.
  const last = chunks[chunks.length - 1];
  if (chunks.length > 1 && last.replace(/\*/g, "").length < 12) {
    chunks.splice(-2, 2, `${chunks[chunks.length - 2]} ${last}`);
  }
  return chunks;
}

/**
 * The scene's line as subtitles, each chunk on screen for a share of the
 * voice proportional to its length (good enough for phrase-by-phrase takes).
 */
export function Captions({ say, voiceFrames }: { say: string; voiceFrames: number }) {
  const frame = useCurrentFrame();
  const chunks = chunk(say);
  const weights = chunks.map((c) => c.replace(/\*/g, "").length + 4);
  const total = weights.reduce((a, b) => a + b, 0);

  let start = LEAD;
  let current = -1;
  let since = 0;
  chunks.forEach((_, i) => {
    if (frame >= start) {
      current = i;
      since = frame - start;
    }
    start += (weights[i] / total) * voiceFrames;
  });
  // Keep the last chunk up until the scene ends.
  if (current < 0) return null;

  const pop = enterAt(since, FPS, 0, 14);

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.captionTop,
        left: LAYOUT.left,
        width: LAYOUT.width - LAYOUT.left - LAYOUT.right,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: display,
        fontWeight: 700,
        fontSize: 58,
        lineHeight: 1.15,
        color: fg,
        textShadow: `0 4px 18px ${ink}, 0 0 4px ${ink}`,
        opacity: pop,
        transform: `scale(${0.94 + 0.06 * pop})`,
      }}
    >
      <span>
        <Emph text={chunks[current]} />
      </span>
    </div>
  );
}
