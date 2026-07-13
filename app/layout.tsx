import type { Metadata } from "next";
import { Mohave, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Andrea Robles",
  description: "Tecnología humanocéntrica, soberanía digital, transformación social",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${mohave.variable} ${plexSans.variable}`}>
      <body className="bg-bg text-ink font-body min-h-screen">
        <header className="max-w-2xl mx-auto px-6 pt-10 flex justify-between items-baseline">
          <a href="/" className="font-display text-xl font-semibold">Andrea Robles</a>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="text-muted hover:text-accent transition-colors">Sobre mí</a>
            <a href="/blog" className="text-muted hover:text-accent transition-colors">Blog</a>
            <a href="/contacto" className="text-muted hover:text-accent transition-colors">Contacto</a>
          </nav>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-14">
          {children}
        </main>
        <footer className="max-w-2xl mx-auto px-6 py-6 text-sm text-muted">
          © {new Date().getFullYear()} Andrea Robles
        </footer>
      </body>
    </html>
  );
}