import { useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../../fonts";
import { enterAt, rise, useEnter } from "../../lib/motion";
import { accent } from "../theme";
import type { HookScene as HookData } from "../types";
import { Shell } from "./Shell";

/** The question or claim that has to land in the first two seconds. */
export function HookScene({ scene }: { scene: HookData }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kicker = useEnter(0);

  // Words rise one after another; *emphasis* keeps its colour.
  let emph = false;
  const words = scene.headline.split(" ").map((raw) => {
    const starts = raw.startsWith("*");
    const ends = raw.replace(/[.,;:?!¿¡]+$/, "").endsWith("*");
    if (starts) emph = true;
    const word = { text: raw.replace(/\*/g, ""), emph };
    if (ends) emph = false;
    return word;
  });

  return (
    <Shell center>
      {() => (
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {scene.kicker ? (
            <span
              style={{
                fontFamily: mono,
                fontSize: 30,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: accent,
                ...rise(kicker, 16),
              }}
            >
              {scene.kicker}
            </span>
          ) : null}
          <h1
            style={{
              margin: 0,
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "0.24em",
            }}
          >
            {words.map((word, i) => {
              const enter = enterAt(frame, fps, 4 + i * 3);
              return (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}>
                  <span
                    style={{
                      display: "inline-block",
                      transform: `translateY(${(1 - enter) * 110}%)`,
                      color: word.emph ? accent : undefined,
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              );
            })}
          </h1>
        </div>
      )}
    </Shell>
  );
}
