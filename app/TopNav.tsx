'use client';
import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full bg-white text-ink sticky top-0 z-50 border-b-2 border-[#1A1A17]">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-[21px] font-bold hover:text-accent transition-colors">
          Andrea Robles
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-[16px]">
          <Link href="/#sobre-mi" className="font-bold hover:opacity-60 transition-opacity">
            Sobre mí
          </Link>
          <Link href="/#archivo" className="font-bold hover:opacity-60 transition-opacity">
            Archivo
          </Link>
          <Link href="/#contacto" className="font-bold hover:opacity-60 transition-opacity">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
