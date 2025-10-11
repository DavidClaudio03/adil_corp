import type { BlogPost, BlogCategory } from "@/types/blog";

export const BLOG_CATEGORIES: ReadonlyArray<"all" | BlogCategory> = [
  "all",
  "Automotriz",
  "Marketing Digital",
];

export const BLOG_POSTS: ReadonlyArray<BlogPost> = [
  //  AUTOMOTRIZ
  {
    id: "1",
    slug: "revision-vehicular-quito-sin-complicaciones",
    title: "5 consejos para pasar la Revisión Vehicular en Quito sin complicaciones",
    excerpt:
      "Evita rechazos y ahorra tiempo con estos pasos básicos: revisa tus multas, cuida las emisiones, chequea luces, frenos y realiza mantenimiento básico.",
    category: "Automotriz",
    author: "Ing. Ángel Ibarra",
    date: "2024-10-01",
    readTime: "6 min",
    image: "/AutomotrizBlog.png",
    featured: true,
    content: `
      Evita rechazos y ahorra tiempo con estos pasos básicos:
        Revisa tus multas: Antes de agendar la cita, entra al portal de la AMT y verifica que no tengas valores pendientes. Sin eso, no podrás aprobar la revisión.
        Cuida las emisiones (el punto más crítico): En vehículos a gasolina, limpia los inyectores, cambia filtros y bujías. En diésel, evita el humo negro revisando el sistema de combustión. El 70% de los rechazos se da aquí.
        Chequea las luces: Una simple bombilla quemada puede hacerte perder la cita. Prueba direccionales, freno, bajas y altas.
        Frenos y suspensión firmes: Revisa pastillas, discos y amortiguadores. Asegúrate de que no haya fugas ni ruidos. Un auto estable pasa sin problema.
        Haz mantenimiento básico: Mantén aceite, líquidos y filtros en orden. Demuestra que tu vehículo está cuidado.
        Resumen rápido: Los fallos más comunes son emisiones y luces de freno. Si cuidas esos puntos, la revisión es prácticamente segura.
    `,
  },

  //  MARKETING DIGITAL 1
  {
    id: "2",
    slug: "marketing-digital-pymes-ecuador",
    title: "Marketing Digital para PYMEs: La nueva puerta al crecimiento",
    excerpt:
      "La digitalización en Ecuador dejó de ser una opción. Descubre por qué invertir en marketing digital es clave para el crecimiento sostenible de tu negocio.",
    category: "Marketing Digital",
    author: "Ing. Ángel Ibarra",
    date: "2024-10-03",
    readTime: "7 min",
    image: "/MarketingBlog1.png",
    featured: true,
    content: `
      En Ecuador, la digitalización dejó de ser una opción: hoy es el camino más directo para llegar a nuevos clientes y hacer crecer tu negocio.
      El 83,6 % de los ecuatorianos tiene acceso a internet y más del 69 % usa redes sociales activamente. Eso significa que tus futuros clientes están en línea — y lo más importante, desde su celular.
      Si tu empresa no tiene presencia digital, simplemente no existe para una gran parte del mercado.
      Las PYMEs ya están dando el paso: el 91 % planea invertir en digitalización este año. Los resultados son claros: más visibilidad, más ventas y una relación directa con los clientes.
         No se trata solo de estar en redes, sino de usarlas con estrategia. El marketing digital es inversión, no gasto. 
      El 72 % de las empresas que apostaron por estrategias digitales lograron un retorno positivo en menos de un año.
         Conclusión: Si eres dueño de una PYME, el momento es ahora. Tener una estrategia digital clara significa conectar, medir y crecer.
    `,
  },

  //  MARKETING DIGITAL 2
  {
    id: "3",
    slug: "como-el-marketing-digital-impulsa-ventas-en-pymes-ecuatorianas",
    title: "Cómo el marketing digital impulsa ventas reales en PYMEs ecuatorianas",
    excerpt:
      "El marketing digital no es solo publicidad: mide, optimiza y fideliza. Descubre cómo las PYMEs ecuatorianas están transformando su crecimiento.",
    category: "Marketing Digital",
    author: "Ing. Ángel Ibarra",
    date: "2024-10-05",
    readTime: "8 min",
    image: "/MarketingBlog2.png",
    featured: true,
    content: `
      El marketing digital ya no es solo publicidad: es una herramienta de crecimiento inteligente que te permite conocer, atraer y fidelizar clientes.
        Mide todo y mejora rápido. Con herramientas como Google Analytics o Meta Business Suite puedes saber qué campañas funcionan, ajustar tu presupuesto y dirigir tus esfuerzos hacia lo que realmente da resultados.
        Visibilidad que genera confianza. En 2024, el comercio electrónico en Ecuador superó los USD 5 000 millones, y para 2025 se proyecta un incremento de más del 20 %. 
        tar presente en línea no solo mejora tus ventas, también refuerza la imagen profesional ante tus clientes.
        Conexión directa con tu público. Redes sociales, chatbots y correo electrónico permiten mantener conversaciones útiles y humanas. 
        da mensaje es una oportunidad para fortalecer la relación con el cliente.
        Conclusión: El marketing digital te permite hacer más con menos: llegar a más personas, medir tus resultados y optimizar tu inversión.
    `,
  },
];

export const BLOG_COPY = {
  badgeText: "Blog & Recursos",
};
