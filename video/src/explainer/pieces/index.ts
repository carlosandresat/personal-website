import type { Piece } from "../types";
import { busquedaBinaria } from "./busqueda-binaria";
import { muestrario } from "./muestrario";

/** Every explainer; each gets a portrait composition `Redes-<slug>`. */
export const PIECES: Record<string, Piece> = Object.fromEntries(
  [muestrario, busquedaBinaria].map((piece) => [piece.slug, piece])
);
