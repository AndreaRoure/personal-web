import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // El español no lleva prefijo (/, /#archivo...); el ingles va en /en.
  localePrefix: "as-needed",
});
