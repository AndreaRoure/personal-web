/** Fecha de un articulo legible en el idioma de la pagina ("11 sept 2026" /
 *  "11 Sept 2026"). La fecha del frontmatter es AAAA-MM-DD: se interpreta en
 *  UTC para que la zona horaria del build no la mueva un dia. */
export function formatearFecha(fecha: string, locale: string) {
  const d = new Date(`${fecha}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return fecha;
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** La misma fecha dentro de un <time> con el valor ISO para maquinas. */
export default function FechaPost({ fecha, locale }: { fecha: string; locale: string }) {
  return <time dateTime={fecha}>{formatearFecha(fecha, locale)}</time>;
}
