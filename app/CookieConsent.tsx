"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

const GA_ID = "G-JHW1G6ER74";
const CLAVE = "cookieConsent";

type Estado = "pendiente" | "aceptado" | "rechazado";

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
    window.localStorage.setItem(CLAVE, nuevo);
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
          className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-[#1A1A17] bg-white"
        >
          <div className="max-w-4xl mx-auto px-5 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-ink/80 flex-1">
              {t("texto")}{" "}
              <Link href="/privacidad" className="underline hover:text-accent transition-colors">
                {t("masInfo")}
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => elegir("rechazado")}
                className="px-4 py-2 border-2 border-[#1A1A17] text-sm font-medium rounded-md hover:bg-[#1A1A17]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t("rechazar")}
              </button>
              <button
                type="button"
                onClick={() => elegir("aceptado")}
                className="px-4 py-2 border-2 border-accent bg-accent text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
