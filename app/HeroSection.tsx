"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

type Phase = "idle" | "running" | "dead" | "won";

// ── SVGs ──────────────────────────────────────────────────────────────────────
const catSVG = (spread: boolean) => {
  const legs = spread ? `
    <line x1="44" y1="41" x2="52" y2="56" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="39" y1="42" x2="33" y2="56" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="22" y1="42" x2="25" y2="56" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="17" y1="41" x2="10" y2="56" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
  ` : `
    <line x1="44" y1="41" x2="42" y2="57" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="39" y1="42" x2="41" y2="57" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="22" y1="42" x2="20" y2="57" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="17" y1="41" x2="21" y2="57" stroke="#2B3300" stroke-width="4.5" stroke-linecap="round"/>
  `;
  return `<svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M 13 31 C 5 27 0 15 6 8 C 7 6 10 7 9 11 C 7 17 10 24 14 29" fill="#2B3300"/>
    <ellipse cx="32" cy="34" rx="21" ry="12" fill="#2B3300"/>
    <line x1="47" y1="27" x2="55" y2="21" stroke="#2B3300" stroke-width="9" stroke-linecap="round"/>
    <circle cx="55" cy="20" r="11" fill="#2B3300"/>
    <polygon points="48,13 51,2 56,12" fill="#2B3300"/>
    <polygon points="54,12 58,2 62,12" fill="#2B3300"/>
    <circle cx="58" cy="17" r="2.5" fill="#F2F5E4"/>
    <circle cx="63" cy="21" r="1.2" fill="#F2F5E4"/>
    ${legs}
  </svg>`;
};

const CAT_DEAD_SVG = `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
  <polygon points="12,26 17,8 25,25" fill="#2B3300"/>
  <polygon points="35,25 43,8 48,26" fill="#2B3300"/>
  <circle cx="30" cy="34" r="20" fill="#2B3300"/>
  <line x1="19" y1="27" x2="26" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="26" y1="27" x2="19" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="34" y1="27" x2="41" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="41" y1="27" x2="34" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

const CAT_WON_SVG = `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
  <polygon points="12,26 17,8 25,25" fill="#2B3300"/>
  <polygon points="35,25 43,8 48,26" fill="#2B3300"/>
  <circle cx="30" cy="34" r="20" fill="#2B3300"/>
  <text x="22" y="35" fill="#F2F5E4" font-size="12" text-anchor="middle" font-family="serif">♥</text>
  <text x="38" y="35" fill="#F2F5E4" font-size="12" text-anchor="middle" font-family="serif">♥</text>
</svg>`;

const BOMBA   = `<svg viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg"><path d="M 24 14 Q 28 8 30 4" stroke="#2B3300" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="31" cy="3" r="3.5" fill="#7A9201"/><circle cx="20" cy="31" r="19" fill="#2B3300"/><ellipse cx="13" cy="23" rx="5" ry="3" fill="#F2F5E4" opacity="0.2" transform="rotate(-30 13 23)"/></svg>`;
const LIBROS  = `<svg viewBox="0 0 52 58" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="46" width="46" height="11" rx="1.5" fill="#2B3300"/><rect x="7" y="31" width="38" height="11" rx="1.5" fill="#2B3300"/><rect x="11" y="17" width="30" height="11" rx="1.5" fill="#2B3300"/><rect x="15" y="5" width="22" height="10" rx="1.5" fill="#2B3300"/><line x1="11" y1="46" x2="11" y2="57" stroke="#F2F5E4" stroke-width="2"/><line x1="15" y1="31" x2="15" y2="42" stroke="#F2F5E4" stroke-width="2"/><line x1="19" y1="17" x2="19" y2="28" stroke="#F2F5E4" stroke-width="2"/><line x1="23" y1="5" x2="23" y2="15" stroke="#F2F5E4" stroke-width="2"/></svg>`;
const TEAMS   = `<svg viewBox="0 0 62 54" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="60" height="40" rx="3" fill="#2B3300"/><rect x="4" y="4" width="54" height="34" rx="2" fill="#F2F5E4"/><rect x="6" y="6" width="24" height="14" rx="1" fill="#2B3300"/><rect x="32" y="6" width="24" height="14" rx="1" fill="#2B3300"/><rect x="6" y="22" width="24" height="14" rx="1" fill="#2B3300"/><rect x="32" y="22" width="24" height="14" rx="1" fill="#2B3300"/><circle cx="18" cy="11" r="3.5" fill="#F2F5E4"/><circle cx="44" cy="11" r="3.5" fill="#F2F5E4"/><circle cx="18" cy="27" r="3.5" fill="#F2F5E4"/><circle cx="44" cy="27" r="3.5" fill="#F2F5E4"/><rect x="26" y="41" width="10" height="5" rx="1" fill="#2B3300"/><rect x="18" y="46" width="26" height="4" rx="1" fill="#2B3300"/></svg>`;
const INFORME = `<svg viewBox="0 0 46 56" xmlns="http://www.w3.org/2000/svg"><path d="M 3 2 L 32 2 L 43 13 L 43 54 L 3 54 Z" fill="#2B3300"/><path d="M 32 2 L 32 13 L 43 13 Z" fill="#F2F5E4" opacity="0.35"/><line x1="10" y1="23" x2="36" y2="23" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="31" x2="36" y2="31" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="39" x2="36" y2="39" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="47" x2="26" y2="47" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/></svg>`;

const OBS_DEFS: [string, number, number][] = [
  [BOMBA,   42, 50],
  [LIBROS,  48, 56],
  [TEAMS,   58, 52],
  [INFORME, 42, 54],
];

function svgToImg(svg: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

// ── Constantes ────────────────────────────────────────────────────────────────
const CAT_W  = 80;
const CAT_H  = 64;
const CAT_X  = 80;
const GRAVITY  = 0.6;
const JUMP_V   = -16;
const WIN_SCORE = 1000;
const GROUND_RATIO = 0.76;
// Ancho de referencia (movil) donde la velocidad base ya se sentia bien
// ajustada. La velocidad de los obstaculos iba en pixeles fijos por frame,
// asi que en un canvas mucho mas ancho (desktop) tardaban muchisimo mas en
// cruzar la pantalla a esa misma velocidad — el juego se veia lentisimo.
// Escalando la velocidad por el ancho real del canvas, cruzar la pantalla
// tarda lo mismo (relativamente) sea cual sea el tamaño.
const REF_WIDTH = 400;

const INK   = "#2B3300";
const ACCENT = "#7A9201";
const MUTED  = "#2B3300AA";

export interface TextosHero {
  titularPre: string;
  titularFuerte: string;
  titularPost: string;
  scroll: string;
  pistaJuego: string;
  marcador: string;
  ganasteTitulo: string;
  ganasteSubtitulo: string;
  perdisteTitulo: string;
  perdisteSubtitulo: string;
}

export default function HeroSection({ textos }: { textos: TextosHero }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const progressRef  = useRef<HTMLSpanElement>(null);

  const assets = useRef<{
    cat: [HTMLImageElement, HTMLImageElement];
    catWon: HTMLImageElement;
    catDead: HTMLImageElement;
    obs: HTMLImageElement[];
  } | null>(null);

  const state = useRef({
    phase: "idle" as Phase,
    catY: 0, catVY: 0,
    obstacles: [] as { x: number; img: HTMLImageElement; w: number; h: number }[],
    score: 0, speed: 4, frame: 0, frameId: 0, lastSpawn: 0,
  });

  const stars = useRef<{ x: number; y: number; r: number; phase: number; alpha: number }[]>([]);

  const groundY = (H: number) => H * GROUND_RATIO - CAT_H;

  const interact = useCallback(() => {
    const g = state.current;
    const canvas = canvasRef.current;
    if (!canvas || !assets.current) return;
    const gy = groundY(canvas.height);

    if (g.phase === "idle")    { g.phase = "running"; g.catVY = JUMP_V; return; }
    if (g.phase === "running") { if (g.catY >= gy - 1) g.catVY = JUMP_V; return; }
    if (g.phase === "dead" || g.phase === "won") {
      Object.assign(g, { phase: "running", catY: gy, catVY: JUMP_V,
        obstacles: [], score: 0, speed: 4, frame: 0, lastSpawn: 0 });
      if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
    }
  }, []);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = section.clientWidth;
      canvas.height = section.clientHeight;
      state.current.catY = groundY(canvas.height);
      stars.current = Array.from({ length: 22 }, () => ({
        x:     (0.04 + Math.random() * 0.92) * canvas.width,
        y:     (0.04 + Math.random() * 0.52) * canvas.height,
        r:     0.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.12 + Math.random() * 0.22,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const g    = state.current;
    const mono = "'IBM Plex Mono', monospace";

    // Encoge la fuente hasta que el texto quepa en maxWidth (con un piso, para
    // no acabar ilegible en pantallas muy estrechas). Los textos de fin de
    // partida vienen de traducciones y varian bastante de longitud entre
    // idiomas, asi que un tamaño fijo se salia del canvas en movil.
    const fitFontSize = (texto: string, base: number, bold: boolean, maxWidth: number) => {
      let size = base;
      const pesa = bold ? "bold " : "";
      ctx.font = `${pesa}${size}px ${mono}`;
      while (ctx.measureText(texto).width > maxWidth && size > 9) {
        size -= 1;
        ctx.font = `${pesa}${size}px ${mono}`;
      }
      return size;
    };

    const drawEnd = (img: HTMLImageElement, title: string, subtitle: string) => {
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);
      const iw = 90, ih = 80;
      const cy = H * 0.62;
      const maxTextWidth = W - 32;
      ctx.drawImage(img, W / 2 - iw / 2, cy - ih - 16, iw, ih);
      ctx.textAlign = "center";
      ctx.fillStyle = INK;
      fitFontSize(title, 16, true, maxTextWidth);
      ctx.fillText(title, W / 2, cy + 24);
      ctx.fillStyle = ACCENT;
      fitFontSize(subtitle, 12, false, maxTextWidth);
      ctx.fillText(subtitle, W / 2, cy + 46);
    };

    Promise.all([
      svgToImg(catSVG(true)),
      svgToImg(catSVG(false)),
      svgToImg(CAT_WON_SVG),
      svgToImg(CAT_DEAD_SVG),
      ...OBS_DEFS.map(([svg]) => svgToImg(svg)),
    ]).then(loaded => {
      assets.current = {
        cat:     [loaded[0], loaded[1]] as [HTMLImageElement, HTMLImageElement],
        catWon:  loaded[2],
        catDead: loaded[3],
        obs:     loaded.slice(4),
      };
      g.catY = groundY(canvas.height);

      // El bucle iba por "frames" (g.frame++ una vez por callback de rAF),
      // asumiendo 60fps implicitos: gravedad, marcador, ritmo de aparicion
      // de obstaculos, todo contaba callbacks en vez de tiempo real. Si el
      // navegador no llega a 60fps de verdad (pantallas grandes con mas que
      // pintar, un equipo mas lento, una pestaña que el sistema regula) todo
      // el juego se ve a camara lenta aunque el codigo sea el mismo — es lo
      // que reportó Andrea (el primer obstaculo tardaba ~10s en vez de los
      // ~2.6s que marca el interval). Con dt (tiempo real transcurrido desde
      // el ultimo frame, normalizado a "1" a 60fps) el juego avanza al mismo
      // ritmo real sea cual sea el framerate que consiga el navegador.
      // Con techo de 3: si la pestaña estuvo un rato en pausa (dead/won
      // esperando a que el usuario reaccione) el primer dt tras seguir no da
      // un salto gigante que teletransporte el estado del juego.
      let lastTs = performance.now();

      const tick = (ts: number) => {
        g.frameId = requestAnimationFrame(tick);
        const dt = Math.min(3, (ts - lastTs) / (1000 / 60));
        lastTs = ts;
        g.frame += dt;
        const W = canvas.width;
        const H = canvas.height;
        const gy = groundY(H);
        const groundLine = H * GROUND_RATIO;

        if (g.phase === "won") {
          drawEnd(assets.current!.catWon, textos.ganasteTitulo, textos.ganasteSubtitulo);
          return;
        }
        if (g.phase === "dead") {
          drawEnd(assets.current!.catDead, textos.perdisteTitulo, textos.perdisteSubtitulo);
          return;
        }

        // Fondo blanco
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, W, H);

        // Estrellas flotantes
        const t = g.frame * 0.007;
        for (const s of stars.current) {
          const dy = Math.sin(t + s.phase) * 5;
          const alphaHex = Math.floor(s.alpha * 255).toString(16).padStart(2, "0");
          ctx.fillStyle = INK + alphaHex;
          ctx.beginPath();
          ctx.arc(s.x, s.y + dy, s.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Suelo
        ctx.fillStyle = INK;
        ctx.fillRect(0, groundLine, W, 1.5);
        for (let x = 8; x < W; x += 14) {
          ctx.fillStyle = INK + "28";
          ctx.fillRect(x, groundLine + 8, 3, 3);
        }

        // Gato
        const frame = g.phase === "running" ? Math.floor(g.frame / 7) % 2 : 0;
        ctx.drawImage(assets.current!.cat[frame], CAT_X, g.catY, CAT_W, CAT_H);

        // IDLE — la pista va junto al gato si cabe; en pantallas estrechas
        // (movil) no hay hueco a su lado, asi que baja centrada bajo el
        // titular en vez de salirse del canvas por la derecha.
        if (g.phase === "idle") {
          ctx.fillStyle = MUTED;
          ctx.font = `12px ${mono}`;
          const pista = textos.pistaJuego;
          const startX = CAT_X + CAT_W + 16;
          const cabeAlLado = startX + ctx.measureText(pista).width <= W - 16;
          if (cabeAlLado) {
            ctx.textAlign = "left";
            ctx.fillText(pista, startX, groundLine - 24);
          } else {
            ctx.textAlign = "center";
            fitFontSize(pista, 12, false, W - 32);
            ctx.fillText(pista, W / 2, Math.max(20, g.catY - 20));
          }
          return;
        }

        // RUNNING
        g.catVY += GRAVITY * dt;
        g.catY = Math.min(g.catY + g.catVY * dt, gy);
        if (g.catY >= gy) g.catVY = 0;

        g.score += dt;
        // Base mas baja (2.5, antes 4) para que el arranque de deje reaccionar.
        // La escala por ancho pasa de lineal a raiz cuadrada: en pantallas
        // anchas seguia siendo proporcionalmente mas rapido que en movil
        // (que es la idea, cruzar la pantalla tarda parecido), pero sin
        // disparar la velocidad x3-4 que hacia el juego imposible en desktop.
        g.speed = (2.5 + g.score / 400) * Math.sqrt(W / REF_WIDTH);

        if (g.score >= WIN_SCORE) { g.phase = "won"; return; }

        // Actualiza barra en DOM directamente (sin React re-render)
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${g.score / WIN_SCORE})`;
        }

        // Marcador — redondeado: g.score es fraccionario (avanza por dt, no
        // de uno en uno), asi que sin redondear se verian decimales.
        ctx.fillStyle = MUTED;
        ctx.font = `11px ${mono}`;
        ctx.textAlign = "right";
        ctx.fillText(`${textos.marcador} ${Math.round(g.score)}`, W - 16, 20);

        // Obstáculos — arrancan mas seguidos (100 frame-units, antes 155) y
        // la rampa de dificultad es mas pronunciada (entre score/9 y /7),
        // hasta un suelo mas bajo (45, antes 80): al principio se juega con
        // calma, y hacia el final salen casi encima unos de otros.
        const interval = Math.max(45, 100 - g.score / 9);
        if (g.frame - g.lastSpawn > interval) {
          const idx = Math.floor(Math.random() * OBS_DEFS.length);
          const [, w, h] = OBS_DEFS[idx];
          g.obstacles.push({ x: W + 10, img: assets.current!.obs[idx], w, h });
          g.lastSpawn = g.frame;
        }

        g.obstacles = g.obstacles.filter(o => o.x + o.w > -10);
        for (const o of g.obstacles) {
          o.x -= g.speed * dt;
          const oy = groundLine - o.h;
          ctx.drawImage(o.img, o.x, oy, o.w, o.h);
          if (
            CAT_X + CAT_W - 10 > o.x + 4 &&
            CAT_X + 10 < o.x + o.w - 4 &&
            g.catY + CAT_H - 6 > oy + 5 &&
            g.catY + 12 < oy + o.h
          ) { g.phase = "dead"; }
        }
      };

      g.frameId = requestAnimationFrame(tick);
    });

    const onKey   = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); interact(); }
    };

    window.addEventListener("keydown", onKey);
    // Solo "click": en tactil ya se dispara al tocar, y a diferencia de
    // touchstart con preventDefault no bloquea el scroll con el dedo.
    canvas.addEventListener("click", interact);

    return () => {
      cancelAnimationFrame(state.current.frameId);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", interact);
    };
    // "textos" viene de las traducciones del servidor y no cambia durante la
    // vida del componente (el idioma solo cambia navegando a otra URL), asi
    // que incluirlo en las dependencias no reinicia el juego en marcha.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interact, textos]);

  return (
    <section
      ref={sectionRef}
      className="hero-grain relative w-full border-b border-[#1A1A17] overflow-hidden"
      style={{ height: "clamp(420px, 60vh, 660px)" }}
    >
      {/* Canvas — ocupa todo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Overlay HTML — encima del canvas */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Título — zona superior, grande */}
        <div className="absolute top-[10vh] left-6 md:left-10 right-6 md:right-10">
          <motion.h1
            className="font-display font-bold leading-[0.95] text-ink"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {textos.titularPre}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {textos.titularFuerte}
              {/* Barra de progreso bajo la palabra — se llena mientras el gato corre */}
              <span
                ref={progressRef}
                className="absolute left-0 bottom-[0.04em] w-full"
                style={{
                  height: "0.12em",
                  background: ACCENT,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </span>{" "}
            {textos.titularPost}
          </motion.h1>
        </div>

        {/* Scroll hint — abajo izquierda */}
        <motion.a
          href="#sobre-mi"
          className="absolute bottom-8 left-6 md:bottom-10 md:left-10 font-mono text-xs uppercase tracking-widest text-ink/25 hover:text-ink/60 transition-colors pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↓ {textos.scroll}
        </motion.a>

      </div>
    </section>
  );
}
