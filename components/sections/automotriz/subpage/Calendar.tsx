"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { CalendarIcon, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    BANK_ACCOUNT,
    DEPOSIT_AMOUNT,
    ACCEPTED_FILE_TYPES,
    MAX_FILE_SIZE_BYTES
} from "@/config/payment"
import { BankTransferSection } from "./calendar/BankTransferSection"
import { BookingSummary } from "./calendar/BookingSummary"

type FormState = "idle" | "loading" | "success" | "error"
const badgeText = "Agenda tu cita"

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 10)

const normalizePlate = (value: string) =>
    value
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, "")
        .slice(0, 8)

export function SubCalendar() {
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [formState, setFormState] = useState<FormState>("idle")
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        plate: "",
        email: ""
    })

    const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const formattedDate = useMemo(() => {
        if (!selectedDate) return ""
        try {
            return new Intl.DateTimeFormat("es-EC", {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }).format(new Date(selectedDate))
        } catch {
            return selectedDate
        }
    }, [selectedDate])

    const handleDateChange = (date: string) => {
        setSelectedDate(date)
        setSelectedTime("")
        setErrors((prev) => ({ ...prev, date: "" }))

        // CONNECT: aquí iría la consulta a Supabase / backend para timeSlots reales
        setIsLoadingSlots(true)
        setTimeout(() => setIsLoadingSlots(false), 800)
    }

    const handlePaymentProofChange = (file: File | null) => {
        if (!file) {
            setPaymentProofFile(null)
            setErrors((prev) => ({
                ...prev,
                paymentProof: "Debes subir la captura del comprobante para confirmar tu reserva."
            }))
            return
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type as (typeof ACCEPTED_FILE_TYPES)[number])) {
            setPaymentProofFile(null)
            setErrors((prev) => ({
                ...prev,
                paymentProof: "Formato no permitido. Usa imagen o PDF."
            }))
            return
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            setPaymentProofFile(null)
            setErrors((prev) => ({
                ...prev,
                paymentProof: "El archivo supera el tamaño máximo permitido."
            }))
            return
        }

        setPaymentProofFile(file)
        setErrors((prev) => {
            const { paymentProof, ...rest } = prev
            return rest
        })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = "El nombre es requerido"

        const phoneDigits = normalizePhone(formData.phone)
        if (!phoneDigits) {
            newErrors.phone = "El teléfono es requerido"
        } else if (!/^[0-9]{10}$/.test(phoneDigits)) {
            newErrors.phone = "Ingresa un número de WhatsApp válido de 10 dígitos."
        }

        const plateValue = normalizePlate(formData.plate)
        if (!plateValue) {
            newErrors.plate = "La placa es requerida"
        } else if (!/^[A-Z]{3}-?[0-9]{3,4}$/.test(plateValue)) {
            newErrors.plate = "Formato de placa inválido. Ejemplo: ABC-1234"
        }

        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingresa un email válido"
        }

        if (!selectedDate) newErrors.date = "Selecciona una fecha"
        if (!selectedTime) newErrors.time = "Selecciona una hora"

        if (!paymentProofFile) {
            newErrors.paymentProof = "Debes subir la captura del comprobante para confirmar tu reserva."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState("loading")

        try {
            // CONNECT (seguro y rápido):
            // Aquí debes llamar a tu endpoint de Next (/api/automotriz/reservas)
            // que haga:
            // 1. Subir el archivo a Supabase Storage.
            // 2. Guardar en BD (Supabase).
            // 3. Enviar email + WhatsApp.
            const payload = new FormData()
            payload.append("name", formData.name.trim())
            payload.append("phone", normalizePhone(formData.phone))
            payload.append("plate", normalizePlate(formData.plate))
            payload.append("email", formData.email.trim())
            payload.append("date", selectedDate)
            payload.append("time", selectedTime)
            payload.append("depositAmount", String(DEPOSIT_AMOUNT))

            if (paymentProofFile) {
                payload.append("paymentProof", paymentProofFile)
            }

            const response = await fetch("/api/automotriz/reservas", {
                method: "POST",
                body: payload
            })

            if (!response.ok) {
                throw new Error("Error al procesar la reserva")
            }

            setFormState("success")

            setTimeout(() => {
                setFormState("idle")
                setFormData({ name: "", phone: "", plate: "", email: "" })
                setSelectedDate("")
                setSelectedTime("")
                setPaymentProofFile(null)
                setErrors({})
            }, 5000)
        } catch (error) {
            console.error(error)
            setFormState("error")
        }
    }

    const isSubmitDisabled = formState === "loading" || !paymentProofFile

    return (
        <section
            id="calendar"
            className="relative py-12 sm:py-16 lg:py-16 bg-white scroll-mt-20 overflow-hidden"
            aria-labelledby="calendar-heading"
        >
            {/* Fondos suaves */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-[-3rem] h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
                <div className="absolute bottom-[-5rem] right-[-3rem] h-64 w-64 rounded-full bg-[#8acbef]/18 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/25 to-transparent" />
            </div>

            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-10">
                    <h2
                        id="calendar-heading"
                        className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-3"
                    >
                        Agenda con nosotros
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[50ch] mx-auto">
                        Elige día y hora, ingresa tus datos, realiza la transferencia y sube el comprobante.
                        Te confirmamos por WhatsApp.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[#543fb2]/7 to-[#8acbef]/10 p-5 sm:p-7 lg:p-8 rounded-[var(--radius)] shadow-[var(--shadow-3)] border border-white/60 backdrop-blur">
                    {formState === "success" ? (
                        <div
                            className="text-center py-10 sm:py-12"
                            aria-live="polite"
                        >
                            <CheckCircle2
                                className="h-16 w-16 text-emerald-500 mx-auto mb-4"
                                aria-hidden="true"
                            />
                            <h3 className="text-2xl font-bold mb-2">
                                ¡Listo! Tu reserva fue enviada.
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-[40ch] mx-auto">
                                Revisaremos el comprobante y te confirmaremos por WhatsApp y correo el estado de tu cita.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)] items-start">
                            {/* Columna izquierda: info + resumen */}
                            <div className="space-y-5">
                                {/* Stepper simple */}
                                <div className="rounded-[var(--radius)] bg-white/90 border border-[var(--color-border)]/70 p-4 shadow-sm">
                                    <p className="text-xs font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-3">
                                        ¿Cómo funciona?
                                    </p>
                                    <ol className="space-y-3 text-sm">
                                        <li className="flex gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold">
                                                1
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">Elige fecha y hora</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">
                                                    Solo mostramos horarios dentro de nuestra disponibilidad real.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold">
                                                2
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">Realiza la transferencia</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">
                                                    Usa los datos de la cuenta bancaria y guarda la captura del comprobante.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold">
                                                3
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">Sube el comprobante y confirma</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">
                                                    Validamos el pago y te confirmamos por WhatsApp y correo.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                <BookingSummary
                                    formattedDate={formattedDate}
                                    selectedTime={selectedTime}
                                    depositAmount={DEPOSIT_AMOUNT}
                                />

                                <div className="flex items-start gap-2 text-[11px] text-[var(--color-text-muted)]">
                                    <AlertCircle
                                        className="h-4 w-4 flex-shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    <p>
                                        Nunca te pediremos claves, tokens ni códigos de tu banco. Solo verificamos el comprobante
                                        que tú adjuntas.
                                    </p>
                                </div>
                            </div>

                            {/* Columna derecha: formulario */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-white/95 rounded-[var(--radius)] border border-[var(--color-border)]/70 p-4 sm:p-5 shadow-sm"
                                aria-busy={formState === "loading"}
                            >
                                {/* Fecha y hora */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="date" className="flex items-center gap-2 mb-1.5">
                                            <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                                            Fecha
                                        </Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                            className="h-11 text-sm"
                                            aria-invalid={!!errors.date}
                                            aria-describedby={errors.date ? "date-error" : undefined}
                                            required
                                        />
                                        {errors.date && (
                                            <p
                                                id="date-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="time" className="flex items-center gap-2 mb-1.5">
                                            <Clock className="h-4 w-4" aria-hidden="true" />
                                            Hora
                                        </Label>

                                        {isLoadingSlots ? (
                                            <div
                                                className="h-11 w-full rounded-[var(--radius)] bg-gray-100 animate-pulse"
                                                aria-label="Cargando horarios disponibles"
                                            />
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {timeSlots.map((slot) => {
                                                    const isActive = selectedTime === slot
                                                    const isDisabled = !selectedDate
                                                    return (
                                                        <button
                                                            key={slot}
                                                            type="button"
                                                            disabled={isDisabled}
                                                            onClick={() => {
                                                                setSelectedTime(slot)
                                                                setErrors((prev) => ({ ...prev, time: "" }))
                                                            }}
                                                            className={[
                                                                "px-3 py-2 rounded-full text-xs sm:text-sm border transition-all duration-200",
                                                                "disabled:cursor-not-allowed disabled:opacity-60",
                                                                isActive
                                                                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                                                                    : "bg-white text-gray-800 border-[var(--color-border)] hover:bg-[var(--color-primary)]/5"
                                                            ].join(" ")}
                                                            aria-pressed={isActive}
                                                        >
                                                            {slot}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}

                                        {errors.time && (
                                            <p
                                                id="time-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.time}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Datos de pago (transferencia + comprobante) */}
                                <BankTransferSection
                                    account={BANK_ACCOUNT}
                                    paymentProofFile={paymentProofFile}
                                    paymentProofError={errors.paymentProof}
                                    onPaymentProofChange={handlePaymentProofChange}
                                />

                                {/* Datos de contacto */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">Nombre completo</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="h-11 mt-1 text-sm"
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                            required
                                        />
                                        {errors.name && (
                                            <p
                                                id="name-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">WhatsApp</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    phone: normalizePhone(e.target.value)
                                                }))
                                            }
                                            placeholder="0999999999"
                                            className="h-11 mt-1 text-sm"
                                            aria-invalid={!!errors.phone}
                                            aria-describedby={errors.phone ? "phone-error" : undefined}
                                            required
                                        />
                                        {errors.phone && (
                                            <p
                                                id="phone-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="plate">Placa del vehículo</Label>
                                        <Input
                                            id="plate"
                                            type="text"
                                            autoComplete="off"
                                            value={formData.plate}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    plate: normalizePlate(e.target.value)
                                                }))
                                            }
                                            placeholder="ABC-1234"
                                            className="h-11 mt-1 text-sm tracking-[0.08em]"
                                            aria-invalid={!!errors.plate}
                                            aria-describedby={errors.plate ? "plate-error" : undefined}
                                            required
                                        />
                                        {errors.plate && (
                                            <p
                                                id="plate-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.plate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, email: e.target.value.trim() }))
                                            }
                                            placeholder="tu@email.com"
                                            className="h-11 mt-1 text-sm"
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                            required
                                        />
                                        {errors.email && (
                                            <p
                                                id="email-error"
                                                className="text-xs text-red-600 mt-1"
                                                role="alert"
                                            >
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Aviso de seguridad */}
                                <div className="flex items-start gap-2 text-[11px] text-[var(--color-text-muted)]">
                                    <CheckCircle2
                                        className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500"
                                        aria-hidden="true"
                                    />
                                    <p>
                                        Tus datos y comprobantes se procesan en servidores seguros. No almacenamos claves ni
                                        tokens bancarios, solo el comprobante que tú adjuntas.
                                    </p>
                                </div>

                                {/* Botón enviar */}
                                <div className="space-y-1">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isSubmitDisabled}
                                        className="w-full h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.4)] hover:-translate-y-0.5"
                                        data-analytics="cta_calendar_confirmar"
                                    >
                                        {formState === "loading" ? (
                                            <>
                                                <span
                                                    className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                                                    aria-hidden="true"
                                                />
                                                Procesando...
                                            </>
                                        ) : (
                                            "Confirmar reserva"
                                        )}
                                    </Button>
                                    {!paymentProofFile && (
                                        <p className="text-[11px] text-center text-[var(--color-text-muted)]">
                                            Sube la captura del comprobante para habilitar la confirmación.
                                        </p>
                                    )}
                                </div>

                                {formState === "error" && (
                                    <div
                                        className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius)] text-xs sm:text-sm text-red-800"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        Hubo un error al procesar tu reserva. Por favor intenta nuevamente o contáctanos por
                                        WhatsApp.
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SubCalendar
