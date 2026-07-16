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
    <html lang="es" className={`${mohave.variable} ${plexSans.variable}`}>
      <body className="bg-bg text-ink font-body min-h-screen">
        <header className="max-w-2xl mx-auto px-6 pt-10 flex justify-between items-baseline">
          <a href="/" className="font-display text-xl font-semibold">Andrea Robles</a>
          <nav className="flex gap-2 text-sm">
            <a href="/" className="border border-ink/30 rounded-full px-4 py-1.5 hover:bg-accent/20 hover:border-ink transition-colors">Sobre mí</a>
            <a href="/blog" className="border border-ink/30 rounded-full px-4 py-1.5 hover:bg-sky/30 hover:border-ink transition-colors">Blog</a>
            <a href="/contacto" className="border border-ink/30 rounded-full px-4 py-1.5 hover:bg-accent/20 hover:border-ink transition-colors">Contacto</a>
          </nav>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-14">
          {children}
        </main>
       <footer className="max-w-2xl mx-auto px-6 py-10 mt-16 border-t border-ink/10">
          <div className="flex flex-wrap justify-between items-baseline gap-4 text-sm">
            <p className="font-display font-semibold">Andrea Robles</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/andrearoblescastro/" target="_blank" rel="noopener noreferrer" className="text-muted hover:bg-sky/40 px-1 rounded-md transition-colors">LinkedIn</a>
              <a href="https://github.com/AndreaRoure" target="_blank" rel="noopener noreferrer" className="text-muted hover:bg-accent/20 px-1 rounded-md transition-colors">GitHub</a>
            </div>
          </div>
          <p className="text-xs text-muted mt-4">
            © {new Date().getFullYear()} · Hecha a mano con Next.js, código abierto y criterio propio.
          </p>
        </footer>
      </body>
    </html>
  );
}