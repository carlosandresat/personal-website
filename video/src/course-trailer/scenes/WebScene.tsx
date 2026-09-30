import { interpolate, useCurrentFrame } from "remotion";

import { Editor } from "../../components/CodeEditor";
import { SceneFrame, SceneHeader, Window } from "../../components/primitives";
import { mono } from "../../fonts";
import { typedCount, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import type { WebFile, WebPreview } from "../trailer-copy";
import type { TrailerData } from "../trailer-data";

const START = 20;
const SPEED = 3; // chars per frame
const FILE_GAP = 10;

type ScheduledFile = WebFile & { start: number; end: number; lineEnds: number[] };

/** When each file types, and the frame each of its lines finishes. */
export function webTiming(files: WebFile[]) {
  let at = START;
  const scheduled: ScheduledFile[] = files.map((file) => {
    let chars = 0;
    const lineEnds = file.code.split("\n").map((line) => {
      chars += Array.from(line).length + 1;
      return at + Math.ceil((chars - 1) / SPEED);
    });
    const end = at + Math.ceil(Array.from(file.code).length / SPEED);
    const entry = { ...file, start: at, end, lineEnds };
    at = end + FILE_GAP;
    return entry;
  });
  const cursorAt = scheduled[scheduled.length - 1].end + 6;
  const clickAt = cursorAt + 18;
  // ~2 s to take in the click's effect, plus the scene's fade-out.
  return { files: scheduled, cursorAt, clickAt, frames: clickAt + 75 };
}

function linesDone(file: ScheduledFile | undefined, frame: number) {
  return file ? file.lineEnds.filter((end) => frame >= end).length : 0;
}

function Pointer() {
  return (
    <svg viewBox="0 0 16 22" width={30} height={42}>
      <path d="M1 1v17l4.5-4 3 7 3-1.4-3-6.8H14z" fill="#FFFFFF" stroke="#000000" strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  );
}

/** The browser: the page as the typed files would render it so far. */
function Page({
  preview,
  frame,
  html,
  css,
  cursorAt,
  clickAt,
}: {
  preview: WebPreview;
  frame: number;
  html: ScheduledFile | undefined;
  css: ScheduledFile | undefined;
  cursorAt: number;
  clickAt: number;
}) {
  const { portrait } = useLayout();
  const shown = linesDone(html, frame);
  const applied = preview.styles.slice(0, linesDone(css, frame));
  const style = {
    body: Object.assign({}, ...applied.map((s) => s.body)),
    h1: Object.assign({}, ...applied.map((s) => s.h1)),
    button: Object.assign({}, ...applied.map((s) => s.button)),
  };

  // Every finished HTML/CSS line changes the page; flash it so it reads.
  const updates = [...(html?.lineEnds ?? []), ...(css?.lineEnds ?? [])];
  const pulse = updates.some((end) => frame >= end && frame < end + 6);

  const clicked = frame >= clickAt + 2;
  const pressed = frame >= clickAt && frame < clickAt + 4;
  const highlight = clicked
    ? interpolate(frame, [clickAt + 2, clickAt + 26], [1, 0], { extrapolateRight: "clamp" })
    : 0;
  const glide = interpolate(frame, [cursorAt, cursorAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <div
      style={{
        flex: 1,
        padding: "30px 34px",
        background: "#FFFFFF",
        color: "#000000",
        // The browser's defaults until the CSS says otherwise.
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: portrait ? 36 : 34,
        boxShadow: pulse ? `inset 0 0 0 5px ${color.brand()}` : "none",
        ...style.body,
      }}
    >
      {shown >= 1 ? (
        <h1 style={{ margin: "0 0 16px", fontSize: "2em", fontWeight: 700, lineHeight: 1.15, ...style.h1 }}>
          {preview.heading}
        </h1>
      ) : null}
      {shown >= 2 ? (
        <p
          style={{
            margin: "0 0 22px",
            display: "inline-block",
            background: `rgba(190, 242, 100, ${highlight})`,
          }}
        >
          {clicked ? preview.clicked : preview.paragraph}
        </p>
      ) : null}
      {shown >= 3 ? (
        <div>
          <button
            style={{
              position: "relative",
              // Buttons don't inherit the page font, in a real browser either.
              fontFamily: "Arial, sans-serif",
              fontSize: "0.8em",
              padding: "6px 18px",
              border: "2px solid #767676",
              borderRadius: 4,
              background: "#EFEFEF",
              color: "#000000",
              transform: pressed ? "scale(0.94)" : undefined,
              ...style.button,
            }}
          >
            {preview.button}
            {frame >= cursorAt ? (
              <span
                style={{
                  position: "absolute",
                  left: interpolate(glide, [0, 1], [320, 70]),
                  top: interpolate(glide, [0, 1], [170, 20]),
                }}
              >
                <Pointer />
              </span>
            ) : null}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function WebScene({
  data,
  files,
  preview,
}: {
  data: TrailerData;
  files: WebFile[];
  preview: WebPreview;
}) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const timing = webTiming(files);

  let active = timing.files[0];
  for (const file of timing.files) if (frame >= file.start) active = file;
  const typed = typedCount(frame, active.start, SPEED);
  const html = timing.files.find((f) => f.lang === "html");
  const css = timing.files.find((f) => f.lang === "css");

  return (
    <SceneFrame style={{ gap: 52 }}>
      <SceneHeader eyebrow={data.labels.codeEyebrow} title={data.labels.codeHeading} />
      <div
        style={{
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          alignItems: "stretch",
          gap: 32,
        }}
      >
        <Window
          title={data.labels.blocksWindow}
          label={active.lang.toUpperCase()}
          delay={8}
          style={{ flex: portrait ? undefined : 1.15, minHeight: portrait ? 380 : 470 }}
        >
          <div style={{ display: "flex", borderBottom: `1px solid ${color.border()}`, fontFamily: mono, fontSize: 20 }}>
            {timing.files.map((file) => {
              const isActive = file === active;
              return (
                <span
                  key={file.name}
                  style={{
                    padding: "12px 24px",
                    color: isActive ? color.foreground() : color.mutedForeground(0.7),
                    borderBottom: `3px solid ${isActive ? color.brand() : "transparent"}`,
                  }}
                >
                  {file.name}
                </span>
              );
            })}
          </div>
          <div
            style={{
              padding: "24px 32px",
              fontFamily: mono,
              fontSize: portrait ? 28 : 26,
              lineHeight: 1.65,
            }}
          >
            <Editor snippet={active.code} typed={typed} done={frame >= active.end} lang={active.lang} />
          </div>
        </Window>

        <Window
          title={preview.url}
          label="●"
          delay={14}
          style={{ flex: portrait ? undefined : 1, minHeight: portrait ? 420 : 470 }}
        >
          <Page
            preview={preview}
            frame={frame}
            html={html}
            css={css}
            cursorAt={timing.cursorAt}
            clickAt={timing.clickAt}
          />
        </Window>
      </div>
    </SceneFrame>
  );
}
