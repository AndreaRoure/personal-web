'use client';
import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full bg-white text-ink sticky top-0 z-50 border-b-2 border-[#1A1A17]">
      <div className="px-4 min-[360px]:px-6 md:px-10 py-4 flex items-center justify-between gap-3">
        <Link href="/" className="font-display text-[17px] min-[360px]:text-[18px] md:text-[21px] font-bold whitespace-nowrap hover:text-accent transition-colors">
          Andrea Robles
        </Link>
        <nav className="flex items-center gap-2.5 min-[360px]:gap-4 md:gap-8 text-[13px] min-[360px]:text-[14px] md:text-[16px]">
          <Link href="/#sobre-mi" className="font-bold whitespace-nowrap hover:opacity-60 transition-opacity">
            Sobre mí
          </Link>
          <Link href="/#archivo" className="font-bold whitespace-nowrap hover:opacity-60 transition-opacity">
            Archivo
          </Link>
          <Link href="/#contacto" className="font-bold whitespace-nowrap hover:opacity-60 transition-opacity">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
