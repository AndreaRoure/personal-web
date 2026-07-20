"use client";

import { useState } from "react";
import Image from "next/image";

export default function PalabraConFoto({
  children,
  src,
  rotacion = 2,
}: {
  children: React.ReactNode;
  src: string;
  rotacion?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="underline decoration-accent decoration-2 underline-offset-4 cursor-pointer">
        {children}
      </span>
      {visible && (
        <span
          className="absolute left-1/2 bottom-full mb-3 z-10 hidden md:block w-36 h-36 rounded-lg overflow-hidden shadow-xl pointer-events-none"
          style={{ transform: `translateX(-50%) rotate(${rotacion}deg)` }}
        >
          <Image src={src} alt="" fill className="object-cover" />
        </span>
      )}
    </span>
  );
}