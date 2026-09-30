import { useCurrentFrame } from "remotion";

import { sliceChars } from "../lib/motion";
import { tokenizeLine, type Language, type TokenKind } from "../lib/syntax";
import { color } from "../theme";

// Green-family palette: brand for keywords, a lime for literals.
const LITERAL = "hsla(84, 81%, 70%, 1)";
const TOKEN_COLOR: Record<TokenKind, string> = {
  keyword: color.brand(),
  builtin: color.brand(),
  function: color.foreground(),
  string: LITERAL,
  interpolation: color.foreground(),
  number: LITERAL,
  comment: color.mutedForeground(0.7),
  punct: color.mutedForeground(),
  plain: color.foreground(0.92),
};

export function Caret({ blink }: { blink: boolean }) {
  const frame = useCurrentFrame();
  const on = !blink || Math.floor(frame / 15) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: "0.55em",
        height: "1.15em",
        marginLeft: 2,
        verticalAlign: "text-bottom",
        background: color.brand(),
        opacity: on ? 1 : 0,
      }}
    />
  );
}

/** Typed-out source, highlighted as it appears. */
export function Editor({
  snippet,
  typed,
  done,
  lang = "python",
}: {
  snippet: string;
  typed: number;
  done: boolean;
  lang?: Language;
}) {
  const lines = snippet.split("\n");
  let budget = typed;
  let caretPlaced = false;

  return (
    <>
      {lines.map((line, row) => {
        const visible = Math.min(budget, Array.from(line).length);
        const isCaretLine = !caretPlaced && (budget <= Array.from(line).length || row === lines.length - 1);
        budget = Math.max(0, budget - Array.from(line).length - 1); // +1 for "\n"

        let remaining = visible;
        const parts = tokenizeLine(line, lang).map((token, i) => {
          const text = sliceChars(token.text, remaining);
          remaining -= Array.from(text).length;
          return text ? (
            <span key={i} style={{ color: TOKEN_COLOR[token.kind] }}>
              {text}
            </span>
          ) : null;
        });

        const showCaret = isCaretLine && !done;
        if (isCaretLine) caretPlaced = true;

        return (
          <div key={row} style={{ display: "flex", whiteSpace: "pre", minHeight: `${1.65}em`, fontVariantLigatures: "none" }}>
            <span style={{ width: 52, flexShrink: 0, color: color.mutedForeground(0.4) }}>
              {row + 1}
            </span>
            <span>
              {parts}
              {showCaret ? <Caret blink={false} /> : null}
            </span>
          </div>
        );
      })}
    </>
  );
}
