"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  calcular,
  mantenimientoReferencia,
  pesimista,
  preguntasAbiertas,
  veredicto,
  PRESETS,
  PROPIA,
  type Answers,
  type Inputs,
  type Result,
  type VeredictoId,
} from "./automatizacion-coste";
import { useLocale } from "next-intl";
import { EN } from "./calculadora-textos";

/** Traduce los textos de la calculadora segun el idioma de la pagina. */
function useT() {
  const locale = useLocale();
  return (s: string) => (locale === "en" ? EN[s] ?? s : s);
}

/* ------------------------------------------------------------------ */
/* Tokens: tirados del tema (globals.css)                              */
/* ------------------------------------------------------------------ */
const tokens = {
  "--calc-bg": "var(--color-bg)",
  "--calc-line": "#2B33001F",
  "--calc-text": "var(--color-ink)",
  "--calc-muted": "var(--color-muted)",
  "--calc-accent": "var(--color-accent)",
  // --color-sky (#71C1D0) no llega a 3:1 sobre blanco; esta variante sí.
  "--calc-sky": "#2F8A9C",
} as CSSProperties;

const nf = (n: number, d = 1) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: d }).format(n);
const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ------------------------------------------------------------------ */
/* Estado compartible por URL (#calc=...)                              */
/* ------------------------------------------------------------------ */
type State = { i: Inputs; a: Answers };

function encode(s: State) {
  const json = JSON.stringify(s);
  return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decode(str: string): State | null {
  try {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const parsed = JSON.parse(decodeURIComponent(escape(atob(b64))));
    if (parsed?.i && parsed?.a) return { i: { ...PRESETS[0].inputs, ...parsed.i }, a: { ...PRESETS[0].answers, ...parsed.a } };
  } catch {}
  return null;
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */
export default function CalculadoraAutomatizacion() {
  const tr = useT();
  const [state, setState] = useState<State>({ i: PRESETS[0].inputs, a: PRESETS[0].answers });
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const [copied, setCopied] = useState(false);

  // Leer escenario de la URL al montar
  useEffect(() => {
    const aplicar = () => {
      const m = window.location.hash.match(/calc=([^&]+)/);
      const s = m && decode(m[1]);
      if (s) {
        setState(s);
        setPresetId(PROPIA.id);
      }
    };
    // Tras la hidratación (el servidor no conoce el hash) y si cambia el enlace.
    const raf = requestAnimationFrame(aplicar);
    window.addEventListener("hashchange", aplicar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", aplicar);
    };
  }, []);

  const setI = <K extends keyof Inputs>(k: K, v: Inputs[K]) => {
    setPresetId(PROPIA.id);
    setState((s) => ({ ...s, i: { ...s.i, [k]: v } }));
  };
  const setA = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setPresetId(PROPIA.id);
    setState((s) => ({ ...s, a: { ...s.a, [k]: v } }));
  };

  const r = useMemo(() => calcular(state.i), [state.i]);
  const rp = useMemo(() => calcular(pesimista(state.i)), [state.i]);
  const v = useMemo(() => veredicto(r, state.a), [r, state.a]);
  const abiertas = useMemo(() => preguntasAbiertas(state.a), [state.a]);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#calc=${encode(state)}`;
    window.history.replaceState(null, "", url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const { i, a } = state;

  return (
    <section
      style={tokens}
      className="@container not-prose my-12 w-[min(59rem,calc(100vw-3rem))] max-w-none rounded-2xl border border-[var(--calc-line)] bg-[var(--calc-bg)] p-5 text-[var(--calc-text)] @lg:p-10"
      aria-labelledby="calc-title"
    >
      {/* Cabecera */}
      <div className="flex flex-col gap-4 @lg:flex-row @lg:items-end @lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--calc-sky)]">{tr("Calculadora")}</p>
          <h3 id="calc-title" className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight @lg:text-3xl">
            {tr("Calcula el coste de tu automatización")}
          </h3>
        </div>
        <button
          onClick={share}
          className="self-start rounded-full border border-[var(--calc-line)] px-4 py-2 text-sm transition hover:border-[var(--calc-accent)] hover:text-[var(--calc-accent)] @lg:self-auto"
        >
          {copied ? tr("Enlace copiado") : tr("Copiar enlace")}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={tr("Ejemplos")}>
        <span className="mr-1 self-center text-sm text-[var(--calc-muted)]">{tr("Ejemplos:")}</span>
        {[...PRESETS, PROPIA].map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setState({ i: p.inputs, a: p.answers });
              setPresetId(p.id);
            }}
            aria-pressed={presetId === p.id}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              presetId === p.id
                ? "border border-[var(--calc-accent)] text-[var(--calc-accent)]"
                : p.id === PROPIA.id
                  ? "border border-dashed border-[var(--calc-line)] text-[var(--calc-text)] hover:border-[var(--calc-accent)]"
                  : "border border-[var(--calc-line)] text-[var(--calc-muted)] hover:text-[var(--calc-text)]"
            }`}
          >
            {p.id === PROPIA.id ? `+ ${tr(p.nombre)}` : tr(p.nombre)}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-[2.5rem] max-w-2xl text-sm leading-snug text-[var(--calc-muted)]" aria-live="polite">
        {tr([...PRESETS, PROPIA].find((p) => p.id === presetId)?.descripcion ?? "")}
      </p>

      {/* Paso 1: la cuenta */}
      <Step n={1} title="Tiempo y coste" sub="Introduce los datos de tu caso. Los euros se convierten a horas con tu coste por hora.">
        <div className="grid gap-8 @4xl:grid-cols-[1fr_minmax(0,360px)]">
          <div className="grid gap-6 @lg:grid-cols-2">
            <Group title="Beneficio">
              <Field label="Veces al mes" hint="Las que la tarea se hace hoy a mano" value={i.vecesMes} onChange={(n) => setI("vecesMes", n)} min={0} max={200} step={1} />
              <Field
                label="Minutos cada vez"
                hint="Lo que tarda la persona que la hace hoy. Mejor medido que estimado"
                value={i.minutosPorVez}
                onChange={(n) => setI("minutosPorVez", n)}
                min={0}
                max={240}
                step={5}
              />
              <Field
                label="Tiempo ahorrado aprovechado"
                hint="Parte del tiempo ahorrado que se dedicará a otra tarea"
                value={i.aprovechamiento}
                onChange={(n) => setI("aprovechamiento", n)}
                min={0}
                max={100}
                step={5}
                unit="%"
              />
              <Field label="Coste por hora" value={i.costeHora} onChange={(n) => setI("costeHora", n)} min={5} max={120} step={1} unit="€" />
              <Field
                label="Errores manuales que evita"
                hint="Tiempo que hoy se dedica a corregir errores manuales"
                value={i.erroresEvitadosMes}
                onChange={(n) => setI("erroresEvitadosMes", n)}
                min={0}
                max={20}
                step={0.5}
                unit="h/mes"
              />
            </Group>

            <Group title="Lanzamiento">
              <Field label="Diseño, construcción e integraciones" value={i.horasConstruccion} onChange={(n) => setI("horasConstruccion", n)} min={0} max={200} step={1} unit="h" />
              <Field label="Pruebas, documentación y formación" value={i.horasPruebasDoc} onChange={(n) => setI("horasPruebasDoc", n)} min={0} max={100} step={1} unit="h" />
            </Group>

            <Group title="Mantenimiento">
              <Field
                label="Mantenimiento"
                hint={
                  <>
                    {tr("Referencia: 20 % anual de la construcción.")}{" "}
                    <button
                      type="button"
                      onClick={() => setI("horasMantenimientoMes", mantenimientoReferencia(i))}
                      className="text-[var(--calc-sky)] underline decoration-[var(--calc-line)] underline-offset-2 hover:decoration-[var(--calc-sky)]"
                    >
                      {tr("Usar")} {nf(mantenimientoReferencia(i))} {tr("h/mes")}
                    </button>
                  </>
                }
                value={i.horasMantenimientoMes}
                onChange={(n) => setI("horasMantenimientoMes", n)}
                min={0}
                max={40}
                step={0.5}
                unit="h/mes"
              />
              <Field
                label="Revisión de cada resultado"
                hint="Tiempo para comprobar cada resultado"
                value={i.minutosRevisionPorVez}
                onChange={(n) => setI("minutosRevisionPorVez", n)}
                min={0}
                max={60}
                step={0.5}
                unit="min"
              />
              <Field
                label="Deriva del mantenimiento"
                hint="Aumento mensual por cambios en fuentes o reglas"
                value={i.derivaMantenimiento}
                onChange={(n) => setI("derivaMantenimiento", n)}
                min={0}
                max={20}
                step={1}
                unit="%/mes"
              />
              <Field label="Herramientas, APIs, alojamiento" value={i.herramientasMes} onChange={(n) => setI("herramientasMes", n)} min={0} max={500} step={5} unit="€/mes" />
            </Group>

            <Group title="Errores y salida">
              <Field label="Ejecuciones con error" value={i.tasaError} onChange={(n) => setI("tasaError", n)} min={0} max={50} step={1} unit="%" />
              <Field label="Horas por error" hint="Detectar, corregir y avisar" value={i.horasPorError} onChange={(n) => setI("horasPorError", n)} min={0} max={8} step={0.25} unit="h" />
              <Field label="Coste de apagarla" hint="Exportar, migrar o volver a hacerlo a mano" value={i.horasSalida} onChange={(n) => setI("horasSalida", n)} min={0} max={80} step={1} unit="h" />
              <Field label="Horizonte" value={i.meses} onChange={(n) => setI("meses", n)} min={3} max={36} step={1} unit="meses" />
            </Group>
          </div>

          <Results r={r} rp={rp} costeHora={i.costeHora} />
        </div>
      </Step>

      {/* Resumen fijo en móvil */}
      <div className="sticky bottom-3 z-20 mt-6 flex items-center justify-between rounded-full border border-[var(--calc-line)] bg-[var(--calc-bg)]/95 px-4 py-2 text-sm shadow-sm backdrop-blur @4xl:hidden">
        <span className="text-[var(--calc-muted)]">{tr("Recuperación")}</span>
        <span className={r.mesRecuperacion ? "font-medium text-[var(--calc-accent)]" : "font-medium"}>
          {r.mesRecuperacion ? `${tr("mes")} ${r.mesRecuperacion}` : tr("no se recupera")}
        </span>
        <span className="tabular-nums">
          {r.netoHorasConSalida > 0 ? "+" : ""}
          {nf(r.netoHorasConSalida)} h
        </span>
      </div>

      {/* Paso 2: lo que no sale en la cuenta */}
      <Step n={2} title="Situación actual" sub="Marca las que se cumplen.">
        <div className="grid gap-6 @lg:grid-cols-2 @4xl:grid-cols-4">
          <Group title="Complejidad">
            <Check label="Las reglas cambian con frecuencia" checked={a.reglasCambian} onChange={(b) => setA("reglasCambian", b)} />
            <Check label="Muchas excepciones" checked={a.muchasExcepciones} onChange={(b) => setA("muchasExcepciones", b)} />
            <Check label="Los datos están desordenados" checked={a.datosDesordenados} onChange={(b) => setA("datosDesordenados", b)} />
            <Check label="Requiere interpretación o empatía" checked={a.requiereInterpretacion} onChange={(b) => setA("requiereInterpretacion", b)} />
          </Group>
          <Group title="Riesgo">
            <Check label="Afecta a personas, derechos u oportunidades" checked={a.afectaPersonas} onChange={(b) => setA("afectaPersonas", b)} />
            <Check label="Maneja datos personales o sensibles" checked={a.datosSensibles} onChange={(b) => setA("datosSensibles", b)} />
            <Check label="Un error se puede deshacer" checked={a.errorReversible} onChange={(b) => setA("errorReversible", b)} />
            <Check label="El error se detecta antes de tener consecuencias" checked={a.errorDetectable} onChange={(b) => setA("errorDetectable", b)} />
          </Group>
          <Group title="Responsables">
            <Check label="Hay una persona responsable" checked={a.hayResponsable} onChange={(b) => setA("hayResponsable", b)} />
            <Check label="Hay alertas cuando algo falla" checked={a.hayAlertas} onChange={(b) => setA("hayAlertas", b)} />
            <Check label="Otra persona puede hacerse cargo" checked={a.otraPersonaPuede} onChange={(b) => setA("otraPersonaPuede", b)} />
            <Check label="La documentación está al día" checked={a.hayDocumentacion} onChange={(b) => setA("hayDocumentacion", b)} />
          </Group>
          <Group title="Dependencia">
            <Check label="Los datos se pueden exportar" checked={a.datosExportables} onChange={(b) => setA("datosExportables", b)} />
            <Check label="Tenemos una alternativa razonable" checked={a.hayAlternativa} onChange={(b) => setA("hayAlternativa", b)} />
            <Check label="Depende de una cuenta personal" checked={a.cuentaPersonal} onChange={(b) => setA("cuentaPersonal", b)} />
          </Group>
        </div>
      </Step>

      {/* Paso 3: resultado */}
      <Step n={3} title="Resultado" sub="Recomendación y tareas pendientes.">
        <div className="grid gap-6 @4xl:grid-cols-2">
          <VerdictCard id={v.id} titulo={v.titulo} resumen={v.resumen} motivos={v.motivos} />
          <div className="rounded-xl border border-[var(--calc-line)] p-6">
            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--calc-muted)]">
              {tr("Pendiente")} · {abiertas.length}
            </h4>
            {abiertas.length === 0 ? (
              <p className="mt-3 text-[var(--calc-muted)]">{tr("Nada pendiente.")}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {abiertas.map((q) => (
                  <li key={q.pregunta} className="flex flex-col gap-0.5 text-sm leading-snug @lg:flex-row @lg:gap-3">
                    <span className="mt-0.5 shrink-0 @lg:w-32 text-xs uppercase tracking-wider text-[var(--calc-sky)]">{tr(q.dimension)}</span>
                    <span>{tr(q.pregunta)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Step>

      <p className="mt-8 text-xs leading-relaxed text-[var(--calc-muted)]">
        {tr("Cálculo: ahorro mensual constante; el mantenimiento crece según la deriva; herramientas convertidas a horas. Pesimista: mantenimiento, revisión y errores ×2. Los datos no salen del navegador.")}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Resultados numéricos + gráfico                                      */
/* ------------------------------------------------------------------ */
function Results({ r, rp, costeHora }: { r: Result; rp: Result; costeHora: number }) {
  const tr = useT();
  const neg = r.netoHorasConSalida < 0;
  return (
    <div className="@4xl:sticky @4xl:top-6 @4xl:self-start">
      <div className="rounded-xl border border-[var(--calc-line)] p-6">
        <p className="text-sm text-[var(--calc-muted)]">{tr("Recuperación de la inversión")}</p>
        <p className={`mt-1 text-4xl font-medium tracking-tight ${r.mesRecuperacion ? "text-[var(--calc-accent)]" : "text-[var(--calc-text)]"}`}>
          {r.mesRecuperacion ? `${tr("Mes")} ${r.mesRecuperacion}` : tr("No se recupera")}
        </p>
        <p className="mt-1 text-sm text-[var(--calc-muted)]">
          {tr("Pesimista")}: {rp.mesRecuperacion ? `${tr("mes")} ${rp.mesRecuperacion}` : tr("no se recupera")}
        </p>

        <Chart r={r} rp={rp} />

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Stat label="Inversión inicial" value={`${nf(r.inversionInicial)} h`} />
          <Stat label="Ahorro bruto" value={`${nf(r.ahorroBrutoTotal)} h`} />
          <Stat label="Coste de mantenerla" value={`${nf(r.costeRecurrenteTotal)} h`} />
          <Stat
            label="Balance con salida"
            value={`${r.netoHorasConSalida > 0 ? "+" : ""}${nf(r.netoHorasConSalida)} h · ${eur(r.netoEuros)}`}
            tone={neg ? undefined : "pos"}
          />
        </dl>

        <div className="mt-5 space-y-3 border-t border-[var(--calc-line)] pt-4 text-sm">
          <Insight label="Máximo de horas de construcción">
            {r.presupuestoMaxConstruccion > 0 ? (
              <>
                <strong className="font-medium text-[var(--calc-sky)]">{nf(r.presupuestoMaxConstruccion)} h</strong>. {tr("Por encima, no compensa en")}{" "}
                {r.filas.length} {tr("meses")}.
              </>
            ) : (
              <>{tr("Ninguno. El coste mensual supera al ahorro.")}</>
            )}
          </Insight>
          <Insight label="Máximo de mantenimiento">
            {r.umbralMantenimiento > 0 ? (
              <>
                <strong className="font-medium text-[var(--calc-sky)]">{nf(r.umbralMantenimiento)} {tr("h/mes")}</strong>{" "}
                {tr("entre mantenimiento y revisión. Por encima, no ahorra tiempo.")}
              </>
            ) : (
              <>{tr("Errores y herramientas superan el ahorro")} ({eur(r.ahorroMensualBruto * costeHora)}/{tr("mes")}).</>
            )}
          </Insight>
          <Insight label="Rendimiento">
            <strong className="font-medium">{nf(r.rendimiento, 2)} h</strong> {tr("ahorradas por cada hora invertida.")}
          </Insight>
        </div>

        <details className="group mt-5 border-t border-[var(--calc-line)] pt-4 text-sm">
          <summary className="cursor-pointer list-none text-[var(--calc-muted)] hover:text-[var(--calc-text)]">
            <span className="group-open:hidden">{tr("Ver tabla")}</span>
            <span className="hidden group-open:inline">{tr("Ocultar tabla")}</span>
          </summary>
          <div className="mt-3 max-h-64 overflow-auto">
            <table className="w-full text-right text-xs tabular-nums">
              <thead className="sticky top-0 bg-[var(--calc-bg)] text-[var(--calc-muted)]">
                <tr>
                  <th className="py-1 text-left font-normal">{tr("Mes")}</th>
                  <th className="py-1 font-normal">{tr("Ahorro")}</th>
                  <th className="py-1 font-normal">{tr("Coste")}</th>
                  <th className="py-1 font-normal">{tr("Acumulado")}</th>
                  <th className="py-1 font-normal">{tr("Pesimista")}</th>
                </tr>
              </thead>
              <tbody>
                {r.filas.map((f, k) => (
                  <tr key={f.mes} className="border-t border-[var(--calc-line)]">
                    <td className="py-1 text-left">{f.mes}</td>
                    <td className="py-1">{nf(f.ahorro)}</td>
                    <td className="py-1">{nf(f.mantenimiento + f.revision + f.errores + f.herramientas)}</td>
                    <td className={`py-1 ${f.acumulado >= 0 ? "text-[var(--calc-accent)]" : ""}`}>{nf(f.acumulado)}</td>
                    <td className="py-1 text-[var(--calc-muted)]">{nf(rp.filas[k].acumulado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}

function Insight({ label, children }: { label: string; children: ReactNode }) {
  const tr = useT();
  return (
    <div>
      <p className="text-[var(--calc-muted)]">{tr(label)}</p>
      <p className="mt-0.5 leading-snug">{children}</p>
    </div>
  );
}

function Chart({ r, rp }: { r: Result; rp: Result }) {
  const tr = useT();
  const [hover, setHover] = useState<number | null>(null);
  const W = 400;
  const H = 170;
  const pad = { l: 34, r: 8, t: 10, b: 22 };
  const series = [
    [-r.inversionInicial, ...r.filas.map((f) => f.acumulado)],
    [-rp.inversionInicial, ...rp.filas.map((f) => f.acumulado)],
  ];
  const all = series.flat();
  const min = Math.min(0, ...all);
  const max = Math.max(0, ...all);
  const span = max - min || 1;
  const n = series[0].length - 1;
  const x = (m: number) => pad.l + (m / n) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + ((max - v) / span) * (H - pad.t - pad.b);
  const path = (s: number[]) => s.map((v, m) => `${m ? "L" : "M"}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const ticks = n <= 12 ? [0, Math.round(n / 2), n] : [0, Math.round(n / 3), Math.round((2 * n) / 3), n];

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const m = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * n);
    setHover(Math.min(n, Math.max(0, m)));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(n, (h ?? -1) + 1));
    if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? n + 1) - 1));
    if (e.key === "Escape") setHover(null);
  };

  return (
    <figure className="relative mt-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none outline-none"
        role="img"
        aria-label={tr("Horas acumuladas mes a mes. Usa las flechas para recorrer los meses.")}
        tabIndex={0}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} stroke="var(--calc-line)" strokeWidth={1.5} />
        <text x={pad.l - 6} y={y(0) + 3} textAnchor="end" fontSize="10" fill="var(--calc-muted)">0 h</text>
        {max > 0 && (
          <text x={pad.l - 6} y={y(max) + 8} textAnchor="end" fontSize="10" fill="var(--calc-muted)">+{nf(max, 0)}</text>
        )}
        <text x={pad.l - 6} y={y(min) - 4} textAnchor="end" fontSize="10" fill="var(--calc-muted)">{nf(min, 0)}</text>
        {ticks.map((t) => (
          <text key={t} x={x(t)} y={H - 6} textAnchor={t === 0 ? "start" : t === n ? "end" : "middle"} fontSize="10" fill="var(--calc-muted)">
            {t === 0 ? tr("lanzamiento") : `${tr("mes")} ${t}`}
          </text>
        ))}
        <path d={path(series[1])} fill="none" stroke="var(--calc-sky)" strokeWidth={1.5} strokeDasharray="4 4" />
        <path d={path(series[0])} fill="none" stroke="var(--calc-accent)" strokeWidth={2} strokeLinejoin="round" />
        {r.mesRecuperacion && hover === null && (
          <circle cx={x(r.mesRecuperacion)} cy={y(r.filas[r.mesRecuperacion - 1].acumulado)} r={4} fill="var(--calc-bg)" stroke="var(--calc-accent)" strokeWidth={2} />
        )}
        {hover !== null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="var(--calc-muted)" strokeOpacity={0.4} />
            <circle cx={x(hover)} cy={y(series[1][hover])} r={4} fill="var(--calc-bg)" stroke="var(--calc-sky)" strokeWidth={2} />
            <circle cx={x(hover)} cy={y(series[0][hover])} r={4} fill="var(--calc-bg)" stroke="var(--calc-accent)" strokeWidth={2} />
          </g>
        )}
        <rect
          x={pad.l}
          y={0}
          width={W - pad.l - pad.r}
          height={H}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 w-max whitespace-nowrap rounded-lg border border-[var(--calc-line)] bg-[var(--calc-bg)] px-3 py-2 text-xs shadow-sm"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > n / 2 ? "calc(-100% - 10px)" : "10px"})` }}
        >
          <p className="text-[var(--calc-muted)]">{hover === 0 ? tr("Lanzamiento") : `${tr("Mes")} ${hover}`}</p>
          <p className="mt-1 flex items-center gap-2">
            <span className="h-0.5 w-3 bg-[var(--calc-accent)]" />
            <strong className="font-medium tabular-nums">{nf(series[0][hover])} h</strong>
            <span className="text-[var(--calc-muted)]">{tr("estimado")}</span>
          </p>
          <p className="mt-0.5 flex items-center gap-2">
            <span className="w-3 border-t-[1.5px] border-dashed border-[var(--calc-sky)]" />
            <strong className="font-medium tabular-nums">{nf(series[1][hover])} h</strong>
            <span className="text-[var(--calc-muted)]">{tr("pesimista")}</span>
          </p>
        </div>
      )}
      <figcaption className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--calc-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-[var(--calc-accent)]" /> {tr("Estimado")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 border-t-[1.5px] border-dashed border-[var(--calc-sky)]" /> {tr("Pesimista (×2 mantenimiento, revisión y errores)")}
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Piezas                                                              */
/* ------------------------------------------------------------------ */
const verdictStyle: Record<VeredictoId, string> = {
  sostenible: "border-l-[var(--calc-accent)] [&_.v-title]:text-[var(--calc-accent)]",
  "con-responsable": "border-l-[var(--calc-sky)] [&_.v-title]:text-[var(--calc-sky)]",
  redisenar: "border-l-[var(--calc-text)]",
  "no-todavia": "border-l-[var(--calc-text)]",
};

function VerdictCard({ id, titulo, resumen, motivos }: { id: VeredictoId; titulo: string; resumen: string; motivos: string[] }) {
  const tr = useT();
  return (
    <div className={`rounded-xl border border-l-4 border-[var(--calc-line)] p-6 ${verdictStyle[id]}`} aria-live="polite">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--calc-muted)]">{tr("Recomendación")}</p>
      <p className="v-title mt-1 text-2xl font-medium tracking-tight">{tr(titulo)}</p>
      <p className="mt-2 leading-snug">{tr(resumen)}</p>
      {motivos.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--calc-muted)] marker:text-[var(--calc-line)]">
          {motivos.map((m) => (
            <li key={m}>{tr(m)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Step({ n, title, sub, children }: { n: number; title: string; sub: string; children: ReactNode }) {
  const tr = useT();
  return (
    <div className="mt-10 border-t border-[var(--calc-line)] pt-8">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-sm text-[var(--calc-accent)]">0{n}</span>
        <div>
          <h4 className="text-lg font-medium">{tr(title)}</h4>
          <p className="text-sm text-[var(--calc-muted)]">{tr(sub)}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  const tr = useT();
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--calc-sky)]">{tr(title)}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  hint?: ReactNode;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) {
  const tr = useT();
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm leading-tight">
          {tr(label)}
        </label>
        <span className="flex shrink-0 items-baseline gap-1">
          <input
            type="number"
            inputMode="decimal"
            aria-label={tr(label)}
            value={value}
            min={min}
            step={step}
            onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
            className="w-16 rounded-md border border-[var(--calc-line)] bg-transparent px-1.5 py-0.5 text-right text-sm tabular-nums focus:border-[var(--calc-accent)] focus:outline-none"
          />
          {unit && <span className="w-12 text-xs text-[var(--calc-muted)]">{tr(unit)}</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={Math.max(max, value)}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-0.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--calc-line)] [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--calc-accent)] [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--calc-accent)] [&::-webkit-slider-thumb]:bg-white"
      />
      {hint && <p className="mt-1 text-xs leading-snug text-[var(--calc-muted)]">{typeof hint === "string" ? tr(hint) : hint}</p>}
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  const tr = useT();
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[var(--calc-accent)]"
      />
      <span>{tr(label)}</span>
    </label>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "pos" | "neg" }) {
  const tr = useT();
  return (
    <div>
      <dt className="text-[var(--calc-muted)]">{tr(label)}</dt>
      <dd
        className={`mt-0.5 font-medium tabular-nums ${
          tone === "pos" ? "text-[var(--calc-accent)]" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
