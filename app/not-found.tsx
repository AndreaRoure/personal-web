import Link from "next/link";
import HojaRoble from "./HojaRoble";

export default function NotFound() {
  return (
    <section className="bg-dark text-crema min-h-[70vh] flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 w-full">
        <p className="font-mono text-sm text-accent-dark mb-6">
          &gt; error 404: ruta no encontrada_
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-8 max-w-3xl">
          Esta página se fue a{" "}
          <span className="marcador-animado marcador-lima">caminar</span>.
        </h1>
        <p className="text-crema-muted text-lg max-w-xl mb-10">
          O nunca existió, o la moví, o tecleaste algo raro. Pasa hasta en las
          mejores webs hechas a mano.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/"
            className="border border-crema/30 rounded-full px-5 py-2 hover:bg-accent-dark/20 hover:border-accent-dark transition-colors"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/blog"
            className="text-crema-muted hover:text-accent-dark transition-colors"
          >
            o pásate por el blog
          </Link>
        </div>
        <div className="mt-16 opacity-40">
          <HojaRoble tamano={48} color="#A8C63C" />
        </div>
      </div>
    </section>
  );
}