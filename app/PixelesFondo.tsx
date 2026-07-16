"use client";

const pixeles = [
  { x: "8%", y: "12%", tam: 10, color: "#7A9201", delay: "0s", dur: "7s" },
  { x: "85%", y: "8%", tam: 14, color: "#71C1D0", delay: "1.2s", dur: "9s" },
  { x: "92%", y: "38%", tam: 8, color: "#7A9201", delay: "0.5s", dur: "8s" },
  { x: "4%", y: "55%", tam: 12, color: "#71C1D0", delay: "2s", dur: "10s" },
  { x: "78%", y: "62%", tam: 9, color: "#7A9201", delay: "0.8s", dur: "7.5s" },
  { x: "15%", y: "80%", tam: 7, color: "#71C1D0", delay: "1.6s", dur: "8.5s" },
  { x: "60%", y: "5%", tam: 6, color: "#7A9201", delay: "2.4s", dur: "9.5s" },
];

export default function PixelesFondo() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {pixeles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-[2px] opacity-40 animate-flotar"
          style={{
            left: p.x,
            top: p.y,
            width: p.tam,
            height: p.tam,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}