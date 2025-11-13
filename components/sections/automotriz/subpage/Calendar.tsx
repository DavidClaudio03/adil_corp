"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { CalendarIcon, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge";

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
        // CONNECT: Fetch available time slots from backend/Calendly API
        setIsLoadingSlots(true)
        setTimeout(() => setIsLoadingSlots(false), 800)
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

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState("loading")

        // CONNECT: Submit to backend API or Calendly
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setFormState("success")

            // Reset form after success
            setTimeout(() => {
                setFormState("idle")
                setFormData({ name: "", phone: "", plate: "", email: "" })
                setSelectedDate("")
                setSelectedTime("")
                setErrors({})
            }, 5000)
        } catch {
            setFormState("error")
        }
    }

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
                        Elige día y hora, ingresa tus datos y confirma. Te contactaremos por WhatsApp en
                        minutos.
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
                                ¡Listo! Tu solicitud de reserva fue enviada.
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-[40ch] mx-auto">
                                Te contactaremos por WhatsApp para confirmar la hora exacta y enviarte los
                                detalles de pago del depósito.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)] items-start">
                            {/* Columna izquierda: info y resumen */}
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
                                                <p className="font-medium text-gray-900">Ingresa tus datos</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">
                                                    Usamos tu WhatsApp y email solo para coordinar tu cita.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold">
                                                3
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">Confirmación y depósito</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">
                                                    Te confirmamos por WhatsApp y te indicamos cómo pagar el depósito de{" "}
                                                    <span className="font-semibold">$20</span>.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                {/* Resumen de reserva */}
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
                                            <span className="font-medium text-gray-900">$20</span>
                                        </p>
                                    </div>
                                    <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">
                                        El depósito se descuenta del valor total de tu servicio el día de la cita.
                                    </p>
                                </div>

                                {/* Aviso privacidad */}
                                <div className="flex items-start gap-2 text-[11px] text-[var(--color-text-muted)]">
                                    <AlertCircle
                                        className="h-4 w-4 flex-shrink-0 mt-0.5"
                                        aria-hidden="true"
                                    />
                                    <p>
                                        Protegemos tus datos. No los compartimos con terceros y solo los usamos para
                                        coordinar tu servicio de Revisión Técnica Vehicular.
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

                                {/* Info depósito */}
                                <div className="p-3 rounded-[var(--radius)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/60 text-xs sm:text-sm">
                                    <p className="font-medium text-gray-900">
                                        Reserva tu cita con <span className="text-[var(--color-primary)]">$20</span>.
                                    </p>
                                    <p className="text-[var(--color-text-muted)]">
                                        Monto reembolsable o descontable del total el día de tu revisión.
                                    </p>
                                </div>

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
                                                setFormData((prev) => ({ ...prev, phone: normalizePhone(e.target.value) }))
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

                                {/* Aviso de seguridad / privacidad ya reforzado arriba, aquí solo recordatorio */}
                                <div className="flex items-start gap-2 text-[11px] text-[var(--color-text-muted)]">
                                    <CheckCircle2
                                        className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500"
                                        aria-hidden="true"
                                    />
                                    <p>
                                        Tus datos viajan cifrados (HTTPS) y se usan únicamente para coordinar y
                                        confirmar tu cita.
                                    </p>
                                </div>

                                {/* Botón enviar */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={formState === "loading"}
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
