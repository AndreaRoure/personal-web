import PalabraConFoto from "./PalabraConFoto";
import KickerRotativo from "./KickerRotativo";
import Marcador from "./Marcador";
import Icono from "./Icono";

export default function Home() {
  return (
    <div>
      <KickerRotativo />

      <h1 className="font-display text-5xl font-semibold leading-tight mb-10">
        Trabajo en la intersección entre la{" "}
        <Marcador color="lima">tecnología</Marcador> y las{" "}
        <Marcador color="cielo">personas</Marcador>.
      </h1>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Soy{" "}
          <PalabraConFoto src="/andrea.png" rotacion={-3}>
            Andrea Robles
          </PalabraConFoto>
          . Empecé en Magisterio, seguí por marketing, y terminé formándome en
          Big Data e IA — no porque cambiara de rumbo, sino porque cada paso me
          acercaba a la misma pregunta: ¿cómo hacemos que la tecnología sirva a
          las personas, y no al revés?
        </p>
        <p>
          Hoy dirijo la transformación digital de una organización social,
          donde cada decisión técnica (qué herramienta usar{" "}
          <Icono nombre="herramienta" />, qué datos recoger{" "}
          <Icono nombre="datos" />, qué automatizar{" "}
          <Icono nombre="automatizar" />) se mide con una vara distinta a la de
          una empresa.
        </p>
      </div>

      <blockquote className="border-l-2 border-accent pl-6 my-10 text-xl leading-relaxed text-ink/80">
        Creo en la soberanía digital — que las organizaciones y las personas
        controlen sus herramientas y sus datos, no al revés.
      </blockquote>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Creo en la formación <Icono nombre="formacion" /> como palanca de
          cambio real. Y creo que los modelos alternativos de vida y
          organización (cooperativismo <Icono nombre="brote" />, espacios
          democráticos) no son una utopía, son una forma práctica de hacer las
          cosas de otra manera.
        </p>
        <p>
          Este espacio es donde voy dejando por escrito lo que aprendo en el
          camino.
        </p>
      </div>

      <section className="mt-20 pt-10 border-t border-ink/10">
        <h2 className="font-display text-2xl font-semibold mb-6">Proyectos</h2>
        <ul className="space-y-6">
          <li>
            <span className="font-display text-xl font-semibold">
              Comparador de Empleabilidad FP
            </span>
            <span className="ml-3 text-xs uppercase tracking-wide text-muted border border-ink/20 rounded-full px-2 py-0.5">
              EN CONSTRUCCIÓN
            </span>
            <p className="text-muted mt-1">
              Herramienta para explorar la empleabilidad real de los ciclos de
              FP con datos públicos.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}