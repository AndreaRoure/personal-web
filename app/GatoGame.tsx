"use client";
import { useEffect, useRef, useCallback } from "react";

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

// Cara gato muerto — solo cabeza, ojos XX
const CAT_DEAD_SVG = `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
  <polygon points="12,26 17,8 25,25" fill="#2B3300"/>
  <polygon points="35,25 43,8 48,26" fill="#2B3300"/>
  <circle cx="30" cy="34" r="20" fill="#2B3300"/>
  <line x1="19" y1="27" x2="26" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="26" y1="27" x2="19" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="34" y1="27" x2="41" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="41" y1="27" x2="34" y2="34" stroke="#F2F5E4" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

// Cara gato vivo — solo cabeza, ojos corazón
const CAT_WON_SVG = `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
  <polygon points="12,26 17,8 25,25" fill="#2B3300"/>
  <polygon points="35,25 43,8 48,26" fill="#2B3300"/>
  <circle cx="30" cy="34" r="20" fill="#2B3300"/>
  <text x="22" y="35" fill="#F2F5E4" font-size="12" text-anchor="middle" font-family="serif">♥</text>
  <text x="38" y="35" fill="#F2F5E4" font-size="12" text-anchor="middle" font-family="serif">♥</text>
</svg>`;

// Obstáculos
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
const CAT_W    = 65;
const CAT_H    = 52;
const CANVAS_H = 130;
const GROUND_H = 28;
const CAT_X    = 60;
const GRAVITY  = 0.56;
const JUMP_V   = -12.5;
const WIN_SCORE = 800;

const INK    = "#2B3300";
const ACCENT = "#7A9201";
const CREMA  = "#F2F5E4";
const MUTED  = "#2B3300AA";

// ── Componente ────────────────────────────────────────────────────────────────
export default function GatoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assets = useRef<{
    cat: [HTMLImageElement, HTMLImageElement];
    catWon: HTMLImageElement;
    catDead: HTMLImageElement;
    obs: HTMLImageElement[];
  } | null>(null);

  const s = useRef({
    phase: "idle" as Phase,
    catY: 0, catVY: 0,
    obstacles: [] as { x: number; img: HTMLImageElement; w: number; h: number }[],
    score: 0, speed: 3.5, frame: 0, frameId: 0, lastSpawn: 0,
  });

  const groundY = (H: number) => H - GROUND_H - CAT_H;

  const interact = useCallback(() => {
    const g = s.current;
    const canvas = canvasRef.current;
    if (!canvas || !assets.current) return;
    const gy = groundY(canvas.height);

    if (g.phase === "idle")    { g.phase = "running"; g.catVY = JUMP_V; return; }
    if (g.phase === "running") { if (g.catY >= gy - 1) g.catVY = JUMP_V; return; }
    if (g.phase === "dead" || g.phase === "won") {
      Object.assign(g, { phase: "running", catY: gy, catVY: JUMP_V,
        obstacles: [], score: 0, speed: 3.5, frame: 0, lastSpawn: 0 });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = Math.min(canvas.parentElement?.clientWidth ?? 640, 720);
      canvas.height = CANVAS_H;
    };
    resize();
    window.addEventListener("resize", resize);

    const g = s.current;
    const mono = "'IBM Plex Mono', monospace";

    const drawEndScreen = (
      img: HTMLImageElement, imgW: number, imgH: number,
      title: string, subtitle: string
    ) => {
      const W = canvas.width;
      const H = canvas.height;
      // Fondo
      ctx.fillStyle = CREMA;
      ctx.fillRect(0, 0, W, H);
      // Gato centrado arriba
      const cx = W / 2 - imgW / 2;
      ctx.drawImage(img, cx, 8, imgW, imgH);
      // Texto
      ctx.textAlign = "center";
      ctx.fillStyle = INK;
      ctx.font = `bold 15px ${mono}`;
      ctx.fillText(title, W / 2, imgH + 20);
      ctx.fillStyle = ACCENT;
      ctx.font = `11px ${mono}`;
      ctx.fillText(subtitle, W / 2, imgH + 38);
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

      const tick = () => {
        g.frameId = requestAnimationFrame(tick);
        g.frame++;
        const W = canvas.width;
        const H = canvas.height;
        const gy = groundY(H);

        // ── WON ──
        if (g.phase === "won") {
          drawEndScreen(assets.current!.catWon, 68, 62,
            "Tu curiosidad salvó al gato",
            "[ espacio · tap → jugar de nuevo ]"
          );
          return;
        }

        // ── DEAD ──
        if (g.phase === "dead") {
          drawEndScreen(assets.current!.catDead, 68, 62,
            "Te falta curiosidad para salvar al gato",
            "[ espacio · tap → intentarlo de nuevo ]"
          );
          return;
        }

        // Fondo + suelo
        ctx.fillStyle = CREMA;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = INK;
        ctx.fillRect(0, H - GROUND_H, W, 2);
        for (let x = 8; x < W; x += 14) {
          ctx.fillStyle = INK + "33";
          ctx.fillRect(x, H - GROUND_H + 7, 3, 3);
        }
        // Estrellas decorativas (posiciones fijas basadas en W)
        const stars = [0.12, 0.28, 0.45, 0.62, 0.78, 0.91].map((rx, i) => ({
          x: rx * W, y: 14 + (i % 3) * 10,
        }));
        ctx.fillStyle = INK + "55";
        for (const star of stars) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Gato
        const frame = g.phase === "running" ? Math.floor(g.frame / 8) % 2 : 0;
        ctx.drawImage(assets.current!.cat[frame], CAT_X, g.catY, CAT_W, CAT_H);

        // ── IDLE ──
        if (g.phase === "idle") {
          ctx.fillStyle = MUTED;
          ctx.font = `11px ${mono}`;
          ctx.textAlign = "left";
          ctx.fillText("espacio · tap → salvar al gato", CAT_X + CAT_W + 10, gy + CAT_H * 0.55);
          return;
        }

        // ── RUNNING ──
        g.catVY += GRAVITY;
        g.catY = Math.min(g.catY + g.catVY, gy);
        if (g.catY >= gy) g.catVY = 0;

        g.score++;
        g.speed = 3.5 + g.score / 320;

        // ¿Ganó?
        if (g.score >= WIN_SCORE) { g.phase = "won"; return; }

        // Barra de progreso
        const progress = g.score / WIN_SCORE;
        ctx.fillStyle = INK + "22";
        ctx.fillRect(12, 8, W - 24, 4);
        ctx.fillStyle = ACCENT;
        ctx.fillRect(12, 8, (W - 24) * progress, 4);

        // Spawn obstáculos
        const interval = Math.max(52, 105 - g.score / 7);
        if (g.frame - g.lastSpawn > interval) {
          const idx = Math.floor(Math.random() * OBS_DEFS.length);
          const [, w, h] = OBS_DEFS[idx];
          g.obstacles.push({ x: W + 10, img: assets.current!.obs[idx], w, h });
          g.lastSpawn = g.frame;
        }

        g.obstacles = g.obstacles.filter(o => o.x + o.w > -10);
        for (const o of g.obstacles) {
          o.x -= g.speed;
          const oy = H - GROUND_H - o.h;
          ctx.drawImage(o.img, o.x, oy, o.w, o.h);

          if (
            CAT_X + CAT_W - 10 > o.x + 4 &&
            CAT_X + 10 < o.x + o.w - 4 &&
            g.catY + CAT_H - 6 > oy + 5 &&
            g.catY + 12 < oy + o.h
          ) { g.phase = "dead"; }
        }

        // Marcador
        ctx.fillStyle = MUTED;
        ctx.font = `11px ${mono}`;
        ctx.textAlign = "right";
        ctx.fillText(`curiosidad × ${g.score}`, W - 12, 18);
      };

      g.frameId = requestAnimationFrame(tick);
    });

    const onKey   = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); interact(); }
    };
    const onTouch = (e: TouchEvent) => { e.preventDefault(); interact(); };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("click", interact);
    canvas.addEventListener("touchstart", onTouch, { passive: false });

    return () => {
      cancelAnimationFrame(s.current.frameId);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", interact);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, [interact]);

  return (
    <div
      className="mt-6 animate-aparecer border border-[#1A1A17] rounded-sm overflow-hidden"
      style={{ animationDelay: "0.5s" }}
    >
      <canvas ref={canvasRef} className="w-full cursor-pointer block" />
    </div>
  );
}
