import type { NavItem } from "@/types/nav";

export const SITE = {
  name: "ADIL CORP",
  description: "Created with David Claudio - Full Stack Developer",
  logoSrc: "/logo_adil.png",
} as const;

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/#home" },
  { label: "Asesoría Automotriz", href: "/#automotriz" },
  { label: "Marketing Digital", href: "/#marketing" },
  { label: "Blog", href: "/#blog" },
  { label: "Contacto", href: "/#contacto" },
] as const;
