"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX = 100;
/** Enough for 1–100: 2^7 = 128. */
const LIMIT = Math.ceil(Math.log2(MAX + 1));

type Answer = "menor" | "mayor";

/**
 * The video's game, playable: think of a number and the page finds it by
 * binary search, showing which part of 1–100 each answer rules out.
 */
export function BinaryGuessGame() {
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(MAX);
  const [tries, setTries] = useState(1);
  const [found, setFound] = useState(false);

  // Answers that would empty the range are disabled, so low ≤ high always.
  const guess = Math.floor((low + high) / 2);

  function answer(direction: Answer) {
    if (direction === "menor") setHigh(guess - 1);
    else setLow(guess + 1);
    setTries((n) => n + 1);
  }

  function reset() {
    setLow(1);
    setHigh(MAX);
    setTries(1);
    setFound(false);
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl border bg-card p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Piensa un número del 1 al {MAX}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Intento {tries} · máximo {LIMIT}
        </span>
      </div>

      {/* The range still in play, over the whole 1–100. */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
        <div
          className="absolute inset-y-0 rounded-full bg-brand/70 transition-all duration-300"
          style={{
            left: `${((low - 1) / MAX) * 100}%`,
            width: `${((high - low + 1) / MAX) * 100}%`,
          }}
        />
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {low === high ? `Solo queda el ${low}.` : `Quedan ${high - low + 1} posibles: del ${low} al ${high}.`}
      </p>

      {found ? (
        <p className="text-lg font-semibold">
          ¡Es el <span className="text-brand">{guess}</span>! Lo encontré en {tries}{" "}
          {tries === 1 ? "intento" : "intentos"}.
        </p>
      ) : (
        <>
          <p className="text-2xl font-semibold tracking-tight">
            ¿Es el <span className="text-brand">{guess}</span>?
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => answer("menor")} disabled={guess <= low}>
              Es menor
            </Button>
            <Button onClick={() => setFound(true)}>¡Es ese!</Button>
            <Button variant="outline" onClick={() => answer("mayor")} disabled={guess >= high}>
              Es mayor
            </Button>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={reset}
        className={cn(
          "self-start font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
          "underline-offset-4 hover:text-foreground hover:underline"
        )}
      >
        Empezar de nuevo
      </button>
    </div>
  );
}
