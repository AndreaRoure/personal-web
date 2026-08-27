/** Formas ya traducidas que necesita duracionDesde. Se generan con
 *  useTranslations("duracion") en el componente que llama, asi este fichero
 *  se queda como calculo puro y no depende de como se resuelven los mensajes. */
export interface TextosDuracion {
  recienEmpezado: string;
  unMes: string;
  nMeses: (n: number) => string;
  unAnio: string;
  nAnios: (n: number) => string;
  anioYMeses: (anios: string, meses: string) => string;
}

/** Meses transcurridos desde un mes concreto, en texto.
 *  Se usa para que el puesto actual no haya que tocarlo a mano nunca. */
export function duracionDesde(
  anio: number,
  mes: number,
  t: TextosDuracion,
  ahora = new Date()
) {
  const meses = (ahora.getFullYear() - anio) * 12 + (ahora.getMonth() - (mes - 1));

  if (meses < 1) return t.recienEmpezado;
  if (meses < 12) return meses === 1 ? t.unMes : t.nMeses(meses);

  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const textoAnios = anios === 1 ? t.unAnio : t.nAnios(anios);
  if (resto === 0) return textoAnios;
  return t.anioYMeses(textoAnios, resto === 1 ? t.unMes : t.nMeses(resto));
}
