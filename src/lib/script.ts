import type { EventKind } from "./tokens";

/**
 * EL GUION DE SCROLL COMO DATOS.
 * Cada capítulo declara cuánto scroll ocupa (en alturas de viewport), su hora en la historia,
 * los textos de la pizarra y las notificaciones que suelta dentro de su pantalla.
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

/** esquina de la pantalla del capítulo donde aparecen sus notificaciones */
export type ToastCorner = "br" | "bl" | "tr" | "tl";

export interface LiveEvent {
  /** 0–1 dentro del capítulo: cuándo aparece la notificación */
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
  /**
   * altura total de la sección en vh. La pantalla va pegada durante `vh − 100` (ese es el tramo
   * que frota la timeline del capítulo); después se despega y sale con el scroll mientras entra la siguiente.
   */
  vh: number;
  /** notificaciones que suelta, dentro de su propia pantalla */
  events: LiveEvent[];
  /** esquina libre de ese capítulo para las notificaciones (por defecto, abajo a la derecha) */
  toasts?: ToastCorner;
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
    vh: 220,
    events: [{ at: 0.55, kind: "new", text: "Nuevo anuncio de particular", meta: "Oleiros · 07:40" }],
  },
  {
    id: "ciudad",
    slate: "02",
    hourStart: h(7, 40),
    hourEnd: h(7, 52),
    label: "LA CIUDAD",
    vh: 320,
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
    vh: 220,
    events: [{ at: 0.6, kind: "ok", text: "Teléfono capturado · Camino Rianxiño, 115", meta: "asignado a Ana" }],
    toasts: "bl",
  },
  {
    id: "catastro",
    slate: "03",
    hourStart: h(9, 15),
    hourEnd: h(11, 30),
    label: "CATASTRO",
    vh: 300,
    events: [
      { at: 0.26, kind: "ok", text: "Rastreo completo · Rolda de Nelle", meta: "38 fincas" },
      { at: 0.62, kind: "new", text: "Rastreo en curso · Oleiros", meta: "Marta · 10:40" },
    ],
    // arriba a la derecha: abajo va la lista de fincas y a la izquierda el historial de rastreos
    toasts: "tr",
  },
  {
    id: "seguimiento",
    slate: "04",
    hourStart: h(11, 30),
    hourEnd: h(13, 0),
    label: "INMUEBLES · DEMANDAS · SEGUIMIENTO",
    vh: 320,
    events: [
      { at: 0.45, kind: "ok", text: "Demanda coincidente · Familia López", meta: "Piso en calle de Posse" },
      { at: 0.8, kind: "new", text: "Solicitud de visita · Piso en calle de Posse", meta: "12:48" },
    ],
    toasts: "bl",
  },
  {
    id: "equipo",
    slate: "05",
    hourStart: h(13, 0),
    hourEnd: h(17, 0),
    label: "TAREAS · CALENDARIO · EQUIPO",
    vh: 280,
    events: [
      { at: 0.35, kind: "alert", text: "Bajada de precio · Dúplex en Cacheiras", meta: "Teo · −15.000 €" },
      { at: 0.75, kind: "ok", text: "Visita realizada · Luis", meta: "13:00 · calle de Posse" },
    ],
    toasts: "bl",
  },
  {
    id: "obra",
    slate: "06",
    hourStart: h(17, 0),
    hourEnd: h(20, 30),
    label: "PRESUPUESTOS · FACTURAS · INFORMES",
    vh: 300,
    events: [
      { at: 0.35, kind: "ok", text: "Presupuesto aceptado · PRS-2026-0001", meta: "74.536,00 €" },
      { at: 0.8, kind: "ok", text: "Factura cobrada · FAC-2026-0001", meta: "16:52" },
    ],
    toasts: "bl",
  },
  {
    id: "producto",
    slate: "07",
    hourStart: h(20, 30),
    hourEnd: h(23, 59),
    label: "TODO EL PRODUCTO",
    vh: 320,
    events: [],
  },
  {
    id: "manana",
    slate: "08",
    hourStart: h(6, 59),
    hourEnd: h(7, 0),
    label: "MAÑANA",
    vh: 160,
    events: [],
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
    title: "Casa en Camino Rianxiño, 115",
    zone: "Rianxo",
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

/** The photograph and building masks share one coordinate system (492 × 730).
 * Each facade lights completely before the next one. The notification follows all four.
 */
export const cityPhoto = {
  photo: "/city/captacion-reference-v1.jpg",
  width: 492,
  height: 730,
  buildings: [
    { name: "Torre oeste", x: 46, y: 108, outline: "0,8 67,17 83,32 95,308 18,325 0,308" },
    { name: "Torre central", x: 269, y: 88, outline: "236,52 258,46 281,53 295,149 235,144" },
    { name: "Edificio este", x: 402, y: 273, outline: "352,248 376,238 377,218 414,218 414,229 444,228 444,288 413,302 352,324" },
    { name: "Edificio de la oportunidad", x: 183, y: 378, outline: "72,307 94,293 137,298 233,266 252,276 319,269 320,416 294,429 291,472 258,489 91,477" },
  ],
};

export const citySequence = {
  lightAt: (index: number) => 0.08 + index * 0.145,
  lightDuration: 0.1,
  notificationAt: 0.74,
};

export function buildingLight(progress: number, index: number) {
  const t = Math.max(0, Math.min(1, (progress - citySequence.lightAt(index)) / citySequence.lightDuration));
  return t * t * (3 - 2 * t);
}
