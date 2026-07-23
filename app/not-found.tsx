import Link from "next/link";
import HojaRoble from "./HojaRoble";

export default function NotFound() {
  return (
    <section className="w-full bg-white text-ink min-h-[70vh] flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 w-full">
        <p className="font-mono text-sm text-accent mb-6">
          &gt; error 404: ruta no encontrada_
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-8 max-w-3xl">
          Esta página se fue a{" "}
          <span className="marcador-animado marcador-lima">caminar</span>.
        </h1>
        <p className="text-muted text-lg max-w-xl mb-10">
          O nunca existió, o la moví, o tecleaste algo raro. Pasa hasta en las
          mejores webs hechas a mano.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/"
            className="border border-ink/20 rounded-full px-5 py-2 hover:bg-accent/20 hover:border-accent transition-colors"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/blog"
            className="text-muted hover:text-accent transition-colors"
          >
            o pásate por el blog
          </Link>
        </div>
        <div className="mt-16 opacity-40">
          <HojaRoble tamano={48} color="#7A9201" />
        </div>
      </div>
    </section>
  );
}