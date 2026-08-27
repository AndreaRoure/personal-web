export type CategoriaId = "casos" | "articulos" | "side";

/** Cada categoria define su par de duotono. Todas comparten la luz lima
 *  para que las portadas se lean como una familia y no como tres estilos. */
export const CATEGORIAS: {
  id: CategoriaId;
  etiqueta: string;
  sombra: string;
  luz: string;
}[] = [
  { id: "casos",     etiqueta: "Casos de uso",  sombra: "#DC4632", luz: "#F7FFCC" },
  { id: "articulos", etiqueta: "Artículos",     sombra: "#7A9201", luz: "#F7FFCC" },
  { id: "side",      etiqueta: "Side projects", sombra: "#2B3300", luz: "#F7FFCC" },
];

/** Si el frontmatter trae una categoria desconocida, cae en articulos en vez
 *  de devolver undefined: antes eso reventaba la tarjeta al leer .sombra. */
export function categoriaDe(id: string | undefined) {
  return CATEGORIAS.find((c) => c.id === id) ?? CATEGORIAS[1];
}
