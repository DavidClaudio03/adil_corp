import type { ComponentType } from "react";

export type MkIcon = ComponentType<{ className?: string }>;

export type MkService = Readonly<{
  id: string;
  title: string;
  description: string;
  icon: MkIcon;
}>;
