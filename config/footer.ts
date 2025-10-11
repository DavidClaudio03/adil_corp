import { Phone, Mail, MapPin } from "lucide-react";
import type { FooterContact, FooterLink } from "@/types/footer";

export const FOOTER_COPY = {
  headline: "LEJOS SOMOS MÁS",
  rightsPrefix: "©",
  rightsSuffix: "Diseñado y desarrollado por",
  rightAutor: "Ing. David Claudio",
  privateDecryption: "Todos los derechos reservados.",
} as const;

export const FOOTER_CONTACT: ReadonlyArray<FooterContact> = [
  {
    id: "phone",
    label: "Teléfono",
    value: "+593 99 999 9999",
    icon: Phone,
    href: "tel:+593999999999",
  },
  {
    id: "email",
    label: "Email",
    value: "info@adilservices.com",
    icon: Mail,
    href: "mailto:info@adilservices.com",
  },
  {
    id: "location",
    label: "Ubicación",
    value: "Quito, Ecuador",
    icon: MapPin,
    // href opcional a Google Maps o página de contacto
  },
] as const;

// Enlaces opcionales a subpáginas (portafolio, blog, contacto, etc.)
export const FOOTER_LINKS: ReadonlyArray<FooterLink> = [
  { id: "home",        label: "Inicio",       href: "#home" },
  { id: "automotive",  label: "Automotriz",   href: "#automotriz" },
  { id: "marketing",   label: "Marketing",    href: "#marketing" },
  { id: "portafolio",  label: "Portafolio",   href: "#mini-portafolio" }, // subpágina
  { id: "blog",        label: "Blog",         href: "#blog" },          // subpágina
  { id: "contacto",    label: "Contacto",     href: "#contacto" },   // subpágina
] as const;
