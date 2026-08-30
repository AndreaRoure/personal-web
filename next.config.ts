import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // El articulo vivia en /blog/primer-posts, que llego a estar publicado.
  // Redirigimos para no dejar roto ningun enlace ya compartido.
  async redirects() {
    return [
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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
