"use client";

import { useTranslations } from "next-intl";

/** Solo lanza el evento que CookieConsent escucha para volver a mostrarse.
 *  Vive separado de CookieConsent porque este boton esta en el pie
 *  (layout.tsx, fuera del propio banner) y no comparten estado de React. */
export default function CookiePrefsBoton() {
  const t = useTranslations("cookies");
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("abrir-preferencias-cookies"))}
      className="underline hover:text-accent transition-colors"
    >
      {t("preferencias")}
    </button>
  );
}
