"use client";

import { useId } from "react";
import { buildingLight, cityPhoto } from "@/lib/script";

/** One SVG coordinate system keeps each light on its facade on every screen.
 * The original photo also works without WebGL or a separate texture load. */
export function CityPhoto({ progress }: { progress: number }) {
  const id = useId().replaceAll(":", "");
  return (
    <svg className="city-photo" viewBox="0 0 492 730" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {cityPhoto.buildings.map((building, index) => (
          <clipPath id={`${id}-building-${index}`} key={building.name}><polygon points={building.outline} /></clipPath>
        ))}
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#0a0a0a" stopOpacity="0" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <image href={cityPhoto.photo} width="492" height="730" opacity="0.36" />
      {cityPhoto.buildings.map((building, index) => (
        <g key={building.name} className="city-building" style={{ opacity: buildingLight(progress, index) }}>
          <image href={cityPhoto.photo} width="492" height="730" clipPath={`url(#${id}-building-${index})`} />
          <polygon points={building.outline} fill="white" fillOpacity="0.09" stroke="white" strokeOpacity="0.28" strokeWidth="0.6" />
          <circle cx={building.x} cy={building.y} r="10" fill="#0a0a0a" stroke="#e5e5e5" strokeWidth="0.8" />
          <text x={building.x} y={building.y + 3.5} textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">{index + 1}</text>
        </g>
      ))}
      <rect width="492" height="730" fill={`url(#${id}-shade)`} />
    </svg>
  );
}
