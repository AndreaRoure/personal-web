import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mohave, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { routing } from "../../i18n/routing";
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
    metadataBase: new URL("https://www.andrearobles.net"),
    title: {
      default: `Andrea Robles — ${t("siteTitular")}`,
      template: "%s · Andrea Robles",
    },
    description: t("siteTitular"),
    alternates: {
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      title: "Andrea Robles",
      description: t("siteTitular"),
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
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
          <TopNav />
          <main className="flex-1">{children}</main>
          <footer className="bg-white text-ink border-t border-[#1A1A17]">
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
              <Link href="/privacidad" className="underline hover:text-accent transition-colors">
                {t("privacidad")}
              </Link>
              <CookiePrefsBoton />
            </div>
          </footer>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
