import { getTranslations } from "next-intl/server";
import DuracionDesde from "./DuracionDesde";
import IconoPanot from "./IconoPanot";

// El mes de inicio del puesto actual es el unico dato que no sale de los
// mensajes: hace falta como numero para que DuracionDesde calcule el tiempo
// transcurrido. El resto (puesto, org, periodo, descripcion) esta en
// messages/{locale}.json bajo "trayectoria".
const DESDE_ACTUAL = { anio: 2026, mes: 3 };

/** Punto verde con anillo que late, como los indicadores de "en activo". */
function PuntoActivo({ etiqueta }: { etiqueta: string }) {
  return (
    <span className="relative inline-flex h-2 w-2 ml-2.5 align-middle" role="img" aria-label={etiqueta}>
      <span className="absolute inset-0 rounded-full bg-accent animate-latido" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

function Etiqueta({
  children,
  puntoActivo,
}: {
  children: React.ReactNode;
  puntoActivo?: string;
}) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
      {children}
      {puntoActivo && <PuntoActivo etiqueta={puntoActivo} />}
    </p>
  );
}

export default async function Trayectoria() {
  const t = await getTranslations("trayectoria");

  const actual = {
    puesto: t("actual.puesto"),
    org: t("actual.org"),
    periodo: t("actual.periodo"),
    descripcion: t("actual.descripcion"),
  };
  const anterior = (["puesto1", "puesto2", "puesto3"] as const).map((clave) => ({
    puesto: t(`${clave}.puesto`),
    org: t(`${clave}.org`),
    periodo: t(`${clave}.periodo`),
    descripcion: t(`${clave}.descripcion`),
  }));

  return (
    <div className="space-y-10">
      {/* Ubicación */}
      <div>
        <Etiqueta>{t("ubicacion")}</Etiqueta>
        <p className="text-lg flex items-center gap-2">
          {t("ciudad")}
          <IconoPanot />
        </p>
      </div>

      {/* Actualmente — en caja, para que destaque sobre el resto */}
      <div>
        <Etiqueta puntoActivo={t("enActivo")}>{t("actualmente")}</Etiqueta>
        <div className="bg-white border-2 border-[#1A1A17] p-5 sm:p-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
            {actual.puesto}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-muted mt-2">
            {actual.org} · {actual.periodo}
            <span className="text-accent">
              {" · "}
              <DuracionDesde anio={DESDE_ACTUAL.anio} mes={DESDE_ACTUAL.mes} />
            </span>
          </p>
          <p className="mt-4 leading-relaxed">{actual.descripcion}</p>
        </div>
      </div>

      {/* Anterior */}
      <div>
        <Etiqueta>{t("anterior")}</Etiqueta>
        <ol className="space-y-0">
          {anterior.map((r) => (
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
