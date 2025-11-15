import type { Booking } from "@/types/booking"
import { sendBookingEmail } from "./email"
import { sendBookingWhatsApp } from "./whatsapp"

export async function notifyBooking(booking: Booking) {
  const errors: string[] = []

  // Email (crítico)
  try {
    await sendBookingEmail(booking)
  } catch (err) {
    console.error("[Notify] Error al enviar email:", err)
    errors.push("email")
  }

  // WhatsApp (deseable, pero si falla, igual el email avisa)
  //try {
  //  await sendBookingWhatsApp(booking)
  //} catch (err) {
  //  console.error("[Notify] Error al enviar WhatsApp:", err)
  //  errors.push("whatsapp")
  //}
//
  //if (errors.length > 0) {
  //  throw new Error(`Falló notificación: ${errors.join(", ")}`)
  //}
}
