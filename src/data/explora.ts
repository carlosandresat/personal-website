/**
 * Topics of /explora: the social videos' subjects explained in depth. The
 * content is Spanish only for now, so titles and summaries live here rather
 * than in messages/; each topic's body is a component in
 * src/components/explora/ (registered in its index.ts).
 */
export type ExploraSeries = "como-funciona" | "sabias-que-puedes" | "mate-que-si-se-usa";

export type ExploraTopic = {
  slug: string;
  series: ExploraSeries;
  /** The content ladder: 1 everyday tech, 2 algorithms and data, 3 data science and ML. */
  season: 1 | 2 | 3;
  title: string;
  summary: string;
  minutes: number;
  /** ISO date, for ordering (newest first). */
  published: string;
};

export const exploraTopics: ExploraTopic[] = [
  {
    slug: "busqueda-binaria",
    series: "como-funciona",
    season: 1,
    title: "Búsqueda binaria: adivina un número del 1 al 100 en 7 intentos",
    summary:
      "Por qué partir a la mitad gana a revisar uno por uno, cuántos intentos necesitas para cualquier tamaño y dónde se usa la idea todos los días.",
    minutes: 6,
    published: "2026-10-07",
  },
];

export function getExploraTopic(slug: string) {
  return exploraTopics.find((topic) => topic.slug === slug);
}
