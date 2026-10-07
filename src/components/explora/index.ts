import type { ComponentType } from "react";

import { BusquedaBinaria } from "@/components/explora/busqueda-binaria";

/** The body of each /explora topic, by slug (see src/data/explora.ts). */
export const EXPLORA_CONTENT: Record<string, ComponentType> = {
  "busqueda-binaria": BusquedaBinaria,
};
