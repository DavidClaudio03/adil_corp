"use client"

import { CheckCircle2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    ACCEPTED_FILE_EXTENSIONS,
    MAX_FILE_SIZE_MB
} from "@/config/payment"

interface PaymentProofFieldProps {
    file: File | null
    error?: string
    onFileChange: (file: File | null) => void
}

export function PaymentProofField({ file, error, onFileChange }: PaymentProofFieldProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0] ?? null
        onFileChange(newFile)
    }

    return (
        <div className="space-y-1.5">
            <Label htmlFor="payment-proof" className="flex items-center gap-2 text-sm font-medium">
                Comprobante de transferencia
                <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] text-[var(--color-primary)]">
                    Obligatorio
                </span>
            </Label>

            <Input
                id="payment-proof"
                type="file"
                accept={ACCEPTED_FILE_EXTENSIONS}
                onChange={handleChange}
                className="h-11 text-xs sm:text-sm cursor-pointer border-dashed border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/3 hover:bg-[var(--color-primary)]/5 transition"
            />

            <p className="text-[11px] text-[var(--color-text-muted)]">
                Formatos permitidos: JPG, PNG, WEBP, HEIC, HEIF o PDF. Tamaño máximo {MAX_FILE_SIZE_MB} MB.
            </p>

            {file && !error && (
                <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Archivo seleccionado: <span className="font-medium truncate">{file.name}</span>
                </p>
            )}

            {error && (
                <p className="text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
