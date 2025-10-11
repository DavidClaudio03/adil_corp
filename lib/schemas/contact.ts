import { z } from "zod";

export const ContactRequestSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  empresa: z.string().optional().default(""),
  servicio: z.string().min(2, "Selecciona un servicio"),
  mensaje: z.string().max(2000).optional().default(""),
  acepta_terminos: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos" }) }),
  // extras opcionales
  captchaToken: z.string().optional(),
  // honeypot anti-bot (NO mostrar en UI):
  website: z.string().optional(),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;

export const ContactResponseSchema = z.object({
  ok: z.boolean(),
  id: z.string().optional(),
  message: z.string().optional(),
  errors: z.array(z.string()).optional(),
});

export type ContactResponse = z.infer<typeof ContactResponseSchema>;
