import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // El articulo vivia en /blog/primer-posts, que llego a estar publicado.
  // Redirigimos para no dejar roto ningun enlace ya compartido.
  async redirects() {
    return [
      // El dominio de Vercel con el que nacio el proyecto seguia sirviendo la
      // web entera (contenido duplicado para Google). Se redirige al dominio
      // propio. Solo ese host: los despliegues de preview siguen funcionando.
      {
        source: "/:path*",
        has: [{ type: "host", value: "personal-web-self-phi.vercel.app" }],
        destination: "https://www.andrearobles.net/:path*",
        permanent: true,
      },
      {
        source: "/blog/primer-posts",
        destination: "/blog/tecnologia-no-es-neutral",
        permanent: true,
      },
    ];
  },
  // El retrato de "sobre mi" no debe salir en Google Imagenes (aunque el
  // resto de la web si sea indexable). noimageindex en la pagina bloquearia
  // TODAS sus imagenes, no solo esta, asi que va como cabecera HTTP propia
  // del fichero, que es lo que documenta Google para excluir una imagen
  // suelta sin afectar a la pagina que la contiene.
  async headers() {
    return [
      {
        source: "/andrea-about.jpg",
        headers: [{ key: "X-Robots-Tag", value: "noimageindex" }],
      },
      // Cabeceras de seguridad estandar para toda la web. Vercel ya añade
      // Strict-Transport-Security por su cuenta en el dominio propio, estas
      // son las que no vienen por defecto.
      {
        source: "/(.*)",
        headers: [
          // Evita que el navegador intente adivinar el tipo de un fichero
          // servido con un content-type distinto (protege contra ataques
          // que se aprovechan de esa "adivinanza" para ejecutar contenido).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Nadie puede meter la web en un <iframe> ajeno (clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          // No se filtra la URL completa como referrer a sitios externos,
          // solo el origen — y nada en absoluto si se navega de https a http.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // La web no usa camara, microfono ni geolocalizacion: se desactivan
          // explicitamente para que ningun script (propio o de terceros,
          // como Google Analytics) pueda pedirlos.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
          // HSTS explicita: Vercel solo manda max-age. includeSubDomains +
          // preload permite registrar el dominio en hstspreload.org (antes,
          // confirmar que ningun subdominio necesita servirse por http).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // CSP en modo "solo informe": el navegador avisa en consola de lo
          // que bloquearia, sin bloquear nada. Tras 1-2 semanas sin avisos
          // inesperados, cambiar la clave a "Content-Security-Policy".
          // 'unsafe-inline' en scripts es necesario mientras las paginas sean
          // estaticas (los scripts inline de Next no llevan nonce); aun asi
          // limita de donde se pueden cargar scripts y prohibe iframes,
          // <object>, <base> y formularios hacia fuera.
          { key: "Content-Security-Policy-Report-Only", value: CSP },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
