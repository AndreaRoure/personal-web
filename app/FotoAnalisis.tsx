const LABELS = [
  { text: "Curiosidad: 100%", top: "20%", left: "6%",  width: "60%", height: "35%" },
  { text: "Naturaleza: 80%",  top: "4%",  left: "40%", width: "56%", height: "44%" },
  { text: "Analógica: 94%",   top: "2%",  left: "4%",  width: "52%", height: "26%" },
  { text: "Observadora: 88%", top: "40%", left: "16%", width: "46%", height: "22%" },
  { text: "Música: 100%",     top: "62%", left: "4%",  width: "46%", height: "22%" },
  { text: "Urbana: 50%",      top: "57%", left: "36%", width: "56%", height: "26%" },
  { text: "Encorsetable: 3%", top: "78%", left: "8%",  width: "60%", height: "18%" },
  { text: "Tech: 90%",         top: "46%", left: "58%", width: "38%", height: "18%" },
];

const C = "#DC4632";

export default function FotoAnalisis() {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
      <img
        src="/andrea-about.jpg"
        alt="Andrea Robles"
        className="w-full h-full object-cover object-top grayscale contrast-110"
      />
      {LABELS.map((l, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: l.top, left: l.left, width: l.width, height: l.height, border: `1.5px solid ${C}` }}
        >
          <span
            className="absolute top-0 left-0 font-mono leading-none px-1 py-0.5 text-white whitespace-nowrap"
            style={{ backgroundColor: C, fontSize: "10px" }}
          >
            {l.text}
          </span>
        </div>
      ))}
    </div>
  );
}
