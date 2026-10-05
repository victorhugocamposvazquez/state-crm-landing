/**
 * FRASES DE TRANSICIÓN.
 * Entre bloques, una frase grande que se enfoca palabra a palabra con el scroll (TextReveal).
 * Una por id; cambiar la frase es tocar una línea aquí.
 */

export type TransitionId = "saber" | "cerrar";

export const transitions: Record<TransitionId, string> = {
  // tras el hero: enmarca de forma directa lo que va a mostrar la escena de Captación
  saber: "Cada mañana, anuncios nuevos de particulares en las zonas que te importan.",
  // tras los módulos: el resultado que experimenta el equipo
  cerrar: "La oportunidad entra. El equipo sabe cuál es el siguiente paso.",
};
