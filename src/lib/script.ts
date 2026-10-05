import type { EventKind } from "./tokens";

/**
 * EL GUION DE SCROLL COMO DATOS.
 * Cada capítulo declara cuánto scroll ocupa (en alturas de viewport), su hora en la historia,
 * los textos de la pizarra y los eventos que suelta en la bandeja de notificaciones.
 * Cambiar un texto, una hora o la duración de un tramo es tocar una línea aquí.
 */

export type ChapterId =
  | "prologo"
  | "radar"
  | "ciudad"
  | "bandeja"
  | "catastro"
  | "seguimiento"
  | "equipo"
  | "obra"
  | "producto"
  | "manana";

export interface LiveEvent {
  /** 0–1 dentro del capítulo: cuándo entra en la bandeja */
  at: number;
  kind: EventKind;
  text: string;
  meta: string;
}

export interface Chapter {
  id: ChapterId;
  /** número de pizarra (01–08); varios capítulos pueden compartirlo */
  slate: string;
  /** hora al empezar el tramo, en minutos desde las 00:00 */
  hourStart: number;
  /** hora al terminar el tramo */
  hourEnd: number;
  label: string;
  /** altura total del tramo en vh (incluye la pantalla pinned) */
  vh: number;
  /** eventos que suelta en la bandeja */
  events: LiveEvent[];
}

const h = (hh: number, mm: number) => hh * 60 + mm;

export const chapters: Chapter[] = [
  {
    id: "prologo",
    slate: "00",
    hourStart: h(6, 59),
    hourEnd: h(7, 0),
    label: "PRÓLOGO",
    vh: 170,
    events: [],
  },
  {
    id: "radar",
    slate: "01",
    hourStart: h(7, 0),
    hourEnd: h(7, 40),
    label: "EL RADAR",
    vh: 180,
    events: [{ at: 0.55, kind: "new", text: "Nuevo anuncio de particular", meta: "Oleiros · 07:40" }],
  },
  {
    id: "ciudad",
    slate: "02",
    hourStart: h(7, 40),
    hourEnd: h(7, 52),
    label: "LA CIUDAD",
    vh: 260,
    events: [
      { at: 0.3, kind: "ok", text: "Nuevo inmueble de particular · Plaza de Castilla", meta: "92 m² · 260.000 €" },
      { at: 0.65, kind: "alert", text: "Agencia encubierta detectada · Barrio Sur", meta: "id.111647374" },
    ],
  },
  {
    id: "bandeja",
    slate: "02",
    hourStart: h(7, 52),
    hourEnd: h(9, 15),
    label: "CAPTACIÓN",
    vh: 180,
    events: [{ at: 0.6, kind: "ok", text: "Teléfono capturado · Camino Rianxiño, 115", meta: "asignado a Ana" }],
  },
  {
    id: "catastro",
    slate: "03",
    hourStart: h(9, 15),
    hourEnd: h(11, 30),
    label: "CATASTRO",
    vh: 240,
    events: [
      { at: 0.4, kind: "ok", text: "Rastreo CP 15009 · 85 candidatas", meta: "378 fincas" },
      { at: 0.85, kind: "ok", text: "Nota simple solicitada", meta: "Rianxo · 09:17" },
    ],
  },
  {
    id: "seguimiento",
    slate: "04",
    hourStart: h(11, 30),
    hourEnd: h(13, 0),
    label: "SEGUIMIENTO",
    vh: 240,
    events: [
      { at: 0.45, kind: "ok", text: "Demanda coincidente · Familia López", meta: "Piso en calle de Posse" },
      { at: 0.8, kind: "new", text: "Solicitud de visita · Piso en calle de Posse", meta: "12:48" },
    ],
  },
  {
    id: "equipo",
    slate: "05",
    hourStart: h(13, 0),
    hourEnd: h(17, 0),
    label: "EQUIPO",
    vh: 220,
    events: [
      { at: 0.35, kind: "alert", text: "Bajada de precio · Dúplex en Cacheiras", meta: "Teo · −15.000 €" },
      { at: 0.75, kind: "ok", text: "Visita realizada · Luis", meta: "13:00 · calle de Posse" },
    ],
  },
  {
    id: "obra",
    slate: "06",
    hourStart: h(17, 0),
    hourEnd: h(20, 30),
    label: "OBRA",
    vh: 220,
    events: [
      { at: 0.35, kind: "ok", text: "Presupuesto aceptado · PRS-2026-0001", meta: "74.536,00 €" },
      { at: 0.8, kind: "ok", text: "Factura cobrada · FAC-2026-0001", meta: "16:52" },
    ],
  },
  {
    id: "producto",
    slate: "07",
    hourStart: h(20, 30),
    hourEnd: h(23, 59),
    label: "PRODUCTO",
    vh: 200,
    events: [],
  },
  {
    id: "manana",
    slate: "08",
    hourStart: h(6, 59),
    hourEnd: h(7, 0),
    label: "MAÑANA",
    vh: 140,
    events: [{ at: 0.3, kind: "new", text: "Nuevo anuncio de particular", meta: "07:40 · mañana" }],
  },
];

export const chapterIndex = Object.fromEntries(chapters.map((c, i) => [c.id, i])) as Record<ChapterId, number>;

export function formatHour(minutes: number) {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const hh = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Los 40 anuncios de muestra que se encienden en la ciudad y aterrizan en la bandeja. */
export interface Listing {
  id: string;
  title: string;
  zone: string;
  portal: string;
  m2: number;
  rooms: number;
  baths: number;
  price: number;
  kind: "particular" | "agencia" | "encubierta";
  phone: "capturado" | "solo mensaje" | "en cola";
  /** posición en la ciudad, en celdas (x, z) */
  cell: [number, number];
}

const zones = ["Plaza de Castilla", "Avenida del Norte", "Barrio Sur", "Centro", "La Ría", "Las Huertas", "El Mirador", "Puerto"];
const types = ["Piso", "Ático", "Casa", "Dúplex", "Bajo con jardín", "Estudio"];
const portals = ["idealista", "fotocasa", "habitaclia", "pisos.com", "milanuncios"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export const listings: Listing[] = (() => {
  const r = seeded(7);
  const out: Listing[] = [];
  for (let i = 0; i < 40; i++) {
    const kindRoll = r();
    const kind = kindRoll < 0.72 ? "particular" : kindRoll < 0.92 ? "agencia" : "encubierta";
    const phoneRoll = r();
    const m2 = 55 + Math.round(r() * 160);
    out.push({
      id: String(96000000 + Math.round(r() * 17000000)),
      title: `${types[Math.floor(r() * types.length)]} en ${zones[i % zones.length]}`,
      zone: zones[i % zones.length],
      portal: portals[Math.floor(r() * portals.length)],
      m2,
      rooms: 1 + Math.floor(r() * 4),
      baths: 1 + Math.floor(r() * 2),
      price: Math.round((1200 + r() * 2400) * m2 / 1000) * 1000,
      kind,
      phone: kind === "particular" ? (phoneRoll < 0.8 ? "capturado" : "solo mensaje") : phoneRoll < 0.5 ? "en cola" : "solo mensaje",
      cell: [Math.floor(r() * 16) - 8, Math.floor(r() * 16) - 8],
    });
  }
  // El 3º izquierda: protagonista, siempre el primero y siempre igual
  out[0] = {
    id: "112726572",
    title: "Nuevo inmueble en Plaza de Castilla",
    zone: "Plaza de Castilla",
    portal: "idealista",
    m2: 92,
    rooms: 3,
    baths: 2,
    price: 260000,
    kind: "particular",
    phone: "capturado",
    cell: [0, 0],
  };
  // Los tres siguientes llevan tarjeta: van al centro y la derecha, lejos del texto del capítulo
  out[1] = { ...out[1], title: "Piso en Avenida del Norte, 6", m2: 235, rooms: 4, baths: 2, price: 450000, kind: "particular", phone: "capturado", cell: [6, -5] };
  out[2] = { ...out[2], title: "Dúplex en Barrio Sur", m2: 132, rooms: 3, baths: 2, price: 280000, kind: "encubierta", phone: "en cola", cell: [8, 4] };
  out[3] = { ...out[3], title: "Ático en el Centro", m2: 88, rooms: 2, baths: 1, price: 199000, kind: "particular", phone: "solo mensaje", cell: [1, 6] };
  return out;
})();

export const euro = (n: number) => n.toLocaleString("es-ES") + " €";

/**
 * LA CIUDAD 2.5D (capítulo 02).
 * Tres imágenes del mismo encuadre: la ciudad apagada, la ciudad con los edificios protagonistas encendidos
 * y el mapa de profundidad. El canvas las desplaza con el scroll (parallax real por profundidad),
 * enciende cada edificio con una máscara circular en coordenadas (u, v) de la imagen y cuelga ahí su tarjeta.
 *
 * Para sustituir las imágenes de relleno:
 *  1. Genera `base.jpg` (2048×1152, B/N, ciudad nocturna, un edificio medio en primer plano a la derecha).
 *  2. Pide al editor de imagen la MISMA toma con las ventanas de ese edificio encendidas → `lit.jpg`.
 *  3. Saca el mapa de profundidad de base.jpg (Depth Anything v2, Marigold o el filtro de profundidad de Photoshop) → `depth.png`.
 *  4. Mide en la imagen el centro de cada edificio (u = x/ancho, v = y/alto) y anótalo aquí.
 */
export interface CityAnchor {
  /** índice en `listings` */
  listing: number;
  u: number;
  v: number;
  /** radio de la zona que se enciende, en fracción del ancho de la imagen */
  r: number;
  /** hacia dónde se despliega la tarjeta */
  side: "left" | "right";
}

export const cityPhoto = {
  base: "city/base.jpg",
  lit: "city/lit.jpg",
  depth: "city/depth.png",
  aspect: 2048 / 1152,
  /** cuánto se hunde la imagen según la profundidad (unidades de escena) */
  depthStrength: 1.6,
  anchors: [
    { listing: 0, u: 0.58, v: 0.4, r: 0.045, side: "right" },
    { listing: 1, u: 0.22, v: 0.52, r: 0.035, side: "right" },
    { listing: 2, u: 0.82, v: 0.48, r: 0.035, side: "left" },
    { listing: 3, u: 0.42, v: 0.66, r: 0.03, side: "right" },
  ] as CityAnchor[],
  /** puntos secundarios que se encienden en blanco, sin tarjeta (u, v) */
  sparks: [
    [0.12, 0.5], [0.2, 0.46], [0.38, 0.48], [0.52, 0.42], [0.66, 0.5], [0.72, 0.44], [0.9, 0.5], [0.08, 0.56],
    [0.27, 0.55], [0.6, 0.56], [0.78, 0.55], [0.95, 0.46], [0.42, 0.6], [0.86, 0.6], [0.15, 0.62], [0.55, 0.65],
  ] as [number, number][],
};
