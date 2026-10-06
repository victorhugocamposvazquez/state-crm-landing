/**
 * PLANES.
 * Todo lo que enseña la sección de planes sale de aquí: tres planes mensuales, qué incluye cada
 * uno y qué módulo entra en qué plan. Precios orientativos (oct 2026): de 250 € al mes el más
 * básico a 1.250 € el completo con todas las opciones. Cambiar un precio o una línea es tocarla aquí.
 */

export type PlanId = "captacion" | "catastro" | "completo";

export interface PlanItem {
  title: string;
  text: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  /** precio mensual, tal como se muestra */
  price: string;
  unit: string;
  /** qué incluye, explicado; el primer punto resume lo heredado del plan anterior */
  items: PlanItem[];
  /** plan recomendado */
  highlight?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    id: "captacion",
    name: "Captación",
    price: "250 €",
    unit: "/ mes",
    items: [
      { title: "Captación diaria de particulares", text: "Rastreo de los portales cada mañana en tus zonas, con ficha completa y teléfono." },
      { title: "Bandeja de novedades", text: "Lo que entra hoy, con prioridad, asignación a un comercial y avisos de subidas y bajadas de precio." },
      { title: "Inmuebles, demandas y seguimiento", text: "La cartera, lo que buscan los clientes cruzado solo, y cada operación por etapas." },
      { title: "Tareas y calendario", text: "El trabajo del equipo repartido y a la vista, también en el móvil sin instalar nada." },
      { title: "Usuarios ilimitados y soporte directo", text: "Toda la agencia entra con la cuota; hablas con quien ha construido tu CRM." },
    ],
  },
  {
    id: "catastro",
    name: "Catastro",
    price: "650 €",
    unit: "/ mes",
    highlight: true,
    badge: "Recomendado",
    items: [
      { title: "Todo el plan Captación", text: "Captación diaria, bandeja, inmuebles, demandas, seguimiento, tareas y calendario." },
      { title: "Catastro: rastreos por calle, código postal o localidad", text: "Se pausan, se reanudan y quedan en un historial con quién lanzó cada uno." },
      { title: "Fincas con y sin división horizontal", text: "Edificios divididos en pisos y locales, y fincas de una sola pieza: casas, naves y solares." },
      { title: "Detección de agencias encubiertas", text: "Señala los anuncios de agencias que se hacen pasar por particulares." },
      { title: "Varias oficinas", text: "Cada oficina con su agenda; todas en el mismo calendario." },
    ],
  },
  {
    id: "completo",
    name: "Completo",
    price: "1.250 €",
    unit: "/ mes",
    items: [
      { title: "Todo el plan Catastro", text: "Captación, catastro, encubiertas y varias oficinas." },
      { title: "Presupuestos por partidas", text: "Con estados, total y tasa de aceptación, dentro de la ficha del piso." },
      { title: "Facturas con estado de cobro", text: "El presupuesto aceptado pasa a factura en un clic, con su PDF, enlazada al inmueble y al cliente." },
      { title: "Informes por oficina y operación", text: "Captación, seguimiento y obra en una misma vista." },
      { title: "Herramientas de la agencia a medida", text: "Las utilidades propias de tu agencia, construidas dentro del CRM." },
    ],
  },
];

/** Qué módulo entra en qué plan: la tabla de la sección. */
export interface PlanRow {
  module: string;
  in: Record<PlanId, boolean>;
}

const row = (module: string, from: PlanId): PlanRow => ({
  module,
  in: {
    captacion: from === "captacion",
    catastro: from !== "completo",
    completo: true,
  },
});

export const planRows: PlanRow[] = [
  row("Captación diaria de particulares", "captacion"),
  row("Bandeja de novedades, teléfono y prioridad", "captacion"),
  row("Subidas y bajadas de precio", "captacion"),
  row("Inmuebles y demandas cruzadas", "captacion"),
  row("Seguimiento por etapas y clientes", "captacion"),
  row("Tareas y calendario compartido", "captacion"),
  row("Móvil sin instalar nada", "captacion"),
  row("Usuarios ilimitados y soporte directo", "captacion"),
  row("Catastro: rastreos por calle, código postal o localidad", "catastro"),
  row("Fincas con y sin división horizontal", "catastro"),
  row("Detección de agencias encubiertas", "catastro"),
  row("Varias oficinas", "catastro"),
  row("Presupuestos por partidas", "completo"),
  row("Facturas y estado de cobro", "completo"),
  row("Informes por oficina y operación", "completo"),
  row("Herramientas de la agencia a medida", "completo"),
];

/** Lo que va aparte de la cuota. */
export const planNotes = [
  "Precios orientativos, sin IVA.",
  "La puesta en marcha (configuración de los módulos, migración de tu cartera y formación del equipo) se presupuesta aparte según el tamaño de la agencia.",
];
