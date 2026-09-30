import { useCurrentFrame } from "remotion";

import { Caret, Editor } from "../../components/CodeEditor";
import { SceneFrame, SceneHeader, Window } from "../../components/primitives";
import { rise, sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import type { TrailerData } from "../trailer-data";

const TYPE_START = 20;
const TYPE_SPEED = 2; // chars per frame

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
