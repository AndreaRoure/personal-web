import type { NextConfig } from "next";

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
};

export default nextConfig;