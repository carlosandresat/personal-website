import type { Piece } from "../types";

// Guion: negocio/redes/guiones/004-busqueda-binaria.md (keep the `say` lines in sync).
// Facts: 2^7 = 128 ≥ 100, so 7 guesses always suffice for 1–100;
// log2(1000) ≈ 9.97 → 10; 2^20 = 1 048 576 ≥ 1 000 000 → 20.
const VALUES = [3, 8, 12, 17, 21, 25, 30, 34, 41, 47, 52, 58, 63, 70, 77];

export const busquedaBinaria: Piece = {
  slug: "busqueda-binaria",
  scenes: [
    {
      kind: "hook",
      kicker: "Algoritmos",
      headline: "Adivino tu número del 1 al 100 en *7 intentos*",
      say: "Piensa un número del 1 al 100. Te lo adivino en *siete intentos* o menos.",
    },
    {
      kind: "array",
      title: "Buscar el *63* en una lista ordenada",
      values: VALUES,
      say: "El truco: siempre pregunto por el número del *medio*, y con cada respuesta descarto *la mitad*.",
      hold: 1.5,
      steps: [
        { range: [0, 14], focus: 7, note: "34 es menor → descarto la izquierda" },
        { range: [8, 14], focus: 11, note: "58 es menor → otra vez a la derecha" },
        { range: [12, 14], focus: 13, note: "70 es mayor → ahora a la izquierda" },
        { range: [12, 12], focus: 12, found: true, note: "¡*63*! Encontrado en *4 intentos*" },
      ],
    },
    {
      kind: "plot",
      title: "Intentos según el tamaño de la lista",
      x: [1, 100],
      y: [0, 100],
      xTicks: [1, 25, 50, 75, 100],
      xLabel: "números en la lista",
      yLabel: "intentos",
      curves: [
        { fn: (x) => x, label: "uno por uno", labelX: 70, tone: "amber" },
        { fn: (x) => Math.ceil(Math.log2(x + 1)), label: "a la mitad", labelX: 62, tone: "accent" },
      ],
      marks: [{ x: 100, y: 7, label: "7" }],
      say: "Revisar uno por uno crece *igual que la lista*. Partir a la mitad crece *muchísimo más lento*.",
    },
    {
      kind: "points",
      title: "¿Y con más datos?",
      points: [
        { text: "100 números → *7* intentos" },
        { text: "1 000 números → *10* intentos" },
        { text: "1 000 000 números → *20* intentos" },
      ],
      say: "Con mil números necesito *diez* intentos. Con un millón, solo *veinte*.",
    },
    {
      kind: "code",
      title: "En Python",
      lang: "python",
      highlight: [4],
      code: [
        "def buscar(lista, objetivo):",
        "    izq, der = 0, len(lista) - 1",
        "    while izq <= der:",
        "        medio = (izq + der) // 2",
        "        if lista[medio] == objetivo:",
        "            return medio",
        "        if lista[medio] < objetivo:",
        "            izq = medio + 1",
        "        else:",
        "            der = medio - 1",
        "    return -1",
      ].join("\n"),
      say: "En código son pocas líneas. Se llama *búsqueda binaria*, y la misma idea hace rápidos los índices de una base de datos.",
    },
    {
      kind: "outro",
      cta: "suave",
      // Answer: 9, since 2^8 = 256 < 366 ≤ 512 = 2^9.
      tarea: "Adivina el *día del año* en que nació alguien (del 1 al 366). ¿Cuántos intentos necesitas, como máximo?",
      say: "Ahora que ya sabes búsqueda binaria, podrás encontrar un dato entre millones en un parpadeo. Tarea para la casa: ¿cuántos intentos necesitas para adivinar el día del año en que nació alguien?",
    },
  ],
};
