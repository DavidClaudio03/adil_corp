"use client"

import { useState } from "react"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BankAccountInfo, DEPOSIT_AMOUNT } from "@/config/payment"
import { PaymentProofField } from "./PaymentProofField"
import "@/app/globals.css"

interface BankTransferSectionProps {
    account: BankAccountInfo
    paymentProofFile: File | null
    paymentProofError?: string
    onPaymentProofChange: (file: File | null) => void
}

export function BankTransferSection({
    account,
    paymentProofFile,
    paymentProofError,
    onPaymentProofChange
}: BankTransferSectionProps) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="space-y-3 rounded-[var(--radius)] border border-[var(--color-accent)]/50 bg-[var(--color-accent)]/8 p-3 sm:p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-1">
                        Paso 2 · Pago por transferencia
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-900">
                        Reserva tu cita con{" "}
                        <span className="text-[var(--color-primary)] font-semibold">
                            ${DEPOSIT_AMOUNT}
                        </span>{" "}
                        mediante transferencia bancaria.
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                        Realiza la transferencia desde la app de tu banco y luego sube la captura del comprobante.
                    </p>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowDetails((prev) => !prev)}
                    className={[
                        "h-8 px-2 text-[11px] whitespace-nowrap",
                        "border-[var(--color-primary)] text-[var(--color-primary)] bg-white/90 shadow-sm",
                        "hover:bg-[var(--color-primary)]/5 hover:shadow-md transition-all duration-200",
                        !showDetails ? "border-animated" : "" // solo anima cuando los datos están ocultos
                    ].join(" ")}
                >
                    <Info className="h-3.5 w-3.5 mr-1" />
                    {showDetails ? "Ocultar datos" : "Ver datos"}
                    {showDetails ? (
                        <ChevronUp className="h-3 w-3 ml-1" />
                    ) : (
                        <ChevronDown className="h-3 w-3 ml-1" />
                    )}
                </Button>

            </div>

            {showDetails && (
                <div className="rounded-[var(--radius)] bg-white/90 border border-[var(--color-border)]/70 p-3 text-xs sm:text-sm space-y-1.5">
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">Titular:</span>
                        <span className="font-medium text-right">{account.holderName}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">Cédula/RUC:</span>
                        <span className="font-medium text-right">{account.idNumber}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">Banco:</span>
                        <span className="font-medium text-right">{account.bankName}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">Tipo de cuenta:</span>
                        <span className="font-medium text-right">{account.accountType}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">N.º de cuenta:</span>
                        <span className="font-mono font-semibold text-right">
                            {account.accountNumber}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">Correo de pagos:</span>
                        <span className="font-medium text-right break-all">{account.email}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-[var(--color-text-muted)]">WhatsApp:</span>
                        <span className="font-medium text-right">{account.phone}</span>
                    </div>

                    {account.referenceNote && (
                        <p className="mt-2 text-[10px] text-[var(--color-primary)] bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-[var(--radius)] px-2 py-1.5">
                            {account.referenceNote}
                        </p>
                    )}
                </div>
            )}

            {/* Subida de comprobante bien visible dentro de la misma sección de pago */}
            <PaymentProofField
                file={paymentProofFile}
                error={paymentProofError}
                onFileChange={onPaymentProofChange}
            />
        </div>
    )
}
