import type { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: "carlos-mendoza",
    name: "Carlos Mendoza",
    role: "Gerente General",
    company: "Empresa Logística",
    quote:
      "Aprobé la revisión técnica sin perder un minuto gracias a ADIL CORP. El servicio fue impecable y me permitió enfocarme en mi negocio.",
    rating: 5,
  },
  {
    id: "maria-elena-vasquez",
    name: "María Elena Vásquez",
    role: "Directora Comercial",
    company: "Consultora Financiera",
    quote:
      "La asesoría en compra de autos me ahorró miles de dólares y me dio la seguridad que necesitaba para una inversión tan importante.",
    rating: 5,
  },
  {
    id: "roberto-silva",
    name: "Roberto Silva",
    role: "Propietario",
    company: "Gimnasio Anahí",
    quote:
      "El marketing digital de ADIL CORP profesionalizó mi negocio y atrajo clientes que nunca pensé alcanzar. Los resultados hablan por sí solos.",
    rating: 5,
  },
] as const;

export const TESTIMONIALS_COPY = {
  badgeText: "Testimonios",
  heading: "LO QUE DICEN NUESTROS CLIENTES",
  subheading: "Testimonios reales de empresarios que confiaron en nosotros",
  primaryCta: "Reserva tu Servicio Automotriz",
  secondaryCta: "Solicita Propuesta Digital",
  bannerHeading: "En ADIL CORP entregamos tiempo, seguridad y resultados reales",
  bannerLead:
    "Únete a más de 200 empresarios que ya optimizaron su tiempo y potenciaron sus negocios con nosotros.",
} as const;
