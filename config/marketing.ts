import { Monitor, Smartphone, BarChart3, Target } from "lucide-react";
import type { MkService } from "@/types/marketing";

export const MARKETING_SERVICES: ReadonlyArray<MkService> = [
  {
    id: "web-design",
    title: "Diseño Web",
    description: "Sitios web profesionales que convierten visitantes en clientes",
    icon: Monitor,
  },
  {
    id: "social-media",
    title: "Redes Sociales",
    description: "Gestión estratégica de contenido y comunidades digitales",
    icon: Smartphone,
  },
  {
    id: "ads-campaigns",
    title: "Campañas Publicitarias",
    description: "Pautas optimizadas en Facebook, Instagram y Google",
    icon: BarChart3,
  },
  {
    id: "digital-strategy",
    title: "Estrategia Digital",
    description: "Planes integrales basados en datos y objetivos reales",
    icon: Target,
  },
] as const;

export const MARKETING_HERO = {
  badgeText: "Marketing Digital Profesional",
  title: "INNOVACIÓN DIGITAL PARA TU EMPRESA",
  lead:
    "Muchos negocios en Quito aún no aprovechan lo digital. Diseñamos páginas web, gestionamos redes y ejecutamos campañas que generan resultados medibles.",
  heroImageSrc: "/multiple-computer-monitors-displaying-digital-mark.png",
  heroImageAlt:
    "Múltiples pantallas mostrando dashboards de marketing digital y métricas de redes sociales",
  ctaLabel: "Solicita tu Propuesta",
} as const;
