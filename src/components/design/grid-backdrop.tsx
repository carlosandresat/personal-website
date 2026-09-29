"use client";

import { useEffect, useRef } from "react";

/**
 * Signals that travel along the grid on touch devices. Hardcoded rather than
 * random so the prerendered markup matches hydration. `line` is a grid index
 * (multiples of --grid-cell); indices stay small so every line lands inside a
 * ~375px-wide phone hero. Times are in seconds; each pulse spends the first
 * 60% of its cycle crossing and the rest offscreen, so ~2 are visible at once.
 */
const PULSES: { axis: "x" | "y"; line: number; dur: number; delay: number }[] =
  [
    { axis: "x", line: 3, dur: 7, delay: 0 },
    { axis: "y", line: 2, dur: 9, delay: 1.5 },
    { axis: "x", line: 12, dur: 8, delay: 3 },
    { axis: "y", line: 6, dur: 10, delay: 4.5 },
    { axis: "x", line: 7, dur: 9, delay: 6 },
    { axis: "y", line: 4, dur: 8, delay: 7.5 },
  ];

/**
 * The hero's circuit grid, plus a light layer: a spotlight that follows a
 * fine pointer, or travelling pulses on touch. Which one shows is decided by
 * media queries in globals.css, so nothing flashes on hydration.
 */
export function GridBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    // Write CSS variables straight to the node — no React state, so moving
    // the mouse never re-renders anything.
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      node.style.setProperty("--spot-x", `${x}px`);
      node.style.setProperty("--spot-y", `${y}px`);
      node.style.setProperty("--spot-on", inside ? "1" : "0");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      schedule();
    };

    const onPointerLeave = () => {
      node.style.setProperty("--spot-on", "0");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // Scrolling moves the grid under a still cursor.
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
    >
      <div className="circuit-grid absolute inset-0" />
      <div className="grid-spotlight absolute inset-0" />
      <div className="grid-pulses absolute inset-0 overflow-hidden">
        {PULSES.map((pulse, i) => (
          <span
            key={i}
            data-axis={pulse.axis}
            className="grid-pulse"
            style={
              {
                "--line": pulse.line,
                "--dur": `${pulse.dur}s`,
                "--delay": `${pulse.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
