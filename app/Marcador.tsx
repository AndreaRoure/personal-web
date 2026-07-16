export default function Marcador({
  children,
  color = "lima",
}: {
  children: React.ReactNode;
  color?: "lima" | "cielo";
}) {
  const colores = {
    lima: "bg-accent/30",
    cielo: "bg-sky/40",
  };
  return (
    <mark className={`${colores[color]} text-ink px-1.5 py-0.5 rounded-md box-decoration-clone`}>
      {children}
    </mark>
  );
}