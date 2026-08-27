"use client";

import { useEffect, useState } from "react";
import { duracionDesde } from "./duracion";

/** El servidor pinta el valor del momento del build, y el cliente lo recalcula
 *  al montar. Asi el texto es correcto en el HTML inicial y ademas no se queda
 *  obsoleto si pasa un mes sin volver a desplegar. */
export default function DuracionDesde({ anio, mes }: { anio: number; mes: number }) {
  const [texto, setTexto] = useState(() => duracionDesde(anio, mes));

  useEffect(() => {
    setTexto(duracionDesde(anio, mes));
  }, [anio, mes]);

  return <span suppressHydrationWarning>{texto}</span>;
}
