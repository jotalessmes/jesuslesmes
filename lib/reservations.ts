export const plans = {
  esencial: "Landing Esencial · desde 150 €",
  avanzada: "Landing Avanzada · desde 300 €",
  software: "Software a medida",
} as const;

export const statuses = {
  waiting: "En espera",
  active: "En proceso",
  sent: "Enviado",
  payment: "Pendiente de pago",
  closed: "Cerrado",
} as const;

export const briefFields = [
  ["purpose", "Objetivo de la web o del software", 350, true],
  ["problem", "¿Qué problema quieres resolver?", 1800, true],
  ["audience", "¿A quién va dirigido?", 350, false],
  ["features", "Funciones o secciones necesarias", 1000, false],
  ["references", "Web actual o referencias", 700, false],
  ["deadline", "Fecha objetivo", 100, false],
] as const;
