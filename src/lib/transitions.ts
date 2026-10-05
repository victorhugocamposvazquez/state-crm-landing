/**
 * FRASES DE TRANSICIÓN.
 * Entre bloques, una frase grande que se enfoca palabra a palabra con el scroll (TextReveal).
 * Una por id; cambiar la frase es tocar una línea aquí.
 */

export type TransitionId = "saber" | "cerrar";

export const transitions: Record<TransitionId, string> = {
  // tras el hero: el problema (volumen) y la promesa (statecrm lo sabe)
  saber: "Cientos de propiedades nuevas cada día. Y statecrm lo sabe todo sobre ellas.",
  // tras los módulos: el resultado, en vocabulario de agencia
  cerrar: "Menos mañanas mirando portales. Más visitas en el calendario.",
};
