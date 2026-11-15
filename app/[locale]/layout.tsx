import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mohave, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { routing } from "../../i18n/routing";
import { alternates, OG_LOCALE, SITE } from "../seo";
import MotionProvider from "../MotionProvider";
import { Link } from "../../i18n/navigation";
import "../globals.css";
import CookieConsent from "../CookieConsent";
import CookiePrefsBoton from "../CookiePrefsBoton";
import HojaRoble from "../HojaRoble";
import TopNav from "../TopNav";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "og" });

  return {
    metadataBase: new URL(SITE),
    title: {
      default: `Andrea Robles — ${t("siteTitular")}`,
      template: "%s · Andrea Robles",
    },
    description: t("siteTitular"),
    // Solo la home: cada pagina declara los suyos (antes /privacidad
    // heredaba los de la home y su hreflang apuntaba a la portada).
    alternates: alternates(locale, { es: "", en: "" }),
    openGraph: {
      title: "Andrea Robles",
      description: t("siteTitular"),
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: "Andrea Robles",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Habilita el renderizado estatico de las paginas de este locale.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <html lang={locale} className={`${mohave.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-bg text-ink font-body min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <MotionProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:border-2 focus:border-ink focus:rounded-md"
          >
            {t("saltarContenido")}
          </a>
          <TopNav />
          <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
          <footer className="bg-white text-ink border-t border-linea">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-4 text-sm">
              <p className="flex items-center gap-2">
                <HojaRoble tamano={18} color="#7A9201" />
                <span>{t("copyright")}</span>
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/andrearoblescastro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-9 h-9 rounded-md border border-ink/20 hover:bg-sky/20 hover:border-sky transition-colors">
                  <FaLinkedinIn size={16} />
                </a>
                <a href="https://github.com/AndreaRoure" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-9 h-9 rounded-md border border-ink/20 hover:bg-accent/20 hover:border-accent transition-colors">
                  <FaGithub size={16} />
                </a>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 pb-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <Link href="/privacidad" className="underline hover:text-accent-texto transition-colors">
                {t("privacidad")}
              </Link>
              <CookiePrefsBoton />
            </div>
          </footer>
          <CookieConsent />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
