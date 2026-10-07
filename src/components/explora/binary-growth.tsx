"use client";

import { useState } from "react";

const fmt = new Intl.NumberFormat("es-EC");

/** Worst case for binary search over n sorted items: ⌈log₂(n + 1)⌉ checks. */
const halving = (n: number) => Math.ceil(Math.log2(n + 1));
const MAX_STEPS = halving(1_000_000);

/**
 * A slider from 10 to a million items: one-by-one grows with the list, halving
 * barely moves. The dots are the halving steps, out of the 20 a million needs.
 */
export function BinaryGrowth() {
  // Slider position is the exponent, so 10 → 1 000 000 spreads evenly.
  const [exponent, setExponent] = useState(2);
  const n = Math.round(10 ** exponent);
  const steps = halving(n);

  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-5 md:p-6">
      <label className="flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Tamaño de la lista ordenada
        </span>
        <input
          type="range"
          min={1}
          max={6}
          step={0.05}
          value={exponent}
          onChange={(e) => setExponent(Number(e.target.value))}
          className="w-full accent-[hsl(var(--brand))]"
        />
        <span className="text-3xl font-semibold tracking-tight">{fmt.format(n)} datos</span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1 rounded-lg border p-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Uno por uno
          </span>
          <span className="text-2xl font-semibold">hasta {fmt.format(n)}</span>
          <span className="text-sm text-muted-foreground">intentos: crece igual que la lista.</span>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-brand/40 bg-brand/5 p-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brand">A la mitad</span>
          <span className="text-2xl font-semibold">hasta {steps}</span>
          <span className="text-sm text-muted-foreground">intentos: uno más cada vez que la lista se duplica.</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: MAX_STEPS }, (_, i) => (
            <span
              key={i}
              className={i < steps ? "h-3 flex-1 rounded-sm bg-brand" : "h-3 flex-1 rounded-sm bg-muted"}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {steps} de {MAX_STEPS} pasos: los que necesita un millón de datos.
        </span>
      </div>
    </div>
  );
}
