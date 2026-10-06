import { useCurrentFrame } from "remotion";

import { display } from "../../fonts";
import { rise, useEnter } from "../../lib/motion";
import { Emph } from "../Emph";
import { FADE } from "../pacing";
import { CONTENT_H, CONTENT_W, LAYOUT, fg } from "../theme";

/**
 * The visual band every scene draws in, with an optional title on top.
 * Children get the remaining height (`bodyHeight`) to lay themselves out.
 */
export function Shell({
  title,
  children,
  center = false,
}: {
  title?: string;
  children: (size: { width: number; height: number }) => React.ReactNode;
  center?: boolean;
}) {
  const frame = useCurrentFrame();
  const titleIn = useEnter(2);
  const titleHeight = title ? 150 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.left,
        top: LAYOUT.top,
        width: CONTENT_W,
        height: CONTENT_H,
        display: "flex",
        flexDirection: "column",
        justifyContent: center ? "center" : "flex-start",
        fontFamily: display,
        color: fg,
        opacity: Math.min(1, frame / FADE),
      }}
    >
      {title ? (
        <h2
          style={{
            margin: 0,
            height: titleHeight,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            ...rise(titleIn, 24),
          }}
        >
          <Emph text={title} />
        </h2>
      ) : null}
      {children({ width: CONTENT_W, height: CONTENT_H - titleHeight })}
    </div>
  );
}
