import { useCurrentFrame } from "remotion";

import { SceneFrame, SceneHeader, Window } from "../../components/primitives";
import { rise, sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { tokenizeLine, type TokenKind } from "../../lib/python-syntax";
import { color } from "../../theme";
import type { TrailerData } from "../trailer-data";

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

const TYPE_START = 20;
const TYPE_SPEED = 2; // chars per frame

function Caret({ blink }: { blink: boolean }) {
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

function CodeWindow({
  title,
  label,
  delay,
  children,
  style,
}: {
  title: string;
  label: string;
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { portrait } = useLayout();
  return (
    <Window title={title} label={label} delay={delay} style={style}>
      {/* Bigger on portrait: it plays on a phone held upright. */}
      <div style={{ padding: "28px 36px", fontSize: portrait ? 34 : 30, lineHeight: 1.65, flex: 1 }}>
        {children}
      </div>
    </Window>
  );
}

/** Typed-out source, highlighted as it appears. */
function Editor({ snippet, typed, done }: { snippet: string; typed: number; done: boolean }) {
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
        const parts = tokenizeLine(line).map((token, i) => {
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
          <div key={row} style={{ display: "flex", whiteSpace: "pre", minHeight: `${1.65}em` }}>
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

function OutputLine({ children, delay }: { children: string; delay: number }) {
  const enter = useEnter(delay);
  return (
    <div style={{ whiteSpace: "pre", ...rise(enter, 14) }}>
      <span style={{ color: color.brand() }}>{"> "}</span>
      {children}
    </div>
  );
}

export function CodeScene({
  data,
  code,
}: {
  data: TrailerData;
  code: { snippet: string; output: string[] };
}) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const { snippet, output } = code;

  const total = Array.from(snippet).length;
  const typed = typedCount(frame, TYPE_START, TYPE_SPEED);
  const typingDone = typed >= total;
  const typingEnd = TYPE_START + Math.ceil(total / TYPE_SPEED);

  const command = "python main.py";
  const commandStart = typingEnd + 8;
  const commandTyped = typedCount(frame, commandStart, 1.5);
  const commandDone = commandTyped >= command.length;
  const outputStart = commandStart + Math.ceil(command.length / 1.5) + 6;

  return (
    <SceneFrame style={{ gap: 52 }}>
      <SceneHeader eyebrow={data.labels.codeEyebrow} title={data.labels.codeHeading} />
      <div
        style={{
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          gap: 32,
          alignItems: "stretch",
        }}
      >
        <CodeWindow title="main.py" label="Python 3" delay={8} style={{ flex: portrait ? undefined : 1.75 }}>
          <Editor snippet={snippet} typed={typed} done={typingDone} />
        </CodeWindow>
        <CodeWindow title="terminal" label="●" delay={14} style={{ flex: portrait ? undefined : 1, minHeight: portrait ? 300 : undefined }}>
          <div style={{ whiteSpace: "pre" }}>
            <span style={{ color: color.brand() }}>$ </span>
            {sliceChars(command, commandTyped)}
            {typingDone && !commandDone ? <Caret blink={false} /> : null}
            {!typingDone ? <Caret blink /> : null}
          </div>
          {output.map((line, i) => (
            <OutputLine key={line} delay={outputStart + i * 7}>
              {line}
            </OutputLine>
          ))}
          {commandDone && frame >= outputStart + output.length * 7 ? <Caret blink /> : null}
        </CodeWindow>
      </div>
    </SceneFrame>
  );
}
