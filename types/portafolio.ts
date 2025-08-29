import { Badge } from "lucide-react";
import type { ComponentType } from "react";

export type PfIcon = ComponentType<{ className?: string }>;

export type CaseStudy = Readonly<{
  id: string;
  title: string;        // "Gimnasio Anahí"
  subtitle: string;     // "Fitness & Wellness"
  description: string;  // breve logro
  metricText: string;   // "+300% membresías"
  accent: "primary" | "secondary";
  icon: PfIcon;         // lucide-react icon component
}>;

