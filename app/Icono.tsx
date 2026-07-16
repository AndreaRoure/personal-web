"use client";

import {
  Wrench,
  Database,
  Zap,
  GraduationCap,
  Sprout,
} from "lucide-react";

const iconos = {
  herramienta: Wrench,
  datos: Database,
  automatizar: Zap,
  formacion: GraduationCap,
  brote: Sprout,
};

export default function Icono({ nombre }: { nombre: keyof typeof iconos }) {
  const IconoSvg = iconos[nombre];
  return (
    <span className="inline-flex items-center justify-center align-text-bottom mx-0.5 w-7 h-7 rounded-md bg-lima border border-ink/15 hover:bg-sky/40 hover:-rotate-6 transition-all cursor-default">
      <IconoSvg size={16} strokeWidth={2} />
    </span>
  );
}