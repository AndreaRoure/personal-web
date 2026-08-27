/** Meses transcurridos desde un mes concreto, en texto.
 *  Se usa para que el puesto actual no haya que tocarlo a mano nunca. */
export function duracionDesde(anio: number, mes: number, ahora = new Date()) {
  const meses =
    (ahora.getFullYear() - anio) * 12 + (ahora.getMonth() - (mes - 1));

  if (meses < 1) return "recién empezado";
  if (meses < 12) return `${meses} ${meses === 1 ? "mes" : "meses"}`;

  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const textoAnios = `${anios} ${anios === 1 ? "año" : "años"}`;
  if (resto === 0) return textoAnios;
  return `${textoAnios} y ${resto} ${resto === 1 ? "mes" : "meses"}`;
}
