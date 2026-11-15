import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { getPosts } from "./posts";
import { SITE, rutaLocale } from "./seo";

const abs = (locale: string, path = "") => `${SITE}${rutaLocale(locale, path)}`;

/** Alternates de idioma para una entrada del sitemap (mismo path en todos). */
function idiomas(path: string) {
  return {
    languages: Object.fromEntries(routing.locales.map((l) => [l, abs(l, path)])),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entradas: MetadataRoute.Sitemap = [];
  const ultimoPost = routing.locales
    .flatMap((l) => getPosts(l).map((p) => p.date))
    .sort()
    .at(-1);

  for (const locale of routing.locales) {
    entradas.push({
      url: abs(locale),
      lastModified: ultimoPost,
      changeFrequency: "monthly",
      priority: 1,
      alternates: idiomas(""),
    });
    entradas.push({
      url: abs(locale, "/privacidad"),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: idiomas("/privacidad"),
    });

    for (const post of getPosts(locale)) {
      // Contraparte en los otros idiomas por el "id" del frontmatter (los
      // slugs estan traducidos).
      const languages: Record<string, string> = {};
      for (const l of routing.locales) {
        const par =
          l === locale ? post : post.id ? getPosts(l).find((p) => p.id === post.id) : undefined;
        if (par) languages[l] = abs(l, `/blog/${par.slug}`);
      }
      entradas.push({
        url: abs(locale, `/blog/${post.slug}`),
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entradas;
}
