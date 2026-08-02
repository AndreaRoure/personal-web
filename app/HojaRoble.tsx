export default function HojaRoble({
  tamano = 64,
  color = "#7A9201",
  opacidad = 1,
}: {
  tamano?: number;
  color?: string;
  opacidad?: number;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={tamano}
      height={tamano}
      style={{ opacity: opacidad }}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <g fill={color}>
        <rect x="7" y="1" width="2" height="1" />
        <rect x="6" y="2" width="4" height="1" />
        <rect x="5" y="3" width="6" height="1" />
        <rect x="6" y="4" width="4" height="1" />
        <rect x="4" y="5" width="8" height="1" />
        <rect x="3" y="6" width="10" height="1" />
        <rect x="5" y="7" width="6" height="1" />
        <rect x="3" y="8" width="10" height="1" />
        <rect x="4" y="9" width="8" height="1" />
        <rect x="6" y="10" width="4" height="1" />
        <rect x="5" y="11" width="6" height="1" />
        <rect x="7" y="12" width="2" height="1" />
        <rect x="7" y="13" width="2" height="2" />
      </g>
    </svg>
  );
}