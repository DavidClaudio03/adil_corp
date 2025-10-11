import { Clock, Shield, CheckCircle, TrendingUp, Badge } from "lucide-react";
import type { BenefitItem } from "@/types/benefits";

export const BENEFITS: ReadonlyArray<BenefitItem> = [
  {
    id: "no-filas",
    title: "Evita filas y trámites innecesarios",
    description: "Optimizamos tu agenda eliminando procesos burocráticos",
    icon: Clock,
  },
  {
    id: "transparencia",
    title: "Transparencia y precios claros",
    description: "Sin comisiones ocultas ni sorpresas en el proceso",
    icon: Shield,
  },
  {
    id: "respaldo-profesional",
    title: "Respaldo profesional",
    description: "Ingenieros y asesores especializados te acompañan",
    icon: CheckCircle,
  },
  {
    id: "rentabilidad",
    title: "Rentabilidad garantizada",
    description: "Servicios que protegen tu inversión y agenda",
    icon: TrendingUp,
  },
] as const;

export const BENEFITS_COPY = {
  BadgeText: "Beneficios",
  heading: "¿Por qué elegir ADIL CORP?",
} as const;
