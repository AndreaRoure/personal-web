'use client';

import Link from 'next/link';

export default function SideNav() {
  return (
    <nav className="fixed left-0 top-0 h-screen w-[180px] bg-white text-ink flex flex-col justify-between p-5 z-50 border-r border-[#1A1A17] max-md:hidden">
      {/* Arriba */}
      <div className="space-y-2.5">
        {/* Nombre/Logo */}
        <Link
          href="/"
          className="block font-display text-[19px] font-semibold leading-tight hover:text-accent transition-colors"
        >
          Andrea Robles
        </Link>

        {/* Enlaces principales */}
        <div className="flex flex-col items-start space-y-px text-[15px] leading-[1.2]">
          <Link
            href="/"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Sobre mí
          </Link>
          <Link
            href="/#proyectos"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/blog"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>

      {/* Abajo - CTA Contacto */}
      <Link
        href="/contacto"
        className="inline-block border border-[#1A1A17] rounded-full px-4 py-2 text-[15px] text-ink hover:bg-accent hover:border-accent hover:text-white transition-colors text-center font-medium"
      >
        Contacto
      </Link>
    </nav>
  );
}
