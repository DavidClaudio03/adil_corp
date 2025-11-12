import type { AutoService } from "@/types/automotriz";

export const AUTO_SERVICES: ReadonlyArray<AutoService> = [
  {
    id: "revision-tecnica",
    title: "Revisión Técnica Ejecutiva",
    description:
      "En Quito la revisión vehicular es tediosa y cara en tiempo. Nos encargamos de todo: preparación, trámites y aprobación final.",
    accent: "primary",
    icon: "check",
    ctaLabel: "Agenda tu Revisión",
    ctaVariant: "default",
    imageSrc: "/executive-client-in-modern-office-with-professiona.png",
    imageAlt: "Inspección técnica ejecutiva",
    href: "/automotriz/revision-tecnica",
  },
  {
    id: "compra-segura",
    title: "Compra Segura de Autos Usados",
    description:
      "En Ecuador los autos cuestan hasta el doble y los patios cobran comisiones de miles de dólares. Te asesoramos en diagnóstico, negociación y documentación.",
    accent: "secondary",
    icon: "shield",
    ctaLabel: "Cotiza tu Asesoría",
    ctaVariant: "outline",
    imageSrc: "/business-client-with-professional-automotive-advis.png",
    imageAlt: "Cliente empresarial con asesor revisando auto premium",
    href: "/servicios/compra-segura"
  }
] as const;
