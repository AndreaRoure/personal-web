import Revelar from "../Revelar";

export default function Contacto() {
  return (
    <div>
      <section className="bg-dark text-crema">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16">
          <h1 className="font-display text-5xl md:text-6xl font-semibold">
            <span className="marcador-animado marcador-cielo">Hablemos</span>
          </h1>
        </div>
      </section>

      <section className="bg-bg text-ink">
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