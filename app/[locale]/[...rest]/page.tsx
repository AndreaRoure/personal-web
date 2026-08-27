import { notFound } from "next/navigation";

/** Comodin para cualquier ruta que no coincide con nada bajo [locale].
 *
 *  Sin esto, una URL como /en/esto-no-existe no llega a matchear ninguna
 *  pagina real y Next.js renderiza el 404 saltandose por completo
 *  [locale]/layout.tsx: sale sin TopNav, sin <html lang>, y con los mensajes
 *  siempre en el idioma por defecto. Forzando el match aqui (y llamando a
 *  notFound() de forma explicita) la ruta SI queda dentro del arbol de
 *  [locale], asi que dispara [locale]/not-found.tsx con el layout, la
 *  navegacion y el idioma correctos. */
export default function CatchAll(): never {
  notFound();
}
