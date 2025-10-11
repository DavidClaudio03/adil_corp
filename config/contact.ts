// src/config/contact.tsx

export const CONTACT_SERVICE_OPTIONS = [
  { value: "revision-tecnica", label: "Revisión Técnica Vehicular" },
  { value: "compra-auto", label: "Asesoría Compra de Auto Usado" },
  { value: "mantenimiento", label: "Mantenimiento a Domicilio" },
  { value: "marketing-web", label: "Diseño de Página Web" },
  { value: "marketing-redes", label: "Gestión de Redes Sociales" },
  { value: "marketing-campanas", label: "Campañas Publicitarias" },
  { value: "marketing-integral", label: "Marketing Digital Integral" },
  { value: "consultoria", label: "Consultoría Personalizada" },
] as const;

export const SERVICE_AREAS = [
  "Norte de Quito",
  "Valle de los Chillos",
  "Valle de Tumbaco",
  "Cumbayá",
  "La Carolina",
  "El Bosque",
  "Guápulo",
] as const;

/**
 * Textos centralizados para la página de contacto.
 * Facilita escalabilidad, i18n y mantenibilidad.
 */
export const CONTACT_COPY = {
  // Hero
  badge: "Contáctanos",
  title1: "CONTÁCTANOS Y AGENDA",
  title2: "TU SERVICIO",
  lead:
    "Estamos listos para ayudarte con servicios automotrices ejecutivos y estrategias de marketing digital " +
    "que transformarán tu negocio en Quito.",

  // Formulario
  formTitle: "Solicita tu Servicio",
  formLead:
    "Completa el formulario y nos pondremos en contacto contigo para coordinar tu servicio.",

  // Cobertura
  coverageTitle: "Cobertura de Servicios",
  coverageLead: "Brindamos servicios en toda la ciudad de Quito y sus valles:",

  // Contacto Inmediato
  quickContactTitle: "Contacto Inmediato",
  quickContactWhatsapp: "WhatsApp: +593 99 123 4567",
  quickContactEmail: "Email: info@adilservices.com",
  quickContactResponse: "Respuesta garantizada en:",
  quickContactWhatsappTime: "Menos de 1 hora",
  quickContactEmailTime: "Menos de 24 horas",

  // Emergencias
  emergencyTitle: "Emergencias Automotrices",
  emergencyLead: "¿Tu vehículo se averió? Contáctanos las 24 horas",
  emergencyPhone: "Emergencia: +593 99 999 9999",

  // CTA final
  callmeTitle: "¿Prefieres que te llamemos?",
  callmeLead:
    "Déjanos tu número y uno de nuestros asesores se comunicará contigo en los próximos minutos",

  // Mensaje de éxito
  successTitle: "¡Mensaje Enviado!",
  successLead:
    "Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.",
};
