'use client';

import Link from 'next/link';

export default function SideNav() {
  return (
    <nav className="hidden md:block md:fixed md:left-0 md:top-0 md:h-screen md:w-[180px] md:bg-white md:text-ink md:flex md:flex-col md:justify-between md:px-6 md:py-12 md:z-50 md:border-r md:border-[#1A1A17]">
      {/* Arriba */}
      <div className="space-y-12">
        {/* Nombre/Logo */}
        <Link
          href="/"
          className="block font-display text-lg font-semibold hover:text-accent transition-colors"
        >
          Andrea Robles
        </Link>

        {/* Enlaces principales */}
        <div className="flex flex-col items-start space-y-6 text-sm">
          <Link
            href="/"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-1 transition-colors"
          >
            Sobre mí
          </Link>
          <Link
            href="/#proyectos"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-1 transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/blog"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-1 transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>

      {/* Abajo - CTA Contacto */}
      <Link
        href="/contacto"
        className="inline-block border border-[#1A1A17] rounded-full px-4 py-2 text-sm text-ink hover:bg-accent hover:border-accent hover:text-white transition-colors text-center font-medium"
      >
        Contacto
      </Link>
    </nav>
  );
}
