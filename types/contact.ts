import type { ComponentType } from "react";

export type ContactIcon = ComponentType<{ className?: string }>;

export type ContactInfo = Readonly<{
  id: string;
  icon: ContactIcon;
  title: string;
  details: ReadonlyArray<string>;
  description: string;
}>;

export type ContactFormData = Readonly<{
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  servicio: string;
  mensaje: string;
  acepta_terminos: boolean;
  // honeypot para bots:
  website?: string;
}>;
