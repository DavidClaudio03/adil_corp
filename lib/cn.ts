// Simple helper para concatenar clases de forma segura
export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}
