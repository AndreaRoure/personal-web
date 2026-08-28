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
    ];
  },
};

export default withNextIntl(nextConfig);
