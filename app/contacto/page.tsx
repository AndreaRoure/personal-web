import Revelar from "../Revelar";

export default function Contacto() {
  return (
    <div>
      <section className="w-full bg-white text-ink border-b border-[#1A1A17]">
       <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Contacto
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold">
            <span className="marcador-animado marcador-cielo">Hablemos</span>
          </h1>
        </div>
      </section>

      <section className="w-full bg-[#FAFAF7] text-ink">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <Revelar>
            <p className="text-lg">
              Puedes escribirme a{" "}
              <a href="mailto:robleshca@gmail.com" className="underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent/20 px-1 -mx-1 rounded-md transition-colors">robleshca@gmail.com</a>
            </p>
          </Revelar>
        </div>
      </section>
    </div>
  );
}