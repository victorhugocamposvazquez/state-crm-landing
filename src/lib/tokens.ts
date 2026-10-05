/**
 * Paleta acromática de statecrm (Brand Guidelines v1.0).
 * Jerarquía por valor, nunca por matiz.
 * Verde/ámbar solo para estado funcional en UI conceptual (éxito / alerta).
 */
export const tokens = {
  black0: "#0A0A0A", // negro base · fondo
  black1: "#0F0F0F", // superficie
  black2: "#161616", // tarjetas / filas elevadas
  grey3: "#222222", // borde
  grey4: "#3A3A3A", // bordes activos
  grey5: "#6E6E6E", // anillo
  grey6: "#A3A3A3", // gris crm
  white7: "#E5E5E5", // texto principal suave
  white8: "#FFFFFF", // blanco · titulares / primaria
  green: "#22C55E",
  greenDim: "rgba(34,197,94,0.14)",
  amber: "#D4A017",
  amberDim: "rgba(212,160,23,0.14)",
} as const;

export type EventKind = "new" | "ok" | "alert";
