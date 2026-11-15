import { routing } from "../i18n/routing";

export const SITE = "https://www.andrearobles.net";

/** Ruta publica de un path para un locale, respetando el "as-needed" del
 *  enrutado: es (por defecto) sin prefijo, en con /en. */
export function rutaLocale(locale: string, path = "") {
  const prefijo = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefijo}${path}` || "/";
}

/** canonical + hreflang (incluido self y x-default) para una pagina.
 *
 *  `paths` lleva el path de la pagina en cada idioma en que existe (los
 *  slugs de los articulos estan traducidos, asi que no siempre coinciden).
 *  El HTML es la unica fuente de hreflang: las cabeceras Link que añadia
 *  next-intl estan desactivadas (alternateLinks: false) porque asumian el
 *  mismo slug en los dos idiomas y apuntaban a URLs que dan 404. */
export function alternates(locale: string, paths: Partial<Record<string, string>>) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const p = paths[l];
    if (p !== undefined) languages[l] = rutaLocale(l, p);
  }
  const porDefecto = paths[routing.defaultLocale];
  if (porDefecto !== undefined) {
    languages["x-default"] = rutaLocale(routing.defaultLocale, porDefecto);
  }
  return {
    canonical: rutaLocale(locale, paths[locale] ?? ""),
    languages,
    // El RSS del idioma, anunciado en todas las paginas (alternates de una
    // pagina sustituye entero al del layout, por eso va aqui).
    types: { "application/rss+xml": rutaLocale(locale, "/rss") },
  };
}

export const OG_LOCALE: Record<string, string> = { es: "es_ES", en: "en_US" };
