"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

const GA_ID = "G-JHW1G6ER74";
const CLAVE = "cookieConsent";

type Estado = "pendiente" | "aceptado" | "rechazado";

/** Borra las cookies de GA4 (_ga y _ga_<id>) en el dominio actual y en el
 *  dominio padre, que es donde GA las suele dejar (.andrearobles.net). */
function borrarCookiesGA() {
  const host = window.location.hostname;
  const dominios = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const nombre = c.split("=")[0].trim();
    if (!nombre.startsWith("_ga")) continue;
    for (const d of dominios) {
      document.cookie = `${nombre}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/** Banner de cookies + carga de Google Analytics 4.
 *
 *  GA no se carga en ningun caso hasta que el visitante pulsa "Aceptar":
 *  ni con la respuesta rechazada, ni mientras el banner sigue sin
 *  respuesta. La eleccion se guarda en localStorage, asi que solo se
 *  pregunta una vez por navegador.
 *
 *  Para reabrir el banner (enlace "Preferencias de cookies" del pie),
 *  cualquier componente puede lanzar el evento "abrir-preferencias-cookies"
 *  en window; este componente lo escucha y vuelve a mostrarse. */
export default function CookieConsent() {
  const t = useTranslations("cookies");
  // "pendiente" por defecto en los dos lados a proposito: el servidor no
  // tiene localStorage, asi que si el estado inicial dependiera de el aqui
  // (con un inicializador perezoso, por ejemplo) el primer render del
  // cliente no coincidiria con el HTML del servidor en cuanto ya hay una
  // eleccion guardada — con el banner de por medio (aparece o no) React no
  // sale bien de ese desajuste, y el banner se quedaba pegado en pantalla
  // aunque ya se hubiera aceptado. Se corrige aparte, en el efecto de abajo,
  // que solo corre en el cliente tras la hidratacion.
  const [estado, setEstado] = useState<Estado>("pendiente");

  useEffect(() => {
    const guardado = window.localStorage.getItem(CLAVE);
    if (guardado === "aceptado" || guardado === "rechazado") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ver comentario arriba: leer localStorage no puede pasar antes de montar
      setEstado(guardado);
    }
  }, []);

  useEffect(() => {
    const reabrir = () => setEstado("pendiente");
    window.addEventListener("abrir-preferencias-cookies", reabrir);
    return () => window.removeEventListener("abrir-preferencias-cookies", reabrir);
  }, []);

  function elegir(nuevo: "aceptado" | "rechazado") {
    const anterior = window.localStorage.getItem(CLAVE);
    window.localStorage.setItem(CLAVE, nuevo);
    if (nuevo === "rechazado" && anterior === "aceptado") {
      // Revocar de verdad: si GA ya estaba cargado en esta pestaña, se le
      // retira el consentimiento, se desactiva y se borran sus cookies; la
      // recarga deja la pagina sin el script.
      const w = window as unknown as { gtag?: (...a: unknown[]) => void } & Record<string, unknown>;
      w.gtag?.("consent", "update", { analytics_storage: "denied" });
      w[`ga-disable-${GA_ID}`] = true;
      borrarCookiesGA();
      window.location.reload();
      return;
    }
    setEstado(nuevo);
  }

  return (
    <>
      {estado === "aceptado" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'granted'
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {estado === "pendiente" && (
        <div
          role="dialog"
          aria-label={t("aviso")}
          className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-linea bg-white"
        >
          <div className="max-w-4xl mx-auto px-5 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-ink/80 flex-1">
              {t("texto")}{" "}
              <Link href="/privacidad" className="underline hover:text-accent-texto transition-colors">
                {t("masInfo")}
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => elegir("rechazado")}
                className="px-4 py-2 border-2 border-linea text-sm font-medium rounded-md hover:bg-linea/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t("rechazar")}
              </button>
              <button
                type="button"
                onClick={() => elegir("aceptado")}
                className="px-4 py-2 border-2 border-accent-texto bg-accent-texto text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t("aceptar")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
