"use client";

import { MotionConfig } from "framer-motion";

/** framer-motion no mira prefers-reduced-motion por su cuenta (el bloque de
 *  globals.css solo afecta a animaciones CSS). Con reducedMotion="user" las
 *  animaciones de transform/posicion se desactivan si el sistema lo pide. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
