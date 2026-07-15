import NombreConFoto from "./NombreConFoto";

const tools = [
  {
    nombre: "Comparador de Empleabilidad FP",
    descripcion:
      "Herramienta para explorar la empleabilidad real de los ciclos de FP con datos públicos.",
    url: "https://ejemplo.com",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="font-display text-5xl font-semibold leading-tight mb-10">
        Trabajo en la intersección entre{" "}
        <span className="text-accent">tecnología</span> y{" "}
        <span className="text-accent">justicia social</span>.
      </h1>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Soy <NombreConFoto />. Empecé en Magisterio, seguí por marketing, y
          terminé formándome en Big Data e IA — no porque cambiara de rumbo,
          sino porque cada paso me acercaba a la misma pregunta: ¿cómo hacemos
          que la tecnología sirva a las personas, y no al revés?
        </p>
        <p>
          Hoy dirijo la transformación digital de una organización social,
          donde cada decisión técnica (qué herramienta usar, qué datos recoger,
          qué automatizar) se mide con una vara distinta a la de una empresa.
        </p>
      </div>

      <blockquote className="border-l-2 border-accent pl-6 my-10 text-xl leading-relaxed text-ink/80">
        Creo en la soberanía digital — que las organizaciones y las personas
        controlen sus herramientas y sus datos, no al revés.
      </blockquote>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Creo en la formación como palanca de cambio real. Y creo que los
          modelos alternativos de vida y organización (cooperativismo, espacios
          democráticos) no son una utopía, son una forma práctica de hacer las
          cosas de otra manera.
        </p>
        <p>
          Este espacio es donde voy dejando por escrito lo que aprendo en el
          camino.
        </p>
      </div>

      <section className="mt-20 pt-10 border-t border-ink/10">
        <h2 className="font-display text-2xl font-semibold mb-6">Tools</h2>
        <ul className="space-y-6">
          {tools.map((tool) => (
            <li key={tool.nombre}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl font-semibold hover:text-accent transition-colors">
                {tool.nombre} ↗
              </a>
              <p className="text-muted mt-1">{tool.descripcion}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}