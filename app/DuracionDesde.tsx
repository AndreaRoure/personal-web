"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { duracionDesde, type TextosDuracion } from "./duracion";

/** El servidor pinta el valor del momento del build, y el cliente lo recalcula
 *  al montar. Asi el texto es correcto en el HTML inicial y ademas no se queda
 *  obsoleto si pasa un mes sin volver a desplegar. */
export default function DuracionDesde({ anio, mes }: { anio: number; mes: number }) {
  const t = useTranslations("duracion");
  const textos: TextosDuracion = {
    recienEmpezado: t("recienEmpezado"),
    unMes: t("unMes"),
    nMeses: (n) => t("nMeses", { n }),
    unAnio: t("unAnio"),
    nAnios: (n) => t("nAnios", { n }),
    anioYMeses: (anios, meses) => t("anioYMeses", { anios, meses }),
  };

  const [texto, setTexto] = useState(() => duracionDesde(anio, mes, textos));

  useEffect(() => {
    // Excepcion deliberada a la regla: no es "sincronizar estado externo con
    // React", es recalcular con la fecha de HOY. El valor inicial (arriba)
    // refleja el momento del build/render en servidor, que puede quedar
    // desfasado si la pagina estatica no se vuelve a generar en meses; este
    // efecto lo corrige en el primer render del cliente, que siempre ocurre
    // en el momento real de la visita.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTexto(duracionDesde(anio, mes, textos));
    // Los textos traducidos son estables durante la vida del componente
    // (el idioma no cambia sin recargar la pagina); solo hace falta
    // recalcular si cambia la fecha de inicio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anio, mes]);

  return <span suppressHydrationWarning>{texto}</span>;
}
