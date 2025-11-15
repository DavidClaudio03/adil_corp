"use client"

interface BookingSummaryProps {
    formattedDate: string
    selectedTime: string
    depositAmount: number
}

export function BookingSummary({ formattedDate, selectedTime, depositAmount }: BookingSummaryProps) {
    return (
        <div className="rounded-[var(--radius)] bg-white/90 border border-[var(--color-primary)]/25 p-4 shadow-sm">
            <p className="text-xs font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-2">
                Tu reserva
            </p>
            <div className="space-y-1 text-sm">
                <p className="flex justify-between gap-3">
                    <span className="text-[var(--color-text-muted)]">Fecha:</span>
                    <span className="font-medium text-gray-900">
                        {formattedDate || "Por seleccionar"}
                    </span>
                </p>
                <p className="flex justify-between gap-3">
                    <span className="text-[var(--color-text-muted)]">Hora:</span>
                    <span className="font-medium text-gray-900">
                        {selectedTime || "Por seleccionar"}
                    </span>
                </p>
                <p className="flex justify-between gap-3">
                    <span className="text-[var(--color-text-muted)]">Depósito:</span>
                    <span className="font-medium text-gray-900">
                        ${depositAmount}
                    </span>
                </p>
            </div>
            <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">
                El depósito se descuenta del valor total de tu servicio el día de la cita.
            </p>
        </div>
    )
}
