import DuracionDesde from "./DuracionDesde";
import IconoVela from "./IconoVela";

const ACTUAL = {
  puesto: "Directora de Transformación Digital",
  org: "Fundación Exit",
  desde: { anio: 2026, mes: 3 },
  periodo: "marzo 2026 — hoy",
  descripcion:
    "Dirijo la estrategia tecnológica de una organización social de impacto. Lidero iniciativas de digitalización, integración de datos e IA para hacer los procesos más eficientes y escalables.",
};

const ANTERIOR = [
  {
    puesto: "Responsable de IT & Producto",
    org: "Fundación Exit",
    periodo: "2022 — 2026",
    descripcion:
      "Definí el roadmap tecnológico, integré herramientas y coordiné equipos técnicos y proveedores. Del diagnóstico al despliegue.",
  },
  {
    puesto: "Digital Marketing & Social Media Manager",
    org: "Culinary Institute of Barcelona",
    periodo: "2021",
    descripcion:
      "Estrategia digital completa — SEO, SEM, Social Ads, analítica — coordinando equipos internos y externos.",
  },
  {
    puesto: "Digital Marketing Manager",
    org: "Amalgama Agencia",
    periodo: "2019",
    descripcion:
      "Proyectos digitales para clientes de sectores variados. Comunicación multicanal con automatización de marketing y coordinación con desarrollo y diseño.",
  },
];

/** Punto verde con anillo que late, como los indicadores de "en activo". */
function PuntoActivo() {
  return (
    <span
      className="relative inline-flex h-2 w-2 ml-2.5 align-middle"
      role="img"
      aria-label="En activo"
    >
      <span className="absolute inset-0 rounded-full bg-accent animate-latido" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

function Etiqueta({
  children,
  activo = false,
}: {
  children: React.ReactNode;
  activo?: boolean;
}) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
      {children}
      {activo && <PuntoActivo />}
    </p>
  );
}

export default function Trayectoria() {
  return (
    <div className="space-y-10">
      {/* Ubicación */}
      <div>
        <Etiqueta>Ubicación</Etiqueta>
        <p className="text-lg flex items-center gap-2">
          Barcelona
          <IconoVela />
        </p>
      </div>

      {/* Actualmente — en caja, para que destaque sobre el resto */}
      <div>
        <Etiqueta activo>Actualmente</Etiqueta>
        <div className="bg-white border-2 border-[#1A1A17] p-5 sm:p-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
            {ACTUAL.puesto}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-muted mt-2">
            {ACTUAL.org} · {ACTUAL.periodo}
            <span className="text-accent">
              {" · "}
              <DuracionDesde anio={ACTUAL.desde.anio} mes={ACTUAL.desde.mes} />
            </span>
          </p>
          <p className="mt-4 leading-relaxed">{ACTUAL.descripcion}</p>
        </div>
      </div>

      {/* Anterior */}
      <div>
        <Etiqueta>Anterior</Etiqueta>
        <ol className="space-y-0">
          {ANTERIOR.map((r) => (
            <li
              key={r.puesto + r.periodo}
              className="border-t-2 border-ink/10 py-5 first:border-t-0 first:pt-0"
            >
              <h3 className="font-display text-lg sm:text-xl font-bold leading-tight">
                {r.puesto}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-muted mt-1.5">
                {r.org} · {r.periodo}
              </p>
              <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-ink/80">
                {r.descripcion}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
