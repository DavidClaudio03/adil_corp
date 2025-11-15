// app/api/automotriz/reservas/route.ts
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { supabaseServer } from "@/lib/supabase/server"
import { DEPOSIT_AMOUNT, PAYMENT_PROOFS_BUCKET } from "@/config/payment"
import type { Booking } from "@/types/booking"
import { notifyBooking } from "@/lib/notifications/notifyBooking"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = String(formData.get("name") || "").trim()
    const phone = String(formData.get("phone") || "").trim()
    const plate = String(formData.get("plate") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const date = String(formData.get("date") || "").trim()
    const time = String(formData.get("time") || "").trim()
    const depositAmount = Number(formData.get("depositAmount") || DEPOSIT_AMOUNT)

    const paymentProof = formData.get("paymentProof") as File | null

    // 1) Validaciones mínimas en backend (por seguridad)
    if (!name || !phone || !plate || !email || !date || !time) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      )
    }

    if (!paymentProof) {
      return NextResponse.json(
        { error: "Debes adjuntar el comprobante de pago" },
        { status: 400 }
      )
    }

    // 2) Subir archivo a Supabase Storage
    const ext = paymentProof.name.split(".").pop() || "bin"
    const fileId = randomUUID()
    const filePath = `${date}/${fileId}.${ext}`

    const arrayBuffer = await paymentProof.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseServer.storage
      .from(PAYMENT_PROOFS_BUCKET)
      .upload(filePath, buffer, {
        contentType: paymentProof.type || "application/octet-stream",
        upsert: false
      })

    if (uploadError) {
      console.error("Error al subir comprobante:", uploadError)
      return NextResponse.json(
        { error: "No se pudo guardar el comprobante. Intenta de nuevo." },
        { status: 500 }
      )
    }

    // 3) Insertar reserva en la tabla bookings y devolver el registro
    const { data: insertData, error: insertError } = await supabaseServer
      .from("bookings")
      .insert({
        name,
        phone,
        plate,
        email,
        date,
        time,
        deposit_amount: depositAmount,
        payment_proof_path: filePath,
        status: "pending_notification"
      })
      .select("*")
      .single()

    if (insertError || !insertData) {
      console.error("Error al guardar reserva:", insertError)

      // Opcional: borrar archivo subido si falla el insert
      await supabaseServer.storage
        .from(PAYMENT_PROOFS_BUCKET)
        .remove([filePath])

      return NextResponse.json(
        { error: "No se pudo guardar la reserva. Intenta de nuevo." },
        { status: 500 }
      )
    }

    const booking = insertData as Booking

    // 4) Enviar notificaciones (email ahora; WhatsApp en el futuro)
    let notificationError: string | null = null

    try {
      await notifyBooking(booking)

      // Si todo bien, marcamos como notified
      const { error: updateOkError } = await supabaseServer
        .from("bookings")
        .update({
          status: "notified",
          notified_at: new Date().toISOString(),
          notification_error_message: null
        })
        .eq("id", booking.id)

      if (updateOkError) {
        console.error("Error al actualizar booking a notified:", updateOkError)
        notificationError = "Error al actualizar estado de notificación"
      }
    } catch (err: any) {
      console.error("Error enviando notificaciones:", err)

      notificationError = String(err?.message || err)

      // Marcamos el error de notificación en la BD
      const { error: updateErr } = await supabaseServer
        .from("bookings")
        .update({
          status: "notification_error",
          notification_error_message: notificationError
        })
        .eq("id", booking.id)

      if (updateErr) {
        console.error("Error al actualizar booking a notification_error:", updateErr)
      }
    }

    // 5) Respuesta al cliente
    // La reserva se guardó sí o sí si llegamos aquí. El email puede haber fallado o no.
    return NextResponse.json(
      {
        ok: true,
        message: notificationError
          ? "Tu reserva fue registrada. Hubo un problema enviando la notificación, pero revisaremos tu solicitud."
          : "Tu reserva fue registrada y se envió la notificación correctamente."
      },
      { status: 200 }
    )
  } catch (err) {
    console.error("Error inesperado en reservas:", err)
    return NextResponse.json(
      { error: "Error inesperado. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
