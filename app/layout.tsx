import type { Metadata } from "next";
import { Mohave, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import HojaRoble from "./HojaRoble";
import MenuMovil from "./MenuMovil";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

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
  metadataBase: new URL("https://personal-web-self-phi.vercel.app"),
  title: {
    default: "Andrea Robles — Tecnología humanocéntrica",
    template: "%s · Andrea Robles",
  },
  description:
    "Trabajo en la intersección entre la tecnología y las personas: soberanía digital, transformación de organizaciones sociales y formación.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Andrea Robles — Tecnología humanocéntrica",
    description:
      "Trabajo en la intersección entre la tecnología y las personas: soberanía digital, transformación de organizaciones sociales y formación.",
    type: "website",
    locale: "es_ES",
    siteName: "Andrea Robles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Robles — Tecnología humanocéntrica",
    description:
      "Tecnología al servicio de las personas: soberanía digital, transformación social y formación.",
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
         <div className="max-w-5xl mx-auto px-6 pt-6 md:pt-9 pb-2 flex justify-between items-center">
            <a href="/" className="font-display text-xl font-semibold whitespace-nowrap">Andrea Robles</a>
            <nav className="hidden md:flex gap-2 text-sm">
              <a href="/" className="whitespace-nowrap border border-crema/20 rounded-full px-4 py-1.5 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors">Sobre mí</a>
              <a href="/blog" className="whitespace-nowrap border border-crema/20 rounded-full px-4 py-1.5 hover:bg-sky/20 hover:border-sky transition-colors">Blog</a>
              <a href="/contacto" className="whitespace-nowrap border border-crema/20 rounded-full px-4 py-1.5 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors">Contacto</a>
            </nav>
            <MenuMovil />
          </div>
        </header>
        <main className="w-full flex-1">{children}</main>
        <footer className="w-full bg-dark text-crema-muted border-t border-crema/10">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-4 text-sm">
            <p className="flex items-center gap-2">
              <HojaRoble tamano={18} color="#A8C63C" />
              <span>
                <span className="font-display font-semibold text-crema">Andrea Robles</span>
                {" "}· Este espacio es donde voy dejando por escrito lo que aprendo en el camino.
              </span>
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/TU-USUARIO" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-9 h-9 rounded-md border border-crema/20 hover:bg-sky/20 hover:border-sky transition-colors"><FaLinkedinIn size={16} /></a>
              <a href="https://github.com/AndreaRoure" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-9 h-9 rounded-md border border-crema/20 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors"><FaGithub size={16} /></a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}