/**
 * Mapa de calles abstracto (manzanas, avenidas, una plaza y un parque) en SVG.
 * Cada manzana lleva su zona (código postal o calle) para que el Catastro las encienda por tramos.
 * Se usa inclinado en CSS 3D; las etiquetas van fuera, en una capa plana.
 */

export type Zone = "15001" | "15009" | "15005" | "nelle";

export const blocks: { x: number; y: number; w: number; h: number; zone: Zone; hero?: boolean }[] = [
  // fila 1 (norte): 15001 a la izquierda, 15005 a la derecha
  { x: 40, y: 40, w: 150, h: 110, zone: "15001" },
  { x: 210, y: 40, w: 120, h: 110, zone: "15001" },
  { x: 350, y: 40, w: 200, h: 60, zone: "15001" },
  { x: 350, y: 120, w: 90, h: 30, zone: "15001" },
  { x: 460, y: 120, w: 90, h: 30, zone: "15001" },
  { x: 580, y: 40, w: 130, h: 110, zone: "15005" },
  { x: 730, y: 40, w: 180, h: 50, zone: "15005" },
  { x: 730, y: 110, w: 80, h: 40, zone: "15005" },
  { x: 830, y: 110, w: 80, h: 40, zone: "15005" },
  { x: 940, y: 40, w: 220, h: 110, zone: "15005" },
  // fila 2
  { x: 40, y: 180, w: 80, h: 140, zone: "15001" },
  { x: 140, y: 180, w: 190, h: 140, zone: "15001" },
  { x: 350, y: 180, w: 200, h: 140, zone: "15009" },
  { x: 580, y: 180, w: 60, h: 140, zone: "15009" },
  { x: 660, y: 180, w: 250, h: 60, zone: "15009" },
  { x: 660, y: 260, w: 110, h: 60, zone: "15009", hero: true },
  { x: 800, y: 260, w: 110, h: 60, zone: "15009" },
  { x: 940, y: 180, w: 100, h: 140, zone: "15005" },
  { x: 1060, y: 180, w: 100, h: 140, zone: "15005" },
  // fila 3 (alrededor de la plaza)
  { x: 40, y: 350, w: 290, h: 90, zone: "nelle" },
  { x: 40, y: 460, w: 130, h: 80, zone: "nelle" },
  { x: 190, y: 460, w: 140, h: 80, zone: "nelle" },
  { x: 350, y: 350, w: 90, h: 190, zone: "15009" },
  { x: 460, y: 350, w: 90, h: 190, zone: "15009" },
  { x: 940, y: 350, w: 220, h: 80, zone: "15005" },
  { x: 940, y: 460, w: 100, h: 80, zone: "15005" },
  { x: 1060, y: 460, w: 100, h: 80, zone: "15005" },
  // fila 4
  { x: 40, y: 570, w: 150, h: 130, zone: "nelle" },
  { x: 210, y: 570, w: 120, h: 130, zone: "nelle" },
  { x: 350, y: 570, w: 200, h: 130, zone: "15009" },
  { x: 580, y: 570, w: 130, h: 130, zone: "15009" },
  { x: 730, y: 570, w: 180, h: 60, zone: "15009" },
  { x: 730, y: 650, w: 180, h: 50, zone: "15009" },
  { x: 940, y: 570, w: 220, h: 130, zone: "15005" },
  // fila 5 (sur)
  { x: 40, y: 730, w: 290, h: 130, zone: "nelle" },
  { x: 350, y: 730, w: 90, h: 130, zone: "nelle" },
  { x: 460, y: 730, w: 90, h: 130, zone: "nelle" },
  { x: 580, y: 730, w: 330, h: 130, zone: "15009" },
  { x: 940, y: 730, w: 220, h: 130, zone: "15005" },
];

export function StreetMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 900" fill="none" aria-hidden="true" className={className} style={{ width: "100%", height: "100%" }}>
      <g>
        {blocks.map((b, i) => (
          <rect
            key={i}
            className={`blk z-${b.zone}${b.hero ? " blk-hero" : ""}`}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="#121212"
            stroke="#1F1F1F"
            strokeWidth="1"
          />
        ))}
      </g>
      {/* plaza */}
      <circle cx="760" cy="440" r="95" fill="#101010" stroke="#2A2A2A" />
      <circle cx="760" cy="440" r="60" fill="#0E0E0E" stroke="#1F1F1F" />
      <circle className="plaza-core" cx="760" cy="440" r="14" fill="#141414" stroke="#3A3A3A" />
      {/* avenidas */}
      <g stroke="#2E2E2E" strokeWidth="2">
        <path d="M0 165 H1200" />
        <path d="M0 555 H1200" />
        <path d="M565 0 V900" />
        <path d="M925 0 V900" />
        <path d="M0 900 L 565 335" />
        <path d="M1200 900 L 925 555" />
      </g>
      <g stroke="#262626" strokeWidth="1.2">
        <path d="M760 345 V0" />
        <path d="M760 535 V900" />
        <path d="M665 440 H565" />
        <path d="M855 440 H925" />
      </g>
      {/* parque */}
      <path d="M590 180 h40 v140 h-40z" fill="#0F130F" stroke="#1C241C" />
      <g fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="11" fill="#3A3A3A">
        <text x="740" y="615">Plaza de Castilla</text>
        <text x="60" y="170">Avenida del Norte</text>
        <text x="1000" y="750">Barrio Sur</text>
        <text x="120" y="420">Rolda de Nelle</text>
      </g>
    </svg>
  );
}
