"use client";

import { useEffect, useState } from "react";
import { FaLinkedinIn, FaWhatsapp, FaBluesky, FaLink, FaCheck } from "react-icons/fa6";

const BOTON =
  "inline-flex items-center gap-2 px-3 py-2 border border-ink/25 text-ink/80 rounded-md " +
  "hover:border-accent hover:text-accent transition-colors text-sm font-medium " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function CompartirPost({ titulo }: { titulo: string }) {
  // La URL se lee del navegador en vez de componerla con el dominio: asi
  // sigue siendo correcta si algun dia cambias de dominio.
  const [url, setUrl] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin contexto seguro o sin permiso: seleccionamos la URL de la barra
      // no es posible, asi que al menos no rompemos nada.
      setCopiado(false);
    }
  }

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titulo);

  const redes = [
    {
      nombre: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icono: FaLinkedinIn,
    },
    {
      nombre: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${t}%20${u}`,
      Icono: FaBluesky,
    },
    {
      nombre: "WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      Icono: FaWhatsapp,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {redes.map(({ nombre, href, Icono }) => (
        <a
          key={nombre}
          href={url ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${nombre}`}
          className={BOTON}
        >
          <Icono size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{nombre}</span>
        </a>
      ))}

      <button type="button" onClick={copiar} className={BOTON}>
        {copiado ? <FaCheck size={15} aria-hidden="true" /> : <FaLink size={15} aria-hidden="true" />}
        <span className="hidden sm:inline">{copiado ? "Copiado" : "Copiar enlace"}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copiado ? "Enlace copiado al portapapeles" : ""}
      </span>
    </div>
  );
}
