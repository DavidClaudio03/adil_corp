import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import { DEPOSIT_AMOUNT } from "@/config/payment"
import { randomUUID } from "crypto"

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

    // Validaciones de seguridad adicionales en el servidor
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

    // 1) Subir archivo a Storage
    const ext = paymentProof.name.split(".").pop() || "bin"
    const fileId = randomUUID()
    const filePath = `${date}/${fileId}.${ext}`

    const arrayBuffer = await paymentProof.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseServer.storage
      .from("payment-proofs")
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

    // 2) Guardar registro en la tabla bookings
    const { error: insertError } = await supabaseServer
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
        status: "pending"
      })

    if (insertError) {
      console.error("Error al guardar reserva:", insertError)

      // TODO opcional: borrar el archivo subido si falla el insert
      return NextResponse.json(
        { error: "No se pudo guardar la reserva. Intenta de nuevo." },
        { status: 500 }
      )
    }

    // 3) (Futuro) enviar correo + WhatsApp aquí
    //    - Resend / SendGrid para email
    //    - Twilio / WhatsApp Cloud API para WhatsApp
    //    - Usando claves guardadas en variables de entorno

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error("Error inesperado en reservas:", err)
    return NextResponse.json(
      { error: "Error inesperado. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
