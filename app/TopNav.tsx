'use client';
import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full bg-white text-ink sticky top-0 z-50 border-b border-[#1A1A17]">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold hover:text-accent transition-colors">
          Andrea Robles
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-[15px]">
          <Link href="/#sobre-mi" className="border-b-2 border-transparent hover:border-ink pb-0.5 transition-colors">
            Sobre mí
          </Link>
          <Link href="/#archivo" className="border-b-2 border-transparent hover:border-ink pb-0.5 transition-colors">
            Archivo
          </Link>
          <Link href="/#contacto" className="border-b-2 border-transparent hover:border-ink pb-0.5 transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
