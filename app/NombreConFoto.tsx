"use client";

import { useState } from "react";
import Image from "next/image";

export default function NombreConFoto() {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="underline decoration-accent decoration-2 underline-offset-4 cursor-pointer">
        Andrea Robles
      </span>
      {visible && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-10 block w-36 h-36 rounded-lg overflow-hidden shadow-lg rotate-2">
          <Image
            src="/andrea.png"
            alt="Andrea Robles"
            fill
            className="object-cover"
          />
        </span>
      )}
    </span>
  );
}