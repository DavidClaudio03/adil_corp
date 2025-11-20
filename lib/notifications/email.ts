import nodemailer from "nodemailer"
import type { Booking } from "@/types/booking"
import { supabaseServer } from "@/lib/supabase/server"
import { PAYMENT_PROOFS_BUCKET } from "@/config/payment"

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL
} = process.env

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM_EMAIL) {
  throw new Error("Faltan variables de entorno SMTP")
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true", // true = 465, false = 587 (STARTTLS)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

export async function sendBookingEmail(booking: Booking) {
  const fromName = SMTP_FROM_NAME || "AdilCorp Services"
  const from = `"${fromName}" <${SMTP_FROM_EMAIL}>`

  //
  // 1) Preparamos el adjunto (comprobante desde Supabase Storage)
  //
  const attachments: { filename?: string; content: Buffer }[] = []

  if (booking.payment_proof_path) {
    try {
      const { data, error } = await supabaseServer.storage
        .from(PAYMENT_PROOFS_BUCKET)
        .download(booking.payment_proof_path)

      if (error || !data) {
        console.error("[Email] No se pudo descargar el comprobante desde Storage:", error)
      } else {
        const arrayBuffer = await data.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const filename =
          booking.payment_proof_path.split("/").pop() || "comprobante-transferencia"

        attachments.push({
          filename,
          content: buffer
        })
      }
    } catch (err) {
      console.error("[Email] Error inesperado descargando comprobante:", err)
      // seguimos enviando sin adjunto si falla
    }
  }

  //
  // 2) Correo para ADMIN (tú)
  //
  const adminSubject = `Nueva reserva RTV - ${booking.plate} - ${booking.date} ${booking.time}`

  const adminText = `
Nueva reserva recibida:

Nombre: ${booking.name}
WhatsApp: ${booking.phone}
Email: ${booking.email}
Placa: ${booking.plate}
Fecha: ${booking.date}
Hora: ${booking.time}
Depósito: $${booking.deposit_amount}

Ruta del comprobante en Storage:
${booking.payment_proof_path}

Estado actual: ${booking.status}

Revisa el comprobante adjunto y el panel de administración para validar y confirmar la reserva.
`.trim()

  const adminHtml = `
  <h2>Nueva reserva RTV</h2>
  <p><strong>Nombre:</strong> ${booking.name}</p>
  <p><strong>WhatsApp:</strong> ${booking.phone}</p>
  <p><strong>Email:</strong> ${booking.email}</p>
  <p><strong>Placa:</strong> ${booking.plate}</p>
  <p><strong>Fecha:</strong> ${booking.date}</p>
  <p><strong>Hora:</strong> ${booking.time}</p>
  <p><strong>Depósito:</strong> $${booking.deposit_amount}</p>
  <p><strong>Estado:</strong> ${booking.status}</p>
  <hr />
  <p><strong>Ruta del comprobante (Storage Supabase):</strong><br/>
  <code>${booking.payment_proof_path}</code></p>
  <p>Se adjunta el comprobante de transferencia para tu revisión.</p>
  `.trim()

  await transporter.sendMail({
    from,
    to: SMTP_FROM_EMAIL, // te llega a ti
    subject: adminSubject,
    text: adminText,
    html: adminHtml,
    attachments: attachments.length > 0 ? attachments : undefined
  })

  //
  // 3) Correo para el USUARIO (confirmación + respaldo)
  //
  if (booking.email) {
    const userSubject = `Confirmación de reserva RTV - ${booking.plate} - ${booking.date} ${booking.time}`

    const userText = `
Hola ${booking.name},

Hemos recibido tu solicitud de reserva para la Revisión Técnica Ejecutiva.

Estos son los datos registrados:

Nombre: ${booking.name}
WhatsApp: ${booking.phone}
Email: ${booking.email}
Placa: ${booking.plate}
Fecha: ${booking.date}
Hora: ${booking.time}
Depósito: $${booking.deposit_amount}

Adjuntamos el comprobante de transferencia que subiste como respaldo de tu reserva.

En breve nos pondremos en contacto contigo por WhatsApp o email para confirmar los detalles finales de tu cita.

Gracias por confiar en nosotros.
AdilCorp Services
`.trim()

    const userHtml = `
    <p>Hola <strong>${booking.name}</strong>,</p>

    <p>Hemos recibido tu solicitud de reserva para la <strong>Revisión Técnica Ejecutiva</strong>.</p>

    <p>Estos son los datos registrados:</p>
    <ul>
      <li><strong>Nombre:</strong> ${booking.name}</li>
      <li><strong>WhatsApp:</strong> ${booking.phone}</li>
      <li><strong>Email:</strong> ${booking.email}</li>
      <li><strong>Placa:</strong> ${booking.plate}</li>
      <li><strong>Fecha:</strong> ${booking.date}</li>
      <li><strong>Hora:</strong> ${booking.time}</li>
      <li><strong>Depósito:</strong> $${booking.deposit_amount}</li>
    </ul>

    <p>Adjuntamos el <strong>comprobante de transferencia</strong> que subiste como respaldo de tu reserva.</p>

    <p>En breve nos pondremos en contacto contigo por WhatsApp o email para confirmar los detalles finales de tu cita.</p>

    <p>Gracias por confiar en nosotros.<br/>
    <strong>AdilCorp Services</strong></p>
    `.trim()

    await transporter.sendMail({
      from,
      to: booking.email,       // correo del usuario
      replyTo: SMTP_FROM_EMAIL,
      subject: userSubject,
      text: userText,
      html: userHtml,
      attachments: attachments.length > 0 ? attachments : undefined
    })
  }
}
