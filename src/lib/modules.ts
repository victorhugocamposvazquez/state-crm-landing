/**
 * LOS TEXTOS DE CADA MÓDULO.
 * Debajo de la pantalla animada de cada capítulo entra un bloque en flujo normal que explica el
 * módulo sin prisa pero sin enciclopedia: un titular, un párrafo y cuatro puntos de una línea.
 * Cambiar un texto es tocar una línea aquí; el componente es ModuleText.
 */

export type ModuleTextId = "captacion" | "catastro" | "seguimiento" | "equipo" | "estudio" | "plataforma";

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
    what: "anuncios de particulares, cada mañana",
    title: "Particulares cada mañana.",
    body:
      "Cada mañana statecrm rastrea los portales en tus zonas y guarda cada anuncio nuevo de particular con precio, metros y fotos. Distingue particular, agencia y agencia encubierta, y lo que entra se asigna a un comercial.",
    features: [
      { title: "Rastreo diario por zona", text: "Ciudades, barrios o códigos postales, los que tú marques." },
      { title: "Ficha completa", text: "Precio, metros, habitaciones y fotos." },
      { title: "Agencias encubiertas", text: "Señala a las agencias que se anuncian como particulares." },
      { title: "Prioridad y asignación", text: "Cada novedad con responsable, y aviso si cambia de precio." },
    ],
  },
  catastro: {
    id: "catastro",
    module: "Catastro",
    what: "fincas por calle, código postal o localidad",
    title: "Fincas por calle, código postal o localidad.",
    body:
      "El Catastro va por libre: no depende de ningún anuncio. Eliges una calle, un código postal o una localidad y statecrm recorre el Catastro finca a finca, separando las que tienen división horizontal, edificios con pisos y locales, de las que no, casas, naves y solares. Cada rastreo se pausa, se reanuda y queda en el historial con quién lo lanzó, y lo que encuentra pasa a tareas, seguimiento y equipo comercial.",
    features: [
      { title: "Por calle", text: "Todas las fincas de una calle, número a número." },
      { title: "Por código postal o localidad", text: "Zonas enteras, en rastreos que se pausan y se reanudan." },
      { title: "Con división horizontal", text: "Edificios divididos en pisos y locales, con cuántos inmuebles tiene cada uno." },
      { title: "Sin división horizontal", text: "Casas, naves y solares: fincas de una sola pieza." },
    ],
  },
  seguimiento: {
    id: "seguimiento",
    module: "Inmuebles · Demandas · Seguimiento",
    what: "tu cartera, tus clientes y cada operación",
    title: "Cada piso nuevo, cruzado con tus demandas.",
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
    title: "Tareas y calendario de todo el equipo.",
    body:
      "Las tareas del día tienen responsable, prioridad y hora. Las visitas, firmas y llamadas van a un calendario compartido, con varias oficinas si las hay. Y funciona en el móvil del comercial sin instalar nada.",
    features: [
      { title: "Tareas personales y del equipo", text: "Con prioridad, responsable y hora." },
      { title: "Calendario compartido", text: "Visitas, firmas y llamadas en su franja horaria." },
      { title: "Varias oficinas", text: "Cada una con su agenda, todas en el mismo calendario." },
      { title: "Móvil sin instalar nada", text: "La misma aplicación en el navegador del teléfono." },
    ],
  },
  estudio: {
    id: "estudio",
    module: "Estudio",
    what: "creatividades de redes, desde la ficha",
    title: "El anuncio sale de la ficha.",
    body:
      "Eliges el inmueble y statecrm monta el post con sus fotos, metros y precio. Eliges el formato de la red, el tipo de anuncio y lo publicas o lo descargas.",
    features: [
      { title: "Desde el inmueble", text: "Fotos y datos de la ficha, sin volver a escribirlos." },
      { title: "Formato de la red", text: "Post, cuadrado o reel." },
      { title: "Tipo de anuncio", text: "Nuevo, exclusiva o vendido." },
      { title: "Publicar o descargar", text: "La pieza queda lista, con la marca de la agencia." },
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
