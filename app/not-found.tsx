import Link from "next/link";

/** Solo se llega aqui cuando Next no logra resolver ni siquiera el segmento
 *  [locale] (por ejemplo una peticion que esquiva el matcher del proxy). No
 *  hay forma fiable de saber el idioma en este punto, asi que va bilingue,
 *  sin next-intl (no hay locale que resolver) y sin las fuentes de Google
 *  para no duplicar su carga con la de app/[locale]/layout.tsx.
 *
 *  Usa el Link normal de next/link, no el de next-intl/i18n/navigation: ese
 *  ultimo asume el contexto de rutas con locale que aqui, por definicion, no
 *  se ha podido resolver. */
export default function RootNotFound() {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#FAFAF7", color: "#2B3300", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: 13, color: "#7A9201", marginBottom: 16 }}>
            Error 404
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, margin: "0 0 1.5rem" }}>
            Página no encontrada / Page not found
          </h1>
          <p style={{ marginBottom: 2 }}>
            <Link href="/" style={{ color: "#7A9201" }}>← Volver al inicio</Link>
          </p>
          <p>
            <Link href="/en" style={{ color: "#7A9201" }}>← Back home (English)</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
