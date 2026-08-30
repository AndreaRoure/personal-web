import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { getPosts } from "./posts";

const SITE = "https://www.andrearobles.net";

/** URL de una ruta para un locale dado, respetando el "as-needed" del
 *  enrutado: es (por defecto) sin prefijo, en con /en. */
function url(locale: string, path = "") {
  const prefijo = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE}${prefijo}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entradas: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entradas.push({ url: url(locale), changeFrequency: "monthly", priority: 1 });
    entradas.push({ url: url(locale, "/privacidad"), changeFrequency: "yearly", priority: 0.3 });

    for (const post of getPosts(locale)) {
      entradas.push({
        url: url(locale, `/blog/${post.slug}`),
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return entradas;
}
