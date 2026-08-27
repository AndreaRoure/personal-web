import Link from "next/link";
import HojaRoble from "./HojaRoble";

/** Enlaces con la misma caja de 2px y relleno lima que las celdas del nav,
 *  para que el 404 no parezca de otra web. */
const CAJA =
  "inline-flex items-center border-2 border-[#1A1A17] px-5 py-3 font-bold " +
  "transition-colors duration-150 hover:bg-lima " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function NotFound() {
  return (
    <section className="relative w-full bg-white text-ink overflow-hidden border-b-2 border-[#1A1A17]">
      <div className="px-6 md:px-8 py-16 md:py-28 max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Error 404 · ruta no encontrada
          <span className="cursor-terminal" aria-hidden="true" />
        </p>

        <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-8">
          Esta página se fue a{" "}
          <span className="marcador-animado marcador-lima">caminar</span>.
        </h1>

        <p className="text-lg text-muted max-w-xl mb-10 leading-relaxed">
          O nunca existió, o la moví, o tecleaste algo raro. Pasa hasta en las
          mejores webs hechas a mano.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className={CAJA}>
            ← Volver al inicio
          </Link>
          <Link href="/#archivo" className={CAJA}>
            Ver el archivo
          </Link>
          <Link href="/#contacto" className={CAJA}>
            Escribirme
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
  );
}
