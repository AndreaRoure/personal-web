import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // El español no lleva prefijo (/, /#archivo...); el ingles va en /en.
  localePrefix: "as-needed",
  // Sin cabeceras Link de hreflang automaticas: asumen el mismo slug en los
  // dos idiomas y los articulos tienen slugs traducidos (apuntaban a 404).
  // El hreflang lo emite el HTML de cada pagina (app/seo.ts).
  alternateLinks: false,
});
