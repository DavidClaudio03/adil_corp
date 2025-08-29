import { Monitor, Target, TrendingUp, BarChart3 } from "lucide-react";
import type { CaseStudy } from "@/types/portafolio";

export const CASE_STUDIES: ReadonlyArray<CaseStudy> = [
  {
    id: "gimnasio-anahi",
    title: "Gimnasio Anahí",
    subtitle: "Fitness & Wellness",
    description:
      "Incremento del 300% en membresías mediante estrategia digital integral y presencia web optimizada.",
    metricText: "+300% membresías",
    accent: "primary",
    icon: Monitor,
  },
  {
    id: "fundacion-unc",
    title: "Fundación Un Nuevo Camino",
    subtitle: "Organización Social",
    description:
      "Digitalización completa que aumentó donaciones y alcance comunitario en un 250%.",
    metricText: "+250% donaciones",
    accent: "secondary",
    icon: Target,
  },
] as const;

// Encabezado + CTA de la sección (por si luego se localiza)
export const PORTFOLIO_COPY = {
  badgeText: "Portafolio",
  heading: "Casos de Éxito",
  subheading: "Proyectos que han transformado negocios en Quito",
  ctaLabel: "Solicita tu Propuesta",
} as const;
