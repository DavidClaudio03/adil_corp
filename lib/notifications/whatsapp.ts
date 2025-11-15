import type { Booking } from "@/types/booking"

const {
  WHATSAPP_API_BASE,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_ADMIN_NUMBER
} = process.env

if (!WHATSAPP_API_BASE || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN || !WHATSAPP_ADMIN_NUMBER) {
  console.warn(
    "[WhatsApp] Faltan variables de entorno. El envío de WhatsApp estará deshabilitado hasta configurarlas."
  )
}

export async function sendBookingWhatsApp(booking: Booking) {
  if (
    !WHATSAPP_API_BASE ||
    !WHATSAPP_PHONE_NUMBER_ID ||
    !WHATSAPP_ACCESS_TOKEN ||
    !WHATSAPP_ADMIN_NUMBER
  ) {
    // Si no está configurado, salimos sin lanzar error fatal (para no romper todo el flujo)
    return
  }

  const url = `${WHATSAPP_API_BASE}/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  const body = {
    messaging_product: "whatsapp",
    to: WHATSAPP_ADMIN_NUMBER,
    type: "text",
    text: {
      preview_url: false,
      body: [
        "Nueva reserva RTV",
        `Nombre: ${booking.name}`,
        `WhatsApp cliente: ${booking.phone}`,
        `Placa: ${booking.plate}`,
        `Fecha: ${booking.date}`,
        `Hora: ${booking.time}`,
        `Depósito: $${booking.deposit_amount}`,
        "",
        "Revisa el correo y el panel para validar el comprobante."
      ].join("\n")
    }
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const errorBody = await res.text()
    console.error("[WhatsApp] Error al enviar mensaje:", res.status, errorBody)
    throw new Error(`Error WhatsApp: ${res.status}`)
  }
}
