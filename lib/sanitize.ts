// Elimina solo caracteres peligrosos, pero respeta espacios y saltos de línea
export function sanitizeInput(v: string): string {
  // Permite espacios, tildes y saltos de línea, elimina solo símbolos de script
  return v.replace(/[<>]/g, "");
}

export const clean = (s: string) => s.replace(/[<>]/g, "");
