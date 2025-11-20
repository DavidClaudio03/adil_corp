import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Puedes pasar ?from=YYYY-MM-DD&to=YYYY-MM-DD, pero damos valores por defecto
  const fromParam = searchParams.get("from")
  const toParam = searchParams.get("to")

  const today = new Date()
  const defaultFrom = today.toISOString().split("T")[0]

  const plusTwoMonths = new Date()
  plusTwoMonths.setMonth(plusTwoMonths.getMonth() + 2)
  const defaultTo = plusTwoMonths.toISOString().split("T")[0]

  const from = fromParam || defaultFrom
  const to = toParam || defaultTo

  try {
    const { data, error } = await supabaseServer
      .from("bookings")
      .select("date, status")
      .gte("date", from)
      .lte("date", to)
      .in("status", ["pending_notification", "notified", "notification_error"])

    if (error) {
      console.error("[Disponibilidad] Error al consultar Supabase:", error)
      return NextResponse.json(
        { bookedDates: [], error: "Error al consultar disponibilidad" },
        { status: 500 }
      )
    }

    // Un solo cliente por día: si existe cualquier reserva ese día, lo bloqueamos
    const bookedDates = Array.from(
      new Set((data || []).map((row: any) => row.date as string))
    )

    return NextResponse.json({ bookedDates }, { status: 200 })
  } catch (err) {
    console.error("[Disponibilidad] Error inesperado:", err)
    return NextResponse.json(
      { bookedDates: [], error: "Error inesperado" },
      { status: 500 }
    )
  }
}
