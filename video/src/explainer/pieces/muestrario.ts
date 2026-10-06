import type { Piece } from "../types";

/** Every scene kind once, as a reference in the studio. Not for publishing. */
export const muestrario: Piece = {
  slug: "muestrario",
  scenes: [
    {
      kind: "hook",
      kicker: "Muestrario",
      headline: "Todas las escenas de la *plantilla*",
      say: "Este es el muestrario de la plantilla: cada tipo de escena una vez.",
    },
    {
      kind: "points",
      title: "Puntos",
      points: [{ text: "Uno por uno, con *énfasis*" }, { text: "Hasta cuatro o cinco" }, { text: "Para resumir una idea" }],
      say: "Los puntos aparecen de uno en uno, para resumir.",
    },
    {
      kind: "plot",
      title: "Funciones",
      x: [-3, 3],
      y: [-2, 9],
      curves: [
        { fn: (x) => x * x, label: "y = x²" },
        { fn: (x) => 2 * x + 1, label: "y = 2x + 1", labelX: 2.4 },
      ],
      marks: [{ x: 1, y: 1, label: "(1, 1)", guides: true }],
      say: "Las gráficas dibujan cada función de izquierda a derecha y marcan los puntos importantes.",
    },
    {
      kind: "graph",
      title: "Diagramas",
      nodes: [
        { id: "nav", label: "Navegador", sub: "tu celular", x: 0.28, y: 0.15 },
        { id: "dns", label: "DNS", sub: "la guía", x: 0.72, y: 0.42 },
        { id: "srv", label: "Servidor", sub: "la web", x: 0.28, y: 0.72, accent: true },
      ],
      edges: [
        { from: "nav", to: "dns", label: "¿dónde está?" },
        { from: "nav", to: "srv", label: "petición" },
      ],
      packet: ["nav", "dns", "nav", "srv"],
      say: "Los diagramas conectan las partes de un sistema, y un punto muestra cómo viaja la información.",
    },
    {
      kind: "array",
      title: "Arreglos",
      values: [5, 2, 9, 1, 7],
      steps: [
        { focus: 0, note: "Se mira una celda" },
        { focus: 2, range: [1, 4], note: "Se descartan las que *ya no sirven*" },
        { values: [1, 2, 5, 7, 9], range: [0, 4], note: "O se cambian los valores" },
      ],
      say: "Los arreglos muestran paso a paso cómo un algoritmo recorre los datos.",
    },
    {
      kind: "code",
      title: "Código",
      lang: "js",
      highlight: [2],
      code: "function saludar(nombre) {\n  return `Hola, ${nombre}`;\n}\n\nconsole.log(saludar(\"Ana\"));",
      say: "El código se escribe solo y luego se resaltan las líneas clave.",
    },
    {
      kind: "pixel",
      title: "Pixel art",
      animation: "database",
      label: "base de datos",
      say: "El pixel art queda para metáforas e historias, nunca para gráficas.",
    },
    { kind: "outro", cta: "fuerte", say: "Y el cierre: llamado suave, o fuerte con WhatsApp." },
  ],
};
