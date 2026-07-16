import type { Metadata } from "next";
import { Mohave, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import HojaRoble from "./HojaRoble";

const mohave = Mohave({
  subsets: ["latin"],
  variable: "--font-mohave",
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Andrea Robles",
  description: "Tecnología humanocéntrica, soberanía digital, transformación social",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${mohave.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-bg text-ink font-body min-h-screen flex flex-col">
        <header className="w-full bg-dark text-crema">
          <div className="max-w-5xl mx-auto px-6 pt-9 pb-2 flex justify-between items-center">
            <a href="/" className="font-display text-xl font-semibold">Andrea Robles</a>
            <nav className="flex gap-2 text-sm">
              <a href="/" className="border border-crema/20 rounded-full px-4 py-1.5 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors">Sobre mí</a>
              <a href="/blog" className="border border-crema/20 rounded-full px-4 py-1.5 hover:bg-sky/20 hover:border-sky transition-colors">Blog</a>
              <a href="/contacto" className="border border-crema/20 rounded-full px-4 py-1.5 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors">Contacto</a>
            </nav>
          </div>
        </header>
        <main className="w-full flex-1">{children}</main>
        <footer className="w-full bg-dark text-crema-muted border-t border-crema/10">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap justify-between items-baseline gap-4 text-sm">
          <p className="flex items-center gap-2">
              <HojaRoble tamano={18} color="#A8C63C" />
              <span>
                <span className="font-display font-semibold text-crema">Andrea Robles</span>
                {" "}· Este espacio es donde voy dejando por escrito lo que aprendo en el camino.
              </span>
            </p>
            <div className="flex gap-4">
              <a href="hhttps://www.linkedin.com/in/andrearoblescastro/" target="_blank" rel="noopener noreferrer" className="hover:text-sky transition-colors">LinkedIn</a>
              <a href="https://github.com/AndreaRoure" target="_blank" rel="noopener noreferrer" className="hover:text-accent-dark transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}