/**
 * LOS TEXTOS DE CADA MÓDULO.
 * Debajo de la pantalla animada de cada capítulo entra un bloque en flujo normal que explica el
 * módulo sin prisa pero sin enciclopedia: un titular, un párrafo y cuatro puntos de una línea.
 * Cambiar un texto es tocar una línea aquí; el componente es ModuleText.
 */

export type ModuleTextId = "captacion" | "catastro" | "seguimiento" | "equipo" | "obra" | "plataforma";

export interface ModuleFeature {
  title: string;
  text: string;
}

export interface ModuleText {
  id: ModuleTextId;
  /** nombre del módulo, tal como aparece en el CRM */
  module: string;
  /** qué es, en cuatro palabras */
  what: string;
  /** titular del bloque: qué hace, en una frase */
  title: string;
  /** un párrafo: para qué sirve en el día a día */
  body: string;
  /** qué incluye: cuatro puntos, una línea cada uno */
  features: ModuleFeature[];
}

export const moduleTexts: Record<ModuleTextId, ModuleText> = {
  captacion: {
    id: "captacion",
    module: "Captación",
    what: "anuncios de particulares, cada mañana",
    title: "Captura cada mañana los anuncios de particulares, con teléfono, antes de que abra la oficina.",
    body:
      "Cada mañana statecrm rastrea los portales en tus zonas y guarda cada anuncio nuevo de particular con precio, metros, fotos y teléfono. Distingue particular, agencia y agencia encubierta, y lo que entra se asigna a un comercial.",
    features: [
      { title: "Rastreo diario por zona", text: "Ciudades, barrios o códigos postales, los que tú marques." },
      { title: "Ficha completa y teléfono", text: "Precio, metros, habitaciones, fotos y el teléfono cuando el portal lo muestra." },
      { title: "Agencias encubiertas", text: "Señala a las agencias que se anuncian como particulares." },
      { title: "Prioridad y asignación", text: "Cada novedad con responsable, y aviso si cambia de precio." },
    ],
  },
  catastro: {
    id: "catastro",
    module: "Catastro",
    what: "la finca real detrás de cada anuncio",
    title: "Vincula cada anuncio a su finca real y pide la nota simple sin salir del CRM.",
    body:
      "El Catastro va por libre: no hace falta un anuncio para usarlo. statecrm rastrea una zona por calle o código postal, separa las fincas candidatas y, cuando toca, vincula un inmueble a su referencia. Lo que encuentra pasa a tareas, seguimiento y equipo comercial; la nota simple se pide desde la misma ficha.",
    features: [
      { title: "Rastreos por calle o código postal", text: "Se pausan, se reanudan y quedan en un historial." },
      { title: "Fincas candidatas", text: "Las que encajan con el anuncio, por zona y por comercial." },
      { title: "Vinculación catastral", text: "Referencia, superficie, año y uso en la ficha del piso." },
      { title: "Nota simple", text: "Solicitada sin salir del inmueble." },
    ],
  },
  seguimiento: {
    id: "seguimiento",
    module: "Inmuebles · Demandas · Seguimiento",
    what: "tu cartera, tus clientes y cada operación",
    title: "Cruza cada piso nuevo con lo que buscan tus clientes y avisa al comercial en el momento.",
    body:
      "La cartera, las demandas de los clientes y cada operación, conectadas con la captación. Cuando entra un piso que encaja con una demanda, el CRM avisa al comercial; a partir de ahí la operación avanza por etapas: captado, contacto, visita, oferta, reserva.",
    features: [
      { title: "Inmuebles", text: "Referencia propia, estado, comercial y vínculo con el catastro." },
      { title: "Demandas", text: "Tipo, habitaciones, presupuesto y zona, cruzadas solas con el stock." },
      { title: "Seguimiento por etapas", text: "Las etapas que tú definas, con llamadas, visitas y documentos." },
      { title: "Clientes", text: "Compradores y propietarios en un mismo hilo." },
    ],
  },
  equipo: {
    id: "equipo",
    module: "Tareas · Calendario",
    what: "el trabajo de todo el equipo, a la vista",
    title: "Reparte el trabajo del día y pone visitas, firmas y llamadas en un calendario que ve todo el equipo.",
    body:
      "Las tareas del día tienen responsable, prioridad y hora. Las visitas, firmas y llamadas van a un calendario compartido, con varias oficinas si las hay. Y funciona en el móvil del comercial sin instalar nada.",
    features: [
      { title: "Tareas personales y del equipo", text: "Con prioridad, responsable y hora." },
      { title: "Calendario compartido", text: "Visitas, firmas y llamadas en su franja horaria." },
      { title: "Varias oficinas", text: "Cada una con su agenda, todas en el mismo calendario." },
      { title: "Móvil sin instalar nada", text: "La misma aplicación en el navegador del teléfono." },
    ],
  },
  obra: {
    id: "obra",
    module: "Presupuestos · Facturas · Informes",
    what: "la obra y la facturación, en la ficha del piso",
    title: "Convierte el presupuesto aceptado en factura con un clic, dentro de la ficha del piso.",
    body:
      "El presupuesto de la reforma se hace por partidas en la ficha del piso. Cuando el cliente acepta, un clic lo convierte en factura con su PDF. Los informes recogen captación, seguimiento y obra por oficina.",
    features: [
      { title: "Presupuestos por partidas", text: "Con estados y tasa de aceptación." },
      { title: "Factura en un clic", text: "Enlazada al inmueble y al cliente, con estado de cobro." },
      { title: "Informes", text: "Por oficina y por operación." },
    ],
  },
  plataforma: {
    id: "plataforma",
    module: "Hecho a medida",
    what: "cómo se construye y cómo arranca",
    title: "Construido para agencias que trabajan a su manera.",
    body:
      "statecrm se monta con los módulos que necesitas, con tus etapas, tus campos y tus informes. Al arrancar migramos la cartera que ya tienes, formamos al equipo y lo dejamos funcionando con tus zonas de captación activas.",
    features: [
      { title: "Módulos a tu medida", text: "Lo que no usas, no está." },
      { title: "Migración de tu cartera", text: "Inmuebles, clientes y demandas desde el primer día." },
      { title: "Formación y soporte directo", text: "Hablas con quien ha construido tu CRM." },
    ],
  },
};
