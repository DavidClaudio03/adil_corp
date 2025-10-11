import type { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: "paola-ibarra-lopez",
    name: "Ing. Paola Ibarra López",
    image: "/PaolaIbarra.jpg", // puedes cambiar a /images/testimonials/paola-ibarra.jpg
    role: "HCE, Ing. en Petróleos, Mgtr. en Seguridad Industrial",
    company: "Schlumberger",
    quote:
      "Excelente servicio de ADIL CORP. Me ayudaron a comprar mi suite en Lagranados y también a rentarla. Llevo un año generando ingresos mensuales de manera estable, en un edificio seguro y con todas las comodidades. 100% confiable.",
    rating: 5,
  },
  {
    id: "pablo-cobos",
    name: "Dr. Pablo Cobos",
    image: "/PabloCobos.jpg", // puedes cambiar a /images/testimonials/pablo-cobos.jpg
    role: "Presidente",
    company: "Fundación Creando Un Nuevo Camino",
    quote:
      "Recibí una asesoría completa y personalizada. Primero me ayudaron a pasar sin inconvenientes la Revisión Técnica Vehicular en Quito, y luego me apoyaron con el diseño web y estrategias de marketing para mi gimnasio Anahí. Un equipo atento, práctico y profesional.",
    rating: 5,
  },
  {
    id: "wilmer-ramos",
    name: "Tgnl. Wilmer Ramos",
    image: "/placeholder.svg", // puedes cambiar a /images/testimonials/wilmer-ramos.jpg
    role: "Supervisor",
    company: "Industria petrolera",
    quote:
      "Hace 5 años compré con ADIL CORP un Hyundai Elantra 2014. El auto funcionó perfecto, sin fallas, y cuando llegó el momento de venderlo también me acompañaron en todo el proceso. Desde entonces sigo confiando en ellos, siempre con resultados positivos.",
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
