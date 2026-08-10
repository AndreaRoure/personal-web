'use client';

import Link from 'next/link';

export default function SideNav() {
  return (
    <nav className="fixed left-0 top-0 h-screen w-[180px] bg-white text-ink flex flex-col justify-between px-6 py-10 z-50 border-r border-[#1A1A17] max-md:hidden">
      {/* Arriba */}
      <div className="space-y-6">
        {/* Nombre/Logo */}
        <Link
          href="/"
          className="block font-display text-[19px] font-semibold hover:text-accent transition-colors"
        >
          Andrea Robles
        </Link>

        {/* Enlaces principales */}
        <div className="flex flex-col items-start space-y-3 text-[15px]">
          <Link
            href="/#sobre-mi"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Sobre mí
          </Link>
          <Link
            href="/#archivo"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Archivo
          </Link>
          <Link
            href="/#contacto"
            className="inline-block border-b-2 border-transparent hover:border-[#1A1A17] pb-0.5 transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>

      <div />
    </nav>
  );
}
