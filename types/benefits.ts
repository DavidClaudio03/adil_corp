import type { ComponentType } from "react";

export type BenefitIcon = ComponentType<{ className?: string }>;

export type BenefitItem = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: BenefitIcon; // lucide-react icon component
}>;
