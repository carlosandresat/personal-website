import { interpolate, useCurrentFrame } from "remotion";

import { mono } from "../../fonts";
import { sliceChars, typedCount } from "../../lib/motion";
import { tokenizeLine, type TokenKind } from "../../lib/syntax";
import { accent, alpha, amber, fg, ink2, line, muted } from "../theme";
import type { CodeScene as CodeData } from "../types";
import { Shell } from "./Shell";

/** Sober highlighting: mint keywords, amber literals, the rest in greys. */
const TOKEN: Record<TokenKind, string> = {
  keyword: accent,
  builtin: accent,
  function: fg,
  string: amber,
  interpolation: fg,
  number: amber,
  comment: alpha(muted, 0.8),
  punct: muted,
  plain: fg,
};

/** Code typed out in a plain panel, then the key lines lit. */
export function CodeScene({ scene, frames }: { scene: CodeData; frames: number }) {
  const frame = useCurrentFrame();
  const lines = scene.code.split("\n");
  const total = Array.from(scene.code).length;
  // Typing ends at 65 % of the scene; the rest is for reading.
  const typingStart = 10;
  const perFrame = total / Math.max(1, 0.65 * frames - typingStart);
  let budget = typedCount(frame, typingStart, perFrame);
  const done = budget >= total;
  const lit = interpolate(frame, [0.68 * frames, 0.68 * frames + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const longest = Math.max(...lines.map((l) => l.length));
  // Panel text width ≈ 790 px; a mono character is ~0.61 em, plus the line-number column.
  const fontSize = Math.min(34, Math.floor(790 / (longest * 0.61 + 1.8)));

  return (
    <Shell title={scene.title}>
      {() => (
        <div
          style={{
            border: `2px solid ${line}`,
            borderRadius: 22,
            background: ink2,
            padding: "34px 28px",
            fontFamily: mono,
            fontSize,
            lineHeight: 1.6,
            opacity: Math.min(1, frame / 6),
          }}
        >
          {lines.map((text, row) => {
            const length = Array.from(text).length;
            let remaining = Math.max(0, Math.min(budget, length));
            const caretHere = !done && budget >= 0 && budget <= length;
            budget -= length + 1;
            const highlighted = scene.highlight?.includes(row + 1) ?? false;
            return (
              <div
                key={row}
                style={{
                  display: "flex",
                  whiteSpace: "pre",
                  fontVariantLigatures: "none",
                  borderRadius: 8,
                  background: highlighted ? alpha(accent, 0.16 * lit) : undefined,
                  opacity: scene.highlight && !highlighted ? 1 - 0.45 * lit : 1,
                }}
              >
                <span style={{ width: fontSize * 1.8, flexShrink: 0, color: alpha(muted, 0.5) }}>{row + 1}</span>
                <span>
                  {tokenizeLine(text, scene.lang).map((token, i) => {
                    const shown = sliceChars(token.text, remaining);
                    remaining -= Array.from(shown).length;
                    return shown ? (
                      <span key={i} style={{ color: TOKEN[token.kind] }}>
                        {shown}
                      </span>
                    ) : null;
                  })}
                  {caretHere ? (
                    <span
                      style={{
                        display: "inline-block",
                        width: "0.55em",
                        height: "1.1em",
                        verticalAlign: "text-bottom",
                        background: accent,
                      }}
                    />
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Shell>
  );
}
