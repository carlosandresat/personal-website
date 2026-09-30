import { interpolateColors } from "remotion";

import { pad2 } from "../course-trailer/pacing";
import { mono } from "../fonts";
import { useLayout } from "../lib/motion";
import { Sprite } from "../pixel/draw";
import { CHECK } from "../pixel/animations/people";
import { color } from "../theme";

/** A node's state, each 0–1 so scenes can spring between them. */
export type RailNode = { enter: number; active: number; done: number };

const LINE = 2;

function Node({ index, node, size }: { index: number; node: RailNode; size: number }) {
  const { enter, active, done } = node;
  const lit = Math.max(active, done);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        border: `2px solid ${interpolateColors(lit, [0, 1], [color.border(), color.brand()])}`,
        background: interpolateColors(done, [0, 1], [color.background(), color.brand()]),
        boxShadow: `0 0 ${Math.round(28 * active)}px ${color.brand(0.55 * active)}, inset 0 0 0 ${Math.round(40 * active * (1 - done))}px ${color.brand(0.14)}`,
        fontFamily: mono,
        fontSize: size * 0.38,
        color: interpolateColors(active, [0, 1], [color.mutedForeground(), color.brand()]),
        opacity: enter,
        transform: `scale(${0.6 + 0.4 * enter})`,
      }}
    >
      {done > 0.5 ? (
        <svg viewBox="-1 -1 9 8" width={size * 0.5} shapeRendering="crispEdges">
          <Sprite grid={CHECK} x={0} y={0} tone="0" />
        </svg>
      ) : (
        pad2(index + 1)
      )}
    </div>
  );
}

/**
 * The five phases as a horizontal rail: numbered nodes joined by a line that
 * fills as the process moves on. Titles sit under the nodes on landscape;
 * portrait is too narrow for them, so it shows the numbers alone.
 */
export function PhaseRail({
  titles,
  nodes,
  fill,
}: {
  titles: string[];
  nodes: RailNode[];
  /** How far each connector (node i → i + 1) has filled, 0–1. */
  fill: number[];
}) {
  const { portrait } = useLayout();
  const n = titles.length;
  const size = portrait ? 64 : 56;
  const gap = 14;

  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)` }}>
      {titles.slice(0, -1).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: size / 2 - LINE / 2,
            left: `calc(${((i + 0.5) / n) * 100}% + ${size / 2 + gap}px)`,
            width: `calc(${100 / n}% - ${size + gap * 2}px)`,
            height: LINE,
            background: color.border(),
            transform: `scaleX(${nodes[i + 1].enter})`,
            transformOrigin: "left",
          }}
        >
          <div
            style={{
              width: `${fill[i] * 100}%`,
              height: "100%",
              background: color.brand(),
              boxShadow: `0 0 10px ${color.brand(0.7)}`,
            }}
          />
        </div>
      ))}

      {titles.map((title, i) => {
        const node = nodes[i];
        return (
          <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <Node index={i} node={node} size={size} />
            {portrait ? null : (
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 19,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: interpolateColors(
                    node.active,
                    [0, 1],
                    [color.mutedForeground(node.done > 0.5 ? 1 : 0.6), color.foreground()]
                  ),
                  opacity: node.enter,
                }}
              >
                {title}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
