import type { Metadata } from "next";
import { Mohave, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import HojaRoble from "./HojaRoble";
import MenuMovil from "./MenuMovil";
import SideNav from "./SideNav";
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
      <body className="bg-bg text-ink font-body min-h-screen flex flex-col overflow-x-hidden">
        <SideNav />

        <header className="w-full bg-white text-ink relative z-20 md:hidden border-b border-[#1A1A17]">
         <div className="max-w-5xl mx-auto px-6 pt-6 pb-2 flex justify-between items-center">
            <a href="/" className="font-display text-xl font-semibold whitespace-nowrap">Andrea Robles</a>
            <MenuMovil />
          </div>
        </header>
        <main className="w-full flex-1 relative z-10 md:ml-[180px]">{children}</main>
        <footer className="w-full bg-white text-ink border-t border-[#1A1A17] relative z-10 md:ml-[180px]">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-4 text-sm">
            <p className="flex items-center gap-2">
              <HojaRoble tamano={18} color="#7A9201" />
              <span>
                © 2026 Andrea Robles. Todos los derechos reservados.
              </span>
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/andrearoblescastro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-9 h-9 rounded-md border border-ink/20 hover:bg-sky/20 hover:border-sky transition-colors"><FaLinkedinIn size={16} /></a>
              <a href="https://github.com/AndreaRoure" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-9 h-9 rounded-md border border-ink/20 hover:bg-accent/20 hover:border-accent transition-colors"><FaGithub size={16} /></a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}