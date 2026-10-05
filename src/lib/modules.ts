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
  /** titular del bloque: qué hace, en una frase corta (≤ 45 caracteres: dos líneas como máximo) */
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
    what: "anuncios nuevos, organizados para actuar",
    title: "Cada anuncio nuevo, listo para trabajar.",
    body:
      "Cada mañana statecrm revisa los portales en las zonas que eliges y reúne los anuncios nuevos en una bandeja. La ficha incluye precio, superficie, fotos y teléfono cuando el anuncio lo muestra; también ayuda a distinguir particulares y agencias y asigna cada oportunidad al equipo.",
    features: [
      { title: "Rastreo diario por zona", text: "Elige las ciudades, barrios o códigos postales que quieres seguir." },
      { title: "Datos del anuncio", text: "Precio, superficie, habitaciones y fotos; el teléfono cuando está disponible." },
      { title: "Agencias encubiertas", text: "Señala a las agencias que se anuncian como particulares." },
      { title: "Prioridad y asignación", text: "Cada oportunidad tiene una persona responsable y avisos de cambios de precio." },
    ],
  },
  catastro: {
    id: "catastro",
    module: "Catastro",
    what: "fincas aunque no haya anuncios publicados",
    title: "Busca fincas por zona, no por anuncio.",
    body:
      "Catastro funciona en paralelo a la captación. Elige una calle, un código postal o una localidad para recorrer las fincas de esa zona. Cada resultado indica si el edificio está dividido en pisos y locales o si es una finca única, como una casa, nave o solar. Puedes pausar y reanudar los rastreos; el historial muestra quién los inició y qué encontraron.",
    features: [
      { title: "Por calle", text: "Todas las fincas de una calle, número a número." },
      { title: "Por código postal o localidad", text: "Lanza búsquedas amplias y retómalas cuando quieras." },
      { title: "Edificios divididos", text: "Consulta pisos, locales y el número de inmuebles por edificio." },
      { title: "Fincas únicas", text: "Casas, naves y solares sin división horizontal." },
    ],
  },
  seguimiento: {
    id: "seguimiento",
    module: "Inmuebles · Demandas · Seguimiento",
    what: "tu cartera, tus clientes y cada operación",
    title: "Relaciona cada inmueble con quien lo busca.",
    body:
      "La cartera y las demandas de clientes se conectan con las novedades de captación. Cuando un inmueble coincide con lo que busca un cliente, el equipo recibe un aviso y puede seguir la operación por sus etapas: contacto, visita, oferta y reserva.",
    features: [
      { title: "Inmuebles", text: "Cada ficha con referencia, estado, responsable y datos de Catastro." },
      { title: "Demandas", text: "Cruza zona, tipo, habitaciones y presupuesto con los inmuebles." },
      { title: "Seguimiento por etapas", text: "Organiza contactos, visitas, ofertas y documentos a tu manera." },
      { title: "Clientes", text: "Compradores y propietarios en un mismo hilo." },
    ],
  },
  equipo: {
    id: "equipo",
    module: "Tareas · Calendario",
    what: "el trabajo de todo el equipo, a la vista",
    title: "Tareas y calendario de todo el equipo.",
    body:
      "Las tareas tienen responsable, prioridad y hora. El calendario reúne visitas, firmas y llamadas de todo el equipo, también entre oficinas. Cada persona puede consultar y actualizar su trabajo desde el navegador del móvil.",
    features: [
      { title: "Tareas personales y del equipo", text: "Con prioridad, responsable y hora." },
      { title: "Calendario compartido", text: "Visitas, firmas y llamadas en su franja horaria." },
      { title: "Varias oficinas", text: "Cada una con su agenda, todas en el mismo calendario." },
      { title: "Desde el móvil", text: "Consulta y actualiza el trabajo desde el navegador, sin instalar nada." },
    ],
  },
  obra: {
    id: "obra",
    module: "Presupuestos · Facturas · Informes",
    what: "la obra y la facturación, en la ficha del piso",
    title: "Del presupuesto a la factura, en un clic.",
    body:
      "Prepara presupuestos por partidas desde la ficha del inmueble. Al aceptar el cliente, conviértelos en factura y genera el PDF. Los informes reúnen la actividad de captación, seguimiento y obra por oficina.",
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
    title: "Construido a la medida de tu agencia.",
    body:
      "statecrm se monta con los módulos que necesitas, con tus etapas, tus campos y tus informes. Al arrancar migramos la cartera que ya tienes, formamos al equipo y lo dejamos funcionando con tus zonas de captación activas.",
    features: [
      { title: "Módulos a tu medida", text: "Lo que no usas, no está." },
      { title: "Migración de tu cartera", text: "Inmuebles, clientes y demandas desde el primer día." },
      { title: "Formación y soporte directo", text: "Hablas con quien ha construido tu CRM." },
    ],
  },
};
