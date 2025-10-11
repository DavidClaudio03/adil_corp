export type AutoService = Readonly<{
  id: string;
  title: string;
  description: string;
  accent: "primary" | "secondary";
  icon: "check" | "shield";
  ctaLabel: string;
  ctaVariant?: "default" | "outline";
  imageSrc: string;
  imageAlt: string;
}>;
