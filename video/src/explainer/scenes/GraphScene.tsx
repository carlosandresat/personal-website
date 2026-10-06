import { useId } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { mono } from "../../fonts";
import { enterAt } from "../../lib/motion";
import { stepFrame } from "../pacing";
import { accent, alpha, fg, ink, ink2, line, muted } from "../theme";
import type { GraphNode, GraphScene as GraphData } from "../types";
import { Shell } from "./Shell";

const DRAW_FRAMES = 18;

/** Box size from the label, so arrows can stop at the border. */
function size(node: GraphNode) {
  const chars = Math.max(node.label.length, (node.sub?.length ?? 0) * 0.62);
  return { w: Math.min(420, Math.max(200, chars * 23 + 64)), h: node.sub ? 128 : 100 };
}

type Point = { x: number; y: number };

/** Where the segment from a box's centre towards `to` leaves the box. */
function exit(center: Point, box: { w: number; h: number }, to: Point, gap = 10): Point {
  const dx = to.x - center.x;
  const dy = to.y - center.y;
  const scale = Math.min((box.w / 2 + gap) / Math.abs(dx || 1e-6), (box.h / 2 + gap) / Math.abs(dy || 1e-6));
  return { x: center.x + dx * scale, y: center.y + dy * scale };
}

/** Boxes and arrows: how parts of a system connect, and a packet moving through them. */
export function GraphScene({ scene, frames }: { scene: GraphData; frames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hasPacket = (scene.packet?.length ?? 0) > 1;
  const [nodeFrom, nodeTo] = hasPacket ? [0.05, 0.3] : [0.05, 0.45];
  const [edgeFrom, edgeTo] = hasPacket ? [0.25, 0.5] : [0.3, 0.7];

  return (
    <Shell title={scene.title}>
      {({ width, height }) => {
        const byId = new Map(scene.nodes.map((n) => [n.id, n]));
        const center = (n: GraphNode): Point => ({ x: n.x * width, y: n.y * height });
        const segment = (fromId: string, toId: string) => {
          const a = byId.get(fromId);
          const b = byId.get(toId);
          if (!a || !b) throw new Error(`Graph edge ${fromId} → ${toId}: unknown node`);
          return { start: exit(center(a), size(a), center(b)), end: exit(center(b), size(b), center(a)) };
        };

        // Packet: equal time per hop, after the drawing is done.
        let packet: Point | null = null;
        if (hasPacket && scene.packet) {
          const hops = scene.packet.length - 1;
          const t = interpolate(frame, [0.55 * frames, 0.92 * frames], [0, hops], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          if (frame >= 0.55 * frames - 4) {
            const hop = Math.min(hops - 1, Math.floor(t));
            const local = Easing.inOut(Easing.quad)(t - hop);
            const { start, end } = segment(scene.packet[hop], scene.packet[hop + 1]);
            packet = { x: start.x + (end.x - start.x) * local, y: start.y + (end.y - start.y) * local };
          }
        }

        return (
          <div style={{ position: "relative", width, height }}>
            <svg width={width} height={height} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
              <defs>
                <marker
                  id={`${id}-arrow`}
                  viewBox="0 0 10 10"
                  refX={8}
                  refY={5}
                  markerWidth={22}
                  markerHeight={22}
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill={muted} />
                </marker>
              </defs>
              {scene.edges.map((edge, i) => {
                const start0 = stepFrame(frames, i, scene.edges.length, edge.at, edgeFrom, edgeTo);
                const p = interpolate(frame, [start0, start0 + DRAW_FRAMES], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                });
                if (p <= 0) return null;
                const { start, end } = segment(edge.from, edge.to);
                const tip = { x: start.x + (end.x - start.x) * p, y: start.y + (end.y - start.y) * p };
                return (
                  <g key={i}>
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={tip.x}
                      y2={tip.y}
                      stroke={muted}
                      strokeWidth={4}
                      strokeDasharray={edge.dashed ? "12 12" : undefined}
                      markerEnd={p > 0.9 ? `url(#${id}-arrow)` : undefined}
                    />
                    {edge.label ? (
                      <text
                        x={(start.x + end.x) / 2}
                        y={(start.y + end.y) / 2 - 18}
                        textAnchor="middle"
                        fontFamily={mono}
                        fontSize={26}
                        fill={muted}
                        stroke={ink}
                        strokeWidth={10}
                        paintOrder="stroke"
                        opacity={interpolate(p, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" })}
                      >
                        {edge.label}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>

            {scene.nodes.map((node, i) => {
              const enter = enterAt(frame, fps, stepFrame(frames, i, scene.nodes.length, node.at, nodeFrom, nodeTo), 16);
              const { w, h } = size(node);
              const c = center(node);
              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: c.x - w / 2,
                    top: c.y - h / 2,
                    width: w,
                    height: h,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    borderRadius: 22,
                    border: `3px solid ${node.accent ? accent : line}`,
                    background: node.accent ? alpha(accent, 0.12) : ink2,
                    opacity: Math.min(1, enter),
                    transform: `scale(${0.85 + 0.15 * enter})`,
                  }}
                >
                  <span style={{ fontSize: 38, fontWeight: 700, color: fg }}>{node.label}</span>
                  {node.sub ? (
                    <span style={{ fontFamily: mono, fontSize: 24, color: muted }}>{node.sub}</span>
                  ) : null}
                </div>
              );
            })}

            {packet ? (
              <div
                style={{
                  position: "absolute",
                  left: packet.x - 16,
                  top: packet.y - 16,
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: accent,
                  boxShadow: `0 0 28px ${accent}`,
                }}
              />
            ) : null}
          </div>
        );
      }}
    </Shell>
  );
}
