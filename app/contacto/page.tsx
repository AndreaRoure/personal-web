import Marcador from "../Marcador";

export default function Contacto() {
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold mb-8">
        <Marcador color="cielo">Hablemos</Marcador>
      </h1>
      <p className="text-lg">
        Puedes escribirme a{" "}
        <a href="mailto:robleshca@gmail.com" className="underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent/20 px-1 -mx-1 rounded-md transition-colors">robleshca@gmail.com</a>
      </p>
    </div>
  );
}