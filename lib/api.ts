import { fetchJSON } from "./http";
import {
  ContactRequestSchema,
  ContactResponseSchema,
  type ContactRequest,
  type ContactResponse,
} from "./schemas/contact";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000"; // NestJS

export async function submitContact(payload: ContactRequest): Promise<ContactResponse> {
  // valida el payload en cliente
  const parsed = ContactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.errors.map(e => e.message).join(", ");
    throw new Error(msg);
  }

  const res = await fetchJSON<ContactResponse>(`${API_BASE}/contact`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
    // credentials: "include", // si usas cookies/sesión
  });

  // valida la respuesta
  const checked = ContactResponseSchema.safeParse(res);
  if (!checked.success) throw new Error("Respuesta del servidor inválida.");
  return checked.data;
}
