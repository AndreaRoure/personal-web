/**
 * Modelo de coste total de una automatización.
 * Puro (sin React) para poder testearlo y reutilizarlo.
 *
 * Todo se calcula en HORAS; los costes en euros (herramientas) se convierten
 * a horas con el coste/hora. Así lanzamiento, mantenimiento y ahorro se comparan
 * en la misma unidad.
 */

export type Inputs = {
  // Beneficio
  vecesMes: number; // ejecuciones de la tarea al mes
  minutosPorVez: number; // lo que tarda una persona cada vez
  aprovechamiento: number; // % del tiempo liberado que se usa en algo valioso (0-100)
  costeHora: number; // €/h (coste interno real, no salario bruto)
  erroresEvitadosMes: number; // h/mes que hoy se pierden corrigiendo errores manuales y que la automatización evita
  // Lanzamiento
  horasConstruccion: number; // diseño + construcción + integraciones
  horasPruebasDoc: number; // pruebas + documentación + formación
  // Recurrente
  horasMantenimientoMes: number;
  minutosRevisionPorVez: number; // revisión humana de cada resultado (no baja aunque construir sea barato)
  derivaMantenimiento: number; // % que crece el mantenimiento cada mes (fuentes que cambian, reglas frágiles)
  herramientasMes: number; // € licencias, APIs, alojamiento
  // Error
  tasaError: number; // % de ejecuciones con un error que hay que detectar y corregir
  horasPorError: number;
  // Salida
  horasSalida: number; // apagar, exportar datos, volver a manual o migrar
  // Horizonte
  meses: number;
};

export type Answers = {
  // Complejidad
  reglasCambian: boolean;
  muchasExcepciones: boolean;
  datosDesordenados: boolean;
  requiereInterpretacion: boolean;
  // Riesgo
  afectaPersonas: boolean; // derechos, oportunidades, acceso a recursos
  datosSensibles: boolean;
  errorReversible: boolean;
  errorDetectable: boolean; // se detecta antes de producir consecuencias
  // Mantenimiento / propiedad
  hayResponsable: boolean;
  hayAlertas: boolean;
  otraPersonaPuede: boolean;
  hayDocumentacion: boolean;
  // Dependencia
  datosExportables: boolean;
  hayAlternativa: boolean;
  cuentaPersonal: boolean;
};

export type MonthRow = {
  mes: number;
  ahorro: number;
  mantenimiento: number;
  revision: number;
  errores: number;
  herramientas: number;
  neto: number;
  acumulado: number;
};

export type Result = {
  inversionInicial: number;
  filas: MonthRow[];
  ahorroBrutoTotal: number;
  costeRecurrenteTotal: number;
  netoHoras: number; // al final del horizonte, sin salida
  netoHorasConSalida: number;
  netoEuros: number;
  mesRecuperacion: number | null; // primer mes con acumulado >= 0
  umbralMantenimiento: number; // h/mes de mantenimiento+revisión a partir de las cuales nunca compensa
  ahorroMensualBruto: number;
  presupuestoMaxConstruccion: number; // horas que podrías invertir en lanzarla y aun así quedar a 0 en el horizonte
  rendimiento: number; // horas ahorradas por cada hora invertida (lanzamiento + mantener + salida)
};

/** Referencia habitual de mercado: mantenimiento anual ≈ 15–25 % del coste de construcción. Usamos el 20 %. */
export function mantenimientoReferencia(i: Inputs): number {
  return Math.round((((i.horasConstruccion + i.horasPruebasDoc) * 0.2) / 12) * 10) / 10;
}

const clamp = (n: number, min = 0) => (Number.isFinite(n) ? Math.max(min, n) : 0);

export function calcular(i: Inputs): Result {
  const meses = Math.max(1, Math.round(i.meses));
  const ahorroMensualBruto =
    ((clamp(i.vecesMes) * clamp(i.minutosPorVez)) / 60) * (clamp(i.aprovechamiento) / 100) + clamp(i.erroresEvitadosMes);
  const herramientasH = i.costeHora > 0 ? clamp(i.herramientasMes) / i.costeHora : 0;
  const erroresH = clamp(i.vecesMes) * (clamp(i.tasaError) / 100) * clamp(i.horasPorError);
  const mantBase = clamp(i.horasMantenimientoMes);
  const revisionH = (clamp(i.vecesMes) * clamp(i.minutosRevisionPorVez)) / 60;
  const deriva = clamp(i.derivaMantenimiento) / 100;

  const inversionInicial = clamp(i.horasConstruccion) + clamp(i.horasPruebasDoc);
  let acumulado = -inversionInicial;
  let mesRecuperacion: number | null = null;
  let costeRecurrenteTotal = 0;
  const filas: MonthRow[] = [];

  for (let m = 1; m <= meses; m++) {
    const mantenimiento = mantBase * Math.pow(1 + deriva, m - 1);
    const coste = mantenimiento + revisionH + erroresH + herramientasH;
    const neto = ahorroMensualBruto - coste;
    acumulado += neto;
    costeRecurrenteTotal += coste;
    if (mesRecuperacion === null && acumulado >= 0) mesRecuperacion = m;
    filas.push({
      mes: m,
      ahorro: ahorroMensualBruto,
      mantenimiento,
      revision: revisionH,
      errores: erroresH,
      herramientas: herramientasH,
      neto,
      acumulado,
    });
  }

  const netoHoras = acumulado;
  const netoHorasConSalida = acumulado - clamp(i.horasSalida);
  const recurrenteNeto = acumulado + inversionInicial; // suma de netos mensuales
  const invertido = inversionInicial + costeRecurrenteTotal + clamp(i.horasSalida);

  return {
    inversionInicial,
    filas,
    ahorroBrutoTotal: ahorroMensualBruto * meses,
    costeRecurrenteTotal,
    netoHoras,
    netoHorasConSalida,
    netoEuros: netoHorasConSalida * clamp(i.costeHora),
    mesRecuperacion,
    umbralMantenimiento: Math.max(0, ahorroMensualBruto - erroresH - herramientasH),
    ahorroMensualBruto,
    presupuestoMaxConstruccion: recurrenteNeto - clamp(i.horasSalida),
    rendimiento: invertido > 0 ? (ahorroMensualBruto * meses) / invertido : 0,
  };
}

/** Escenario pesimista: el mantenimiento y los errores se duplican. */
export function pesimista(i: Inputs): Inputs {
  return {
    ...i,
    horasMantenimientoMes: i.horasMantenimientoMes * 2,
    minutosRevisionPorVez: i.minutosRevisionPorVez * 2,
    tasaError: i.tasaError * 2,
  };
}

export type VeredictoId = "sostenible" | "con-responsable" | "redisenar" | "no-todavia";

export type Veredicto = {
  id: VeredictoId;
  titulo: string;
  resumen: string;
  motivos: string[];
};

export type PreguntaAbierta = { dimension: string; pregunta: string };

/** Preguntas que la persona ha contestado "mal": lo que queda por resolver antes de lanzar. */
export function preguntasAbiertas(a: Answers): PreguntaAbierta[] {
  const out: PreguntaAbierta[] = [];
  const add = (cond: boolean, dimension: string, pregunta: string) => cond && out.push({ dimension, pregunta });
  add(!a.hayResponsable, "Responsables", "Asignar una persona responsable");
  add(!a.hayAlertas, "Responsables", "Configurar alertas de fallo");
  add(!a.otraPersonaPuede, "Responsables", "Formar a una segunda persona");
  add(!a.hayDocumentacion, "Responsables", "Documentar cómo funciona y cómo se recupera");
  add(a.cuentaPersonal, "Dependencia", "Pasarla a una cuenta corporativa");
  add(!a.datosExportables, "Dependencia", "Asegurar que los datos se pueden exportar");
  add(!a.hayAlternativa, "Dependencia", "Definir una alternativa");
  add(!a.errorDetectable, "Riesgo", "Añadir un control antes de que el error tenga efecto");
  add(!a.errorReversible, "Riesgo", "Definir cómo se deshace un error");
  add(a.datosSensibles, "Riesgo", "Evaluar el tratamiento de datos personales");
  add(a.afectaPersonas, "Riesgo", "Habilitar un canal de reclamación");
  add(a.reglasCambian, "Complejidad", "Asignar quién actualiza las reglas");
  add(a.datosDesordenados, "Complejidad", "Ordenar los datos");
  return out;
}

export function veredicto(r: Result, a: Answers): Veredicto {
  const motivos: string[] = [];

  // 1. No automatizar todavía: decisiones sobre personas que no se pueden deshacer o requieren criterio.
  if (a.afectaPersonas && (!a.errorReversible || a.requiereInterpretacion)) {
    if (!a.errorReversible) motivos.push("Afecta a personas y el error no se puede deshacer.");
    if (a.requiereInterpretacion) motivos.push("Requiere interpretación o empatía.");
    return {
      id: "no-todavia",
      titulo: "No automatizar todavía",
      resumen:
        "El riesgo para las personas pesa más que el ahorro. Revisa datos, responsables y controles antes de automatizar.",
      motivos,
    };
  }

  // 2. Rediseñar primero: proceso confuso o que no compensa.
  const complejidad = [a.reglasCambian, a.muchasExcepciones, a.datosDesordenados].filter(Boolean).length;
  if (complejidad >= 2 || r.netoHorasConSalida < 0) {
    if (a.reglasCambian) motivos.push("Las reglas cambian con frecuencia.");
    if (a.muchasExcepciones) motivos.push("El proceso tiene muchas excepciones.");
    if (a.datosDesordenados) motivos.push("Los datos no están ordenados.");
    if (r.netoHorasConSalida < 0)
      motivos.push(
        r.umbralMantenimiento <= 0
          ? "El coste mensual supera al ahorro."
          : "Balance negativo en el horizonte elegido."
      );
    return {
      id: "redisenar",
      titulo: "Rediseñar primero",
      resumen: "Simplifica el proceso antes de automatizarlo.",
      motivos,
    };
  }

  // 3. Viable con responsable: compensa, pero hay riesgo o huecos de propiedad.
  const necesitaSupervision =
    a.requiereInterpretacion || a.afectaPersonas || a.datosSensibles || !a.errorDetectable || a.muchasExcepciones;
  const huecos = !a.hayResponsable || !a.hayAlertas || !a.otraPersonaPuede || !a.hayDocumentacion || a.cuentaPersonal;
  if (necesitaSupervision || huecos) {
    if (a.afectaPersonas) motivos.push("Afecta a personas: la decisión final debe ser humana.");
    if (a.datosSensibles) motivos.push("Maneja datos personales o sensibles.");
    if (!a.errorDetectable) motivos.push("Los errores no se detectan a tiempo.");
    if (a.requiereInterpretacion) motivos.push("Requiere interpretación: úsala como apoyo.");
    if (huecos) motivos.push("Faltan responsables, alertas o documentación.");
    return {
      id: "con-responsable",
      titulo: "Viable con responsable",
      resumen: "Compensa si alguien la supervisa y tiene tiempo para revisar los resultados.",
      motivos,
    };
  }

  // 4. Sostenible.
  motivos.push("Proceso estable, errores baratos y detectables, responsable asignado.");
  return {
    id: "sostenible",
    titulo: "Automatización sostenible",
    resumen: "Automatízala. Revisa los indicadores cada pocos meses.",
    motivos,
  };
}

// ---------- Presets ----------

const respuestasBase: Answers = {
  reglasCambian: false,
  muchasExcepciones: false,
  datosDesordenados: false,
  requiereInterpretacion: false,
  afectaPersonas: false,
  datosSensibles: false,
  errorReversible: true,
  errorDetectable: true,
  hayResponsable: true,
  hayAlertas: true,
  otraPersonaPuede: true,
  hayDocumentacion: true,
  datosExportables: true,
  hayAlternativa: true,
  cuentaPersonal: false,
};

export type Preset = { id: string; nombre: string; descripcion: string; inputs: Inputs; answers: Answers };

export const PRESETS: Preset[] = [
  {
    id: "subvenciones",
    nombre: "Agente que rastrea subvenciones",
    descripcion: "Revisa cada mañana fuentes públicas, filtra las convocatorias relevantes y envía un resumen al equipo por Teams.",
    inputs: {
      vecesMes: 8,
      minutosPorVez: 60,
      aprovechamiento: 100,
      costeHora: 25,
      erroresEvitadosMes: 0,
      horasConstruccion: 6,
      horasPruebasDoc: 2,
      horasMantenimientoMes: 1,
      minutosRevisionPorVez: 7.5,
      derivaMantenimiento: 0,
      herramientasMes: 5,
      tasaError: 0,
      horasPorError: 0.5,
      horasSalida: 4,
      meses: 12,
    },
    answers: { ...respuestasBase, reglasCambian: true, errorDetectable: false, hayAlertas: false, otraPersonaPuede: false },
  },
];

/** Punto de partida para calcular una automatización propia. */
export const PROPIA: Preset = {
  id: "propia",
  nombre: "Tu automatización",
  descripcion: "Introduce los datos de tu caso y marca la situación actual.",
  inputs: {
    vecesMes: 10,
    minutosPorVez: 30,
    aprovechamiento: 100,
    costeHora: 25,
    erroresEvitadosMes: 0,
    horasConstruccion: 8,
    horasPruebasDoc: 2,
    horasMantenimientoMes: 1,
    minutosRevisionPorVez: 0,
    derivaMantenimiento: 0,
    herramientasMes: 0,
    tasaError: 0,
    horasPorError: 0.5,
    horasSalida: 2,
    meses: 12,
  },
  answers: respuestasBase,
};
