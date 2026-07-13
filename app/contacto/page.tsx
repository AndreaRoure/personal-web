export default function Contacto() {
  return (
    <div>
      <p className="text-sm text-muted mb-2">Contacto</p>
      <h1 className="font-display text-3xl font-semibold mb-8">Hablemos</h1>
      <p className="text-lg">
        Puedes escribirme a{" "}
        <a href="mailto:tuemail@ejemplo.com" className="text-accent underline">
          tuemail@ejemplo.com
        </a>
      </p>
    </div>
  );
}