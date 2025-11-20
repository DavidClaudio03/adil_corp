// app/api/admin/notifications-worker/route.ts
import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import type { Booking } from "@/types/booking"
import { notifyBooking } from "@/lib/notifications/notifyBooking"

const { CRON_SECRET } = process.env

export async function POST(req: Request) {
  // 1. Proteger endpoint con un secret sencillo
  const authHeader = req.headers.get("x-cron-secret")
  if (!CRON_SECRET || authHeader !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 2. Leer reservas pendientes
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .eq("status", "pending_notification")
    .order("created_at", { ascending: true })
    .limit(20)

  if (error) {
    console.error("[Worker] Error al leer bookings:", error)
    return NextResponse.json({ error: "Supabase error" }, { status: 500 })
  }

  const bookings = (data || []) as Booking[]

  if (bookings.length === 0) {
    return NextResponse.json({ processed: 0, message: "No hay reservas pendientes" })
  }

  let successCount = 0
  let errorCount = 0

  for (const booking of bookings) {
    try {
      await notifyBooking(booking)

      const { error: updateOkError } = await supabaseServer
        .from("bookings")
        .update({
          status: "notified",
          notified_at: new Date().toISOString(),
          notification_error_message: null
        })
        .eq("id", booking.id)

      if (updateOkError) {
        console.error("[Worker] Error al actualizar booking a notified:", updateOkError)
        errorCount++
      } else {
        successCount++
      }
    } catch (err: any) {
      console.error("[Worker] Error notificando booking:", err)

      const { error: updateErr } = await supabaseServer
        .from("bookings")
        .update({
          status: "notification_error",
          notification_error_message: String(err?.message || err)
        })
        .eq("id", booking.id)

      if (updateErr) {
        console.error("[Worker] Error al actualizar booking a notification_error:", updateErr)
      }

      errorCount++
    }
  }

  return NextResponse.json({
    processed: bookings.length,
    success: successCount,
    errors: errorCount
  })
}
