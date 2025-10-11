import type { ComponentType } from "react";

export type FooterIcon = ComponentType<{ className?: string }>;

export type FooterContact = Readonly<{
  id: string;
  label: string;        // "Teléfono"
  value: string;        // "+593 99 999 9999"
  icon: FooterIcon;
  href?: string;        // "tel:+593999999999" | "mailto:..." | "/contacto"
  srOnly?: string;      // aria-label específico si se requiere
}>;

export type FooterLink = Readonly<{
  id: string;
  label: string;
  href: string;
}>;
