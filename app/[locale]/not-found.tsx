import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import HojaRoble from "../HojaRoble";
import HeroSection from "../HeroSection";

/** Enlaces con la misma caja de 2px y relleno lima que las celdas del nav,
 *  para que el 404 no parezca de otra web. */
const CAJA =
  "inline-flex items-center border border-ink/25 px-5 py-3 font-medium " +
  "transition-colors duration-150 hover:border-accent hover:text-accent " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Server Component: getTranslations (no useTranslations) porque este
// fichero se renderiza sin "use client", y el hook de cliente no resuelve
// nada sin el NextIntlClientProvider por encima.
export default async function NotFound() {
  const [t, tHero] = await Promise.all([
    getTranslations("notFound"),
    getTranslations("hero"),
  ]);

  return (
    <>
    <section className="relative w-full bg-white text-ink overflow-hidden border-b border-ink/15">
      <div className="px-6 md:px-8 py-16 md:py-28 max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          {t("eyebrow")}
          <span className="cursor-terminal" aria-hidden="true" />
        </p>

        <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-2">
          {t("titularPre")}{" "}
          <span className="marcador-animado marcador-lima">{t("titularFuerte")}</span>.
        </h1>

        {/* Easter egg: el juego del gato */}
        <HeroSection
          compacto
          textos={{
            titularPre: tHero("titularPre"),
            titularFuerte: tHero("titularFuerte"),
            titularPost: tHero("titularPost"),
            scroll: tHero("scroll"),
            pistaJuego: tHero("pistaJuego"),
            marcador: tHero("marcador"),
            ganasteTitulo: tHero("ganasteTitulo"),
            ganasteSubtitulo: tHero("ganasteSubtitulo"),
            perdisteTitulo: tHero("perdisteTitulo"),
            perdisteSubtitulo: tHero("perdisteSubtitulo"),
            subtitulo: "",
          }}
        />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/" className={CAJA}>
            {t("volverInicio")}
          </Link>
          <Link href="/#archivo" className={CAJA}>
            {t("verArchivo")}
          </Link>
          <Link href="/#contacto" className={CAJA}>
            {t("escribirme")}
          </Link>
        </div>
      </div>

      {/* La hoja asomando por la esquina, como en las portadas */}
      <div
        aria-hidden="true"
        className="absolute right-[-3%] bottom-[-16%] w-[38%] max-w-[380px] hidden sm:block text-accent"
        style={{ opacity: 0.1 }}
      >
        <HojaRoble tamano="100%" color="currentColor" />
      </div>
    </section>
    </>
  );
}
