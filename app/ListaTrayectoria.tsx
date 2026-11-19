"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Plus } from "lucide-react";

export interface Puesto {
  puesto: string;
  org: string;
  periodo: string;
  descripcion: string;
}

/** Puestos anteriores: una linea que se dibuja con el scroll los une, cada
 *  punto se enciende al llegar y el detalle se abre al pulsar. */
export default function ListaTrayectoria({ puestos }: { puestos: Puesto[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reducir = useReducedMotion();
  const [abierto, setAbierto] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative pl-7">
      {/* Carril y linea que se dibuja */}
      <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-ink/15" />
      <motion.span
        aria-hidden="true"
        className="absolute left-[5px] top-2 bottom-2 w-px bg-accent origin-top"
        style={{ scaleY: reducir ? 1 : progreso }}
      />

      {puestos.map((r, i) => {
        const estaAbierto = abierto === i;
        const idPanel = `puesto-${i}`;
        return (
          <li key={r.puesto + r.periodo} className="py-4 first:pt-0">
            <div className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute -left-7 top-[0.45rem] size-[11px] rounded-full border-2 border-accent bg-[#F2F5E4]"
              initial={reducir ? false : { backgroundColor: "#F2F5E4", scale: 0.6 }}
              whileInView={{ backgroundColor: "#7A9201", scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -45% 0px" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <button
              type="button"
              aria-expanded={estaAbierto}
              aria-controls={idPanel}
              onClick={() => setAbierto(estaAbierto ? null : i)}
              className="group w-full text-left flex items-start justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span>
                <span className="block font-display text-lg sm:text-xl font-bold leading-tight transition-colors group-hover:text-accent">
                  {r.puesto}
                </span>
                <span className="block font-mono text-xs sm:text-sm text-muted mt-1.5">
                  {r.org} · {r.periodo}
                </span>
              </span>
              <Plus
                size={18}
                aria-hidden="true"
                className={`mt-1 flex-shrink-0 text-ink/50 transition-transform duration-300 group-hover:text-accent ${estaAbierto ? "rotate-45" : ""}`}
              />
            </button>
            </div>
            <AnimatePresence initial={false}>
              {estaAbierto && (
                <motion.div
                  id={idPanel}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducir ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-[15px] sm:text-base leading-relaxed text-ink/80 max-w-prose">
                    {r.descripcion}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
