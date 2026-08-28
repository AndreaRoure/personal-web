import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { routing } from "../../../i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacidad" });
  return { title: t("titulo") };
}

export default async function Privacidad({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacidad");

  return (
    <section className="w-full bg-white text-ink">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8 hover:opacity-70 transition-opacity"
        >
          ← {t("volver")}
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-bold leading-none mb-3">
          {t("titulo")}
        </h1>
        <p className="font-mono text-xs text-muted mb-12">{t("actualizado")}</p>

        <div className="space-y-10 leading-relaxed">
          <p className="text-lg text-ink/80">{t("intro")}</p>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">{t("cookiesTitulo")}</h2>
            <p className="text-ink/80">{t("cookiesTexto")}</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">{t("datosTitulo")}</h2>
            <p className="text-ink/80">{t("datosTexto")}</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">{t("correoTitulo")}</h2>
            <p className="text-ink/80">
              {t.rich("correoTexto", {
                email: (chunks) => (
                  <a href="mailto:hola@andrearobles.net" className="text-accent underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold mb-3">{t("derechosTitulo")}</h2>
            <p className="text-ink/80">
              {t.rich("derechosTexto", {
                email: (chunks) => (
                  <a href="mailto:hola@andrearobles.net" className="text-accent underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
