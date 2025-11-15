"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

type FormState = "idle" | "loading" | "success" | "error"
const badgeText = "Agenda tu cita"

// Horarios permitidos
const timeSlots = ["07:00", "08:00", "09:00", "10:00", "11:00"]

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 10)

const normalizePlate = (value: string) =>
    value
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, "")
        .slice(0, 8)

const toISODateLocal = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
}

const stripTime = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
}

export function SubCalendar() {
    const [selectedDate, setSelectedDate] = useState("") // YYYY-MM-DD
    const [selectedTime, setSelectedTime] = useState("")
    const [formState, setFormState] = useState<FormState>("idle")
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)

    const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)

    const selectedDateObj = useMemo(
        () => (selectedDate ? stripTime(new Date(selectedDate)) : undefined),
        [selectedDate]
    )

    // Fecha corta para el botón del calendario
    const formattedSelectedDate = useMemo(() => {
        if (!selectedDateObj) return ""
        return new Intl.DateTimeFormat("es-EC", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(selectedDateObj)
    }, [selectedDateObj])

    // Fecha larga para el resumen (izquierda)
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

    useEffect(() => {
        let cancelled = false

        const loadAvailability = async () => {
            setIsLoadingAvailability(true)
            try {
                const today = stripTime(new Date())
                const plusTwoMonths = new Date(today)
                plusTwoMonths.setMonth(plusTwoMonths.getMonth() + 2)

                const from = toISODateLocal(today)
                const to = toISODateLocal(plusTwoMonths)

                const res = await fetch(
                    `/api/automotriz/disponibilidad?from=${from}&to=${to}`
                )

                if (!res.ok) {
                    console.error("[Disponibilidad] Respuesta no OK:", res.status)
                    return
                }

                const data: { bookedDates?: string[] } = await res.json()
                if (!cancelled && data.bookedDates) {
                    setBookedDates(new Set(data.bookedDates))
                }
            } catch (err) {
                console.error("[Disponibilidad] Error al cargar:", err)
            } finally {
                if (!cancelled) setIsLoadingAvailability(false)
            }
        }

        loadAvailability()
        return () => {
            cancelled = true
        }
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        plate: "",
        email: ""
    })

    const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) {
            setSelectedDate("")
            setSelectedTime("")
            return
        }

        const clean = stripTime(date)
        const iso = toISODateLocal(clean)

        if (bookedDates.has(iso)) {
            setSelectedDate("")
            setSelectedTime("")
            setErrors((prev) => ({
                ...prev,
                date: "Lo sentimos, ese día ya está reservado por completo."
            }))
            return
        }

        setSelectedDate(iso)
        setSelectedTime("")
        setErrors((prev) => ({ ...prev, date: "" }))

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
        else if (bookedDates.has(selectedDate)) {
            newErrors.date = "Ese día ya está reservado. Elige otra fecha."
        }

        if (!selectedTime) newErrors.time = "Selecciona una hora"

        if (!paymentProofFile) {
            newErrors.paymentProof =
                "Debes subir la captura del comprobante para confirmar tu reserva."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState("loading")

        try {
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
            id="booking-calendar"
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
                        <div className="text-center py-10 sm:py-12" aria-live="polite">
                            <CheckCircle2
                                className="h-16 w-16 text-emerald-500 mx-auto mb-4"
                                aria-hidden="true"
                            />
                            <h3 className="text-2xl font-bold mb-2">
                                ¡Listo! Tu reserva fue enviada.
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-[40ch] mx-auto">
                                Revisaremos el comprobante y te confirmaremos por WhatsApp y correo el estado
                                de tu cita.
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
                                                <p className="font-medium text-gray-900">
                                                    Sube el comprobante y confirma
                                                </p>
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
                                        Nunca te pediremos claves, tokens ni códigos de tu banco. Solo verificamos
                                        el comprobante que tú adjuntas.
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
                                        <Label className="flex items-center gap-2 mb-1.5">
                                            <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                                            Fecha
                                        </Label>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-full h-11 px-3 text-xs sm:text-sm flex items-center justify-between gap-2"
                                                    aria-invalid={!!errors.date}
                                                    aria-describedby={errors.date ? "date-error" : undefined}
                                                >
                                                    <span className="flex-1 text-left truncate">
                                                        {selectedDateObj ? (
                                                            formattedSelectedDate
                                                        ) : (
                                                            <span className="text-gray-400">
                                                                Selecciona una fecha
                                                            </span>
                                                        )}
                                                    </span>
                                                    <CalendarIcon className="h-4 w-4 opacity-70 flex-shrink-0" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                align="start"
                                                className="p-2 bg-white rounded-[var(--radius)] border border-[var(--color-border)] shadow-lg"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDateObj}
                                                    onSelect={handleDateSelect}
                                                    initialFocus
                                                    // Deshabilitar días pasados y días ocupados
                                                    disabled={(date) => {
                                                        const d = stripTime(date)
                                                        const today = stripTime(new Date())
                                                        const iso = toISODateLocal(d)
                                                        return d < today || bookedDates.has(iso)
                                                    }}
                                                    modifiers={{
                                                        booked: (date) => {
                                                            const iso = toISODateLocal(stripTime(date))
                                                            return bookedDates.has(iso)
                                                        },
                                                        available: (date) => {
                                                            const d = stripTime(date)
                                                            const today = stripTime(new Date())
                                                            const iso = toISODateLocal(d)
                                                            return d >= today && !bookedDates.has(iso)
                                                        }
                                                    }}
                                                    modifiersClassNames={{
                                                        booked:
                                                            "bg-red-500 text-white hover:bg-red-500 hover:text-white opacity-70 cursor-not-allowed",
                                                        available:
                                                            "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
                                                    }}
                                                    className="rounded-[var(--radius)]"
                                                />
                                                <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                                                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1" />
                                                    Días en rojo: ya reservados.{" "}
                                                    <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 mr-1 ml-2" />
                                                    Días en verde: disponibles.
                                                </p>
                                            </PopoverContent>
                                        </Popover>

                                        {isLoadingAvailability && !errors.date && (
                                            <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                                Comprobando disponibilidad…
                                            </p>
                                        )}

                                        {selectedDate &&
                                            !bookedDates.has(selectedDate) &&
                                            !errors.date && (
                                                <p className="text-xs text-emerald-600 mt-1">
                                                    Día disponible para agendar.
                                                </p>
                                            )}

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
                                                    const isDisabled =
                                                        !selectedDate || bookedDates.has(selectedDate)

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
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value.trim()
                                                }))
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
                                        Tus datos y comprobantes se procesan en servidores seguros. No
                                        almacenamos claves ni tokens bancarios, solo el comprobante que tú
                                        adjuntas.
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
                                        Hubo un error al procesar tu reserva. Por favor intenta nuevamente o
                                        contáctanos por WhatsApp.
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
