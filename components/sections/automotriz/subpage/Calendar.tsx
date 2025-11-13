"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge";

type FormState = "idle" | "loading" | "success" | "error"
const badgeText = "Agenda tu cita"

export function SubCalendar() {
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [formState, setFormState] = useState<FormState>("idle")
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        plate: "",
        email: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Available time slots (would come from backend)
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

    const handleDateChange = (date: string) => {
        setSelectedDate(date)
        setSelectedTime("")
        // CONNECT: Fetch available time slots from backend/Calendly API
        setIsLoadingSlots(true)
        setTimeout(() => setIsLoadingSlots(false), 800)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
        if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
        else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = "Ingresa un número de WhatsApp válido para confirmarte la cita."
        }
        if (!formData.plate.trim()) newErrors.plate = "La placa es requerida"
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
            }, 5000)
        } catch (error) {
            setFormState("error")
        }
    }

    return (
        <section id="calendar" className="py-12 sm:py-16 lg:py-16 bg-white scroll-mt-20" aria-labelledby="calendar-heading">
            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 id="calendar-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
                        Agenda con nosotros
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] text-pretty">
                        Elige día y hora. Confirmación inmediata.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[#543fb2]/5 to-[#8acbef]/5 p-6 sm:p-8 rounded-[var(--radius)] shadow-[var(--shadow-3)]">
                    {formState === "success" ? (
                        <div className="text-center py-12">
                            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
                            <h3 className="text-2xl font-bold mb-2">¡Listo! Te contactaremos en menos de 10 minutos.</h3>
                            <p className="text-[var(--color-text-muted)]">Revisa tu WhatsApp para la confirmación final.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6" aria-busy={formState === "loading"}>
                            {/* Date and Time Selection */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                                        Fecha
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="h-12"
                                        aria-invalid={!!errors.date}
                                        aria-describedby={errors.date ? "date-error" : undefined}
                                    />
                                    {errors.date && (
                                        <p id="date-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                                        <Clock className="h-4 w-4" aria-hidden="true" />
                                        Hora
                                    </Label>
                                    {isLoadingSlots ? (
                                        <div className="h-12 skeleton" aria-label="Cargando horarios disponibles" />
                                    ) : (
                                        <select
                                            id="time"
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            disabled={!selectedDate}
                                            className="w-full h-12 px-3 border border-[var(--color-border)] rounded-[var(--radius)] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                            aria-invalid={!!errors.time}
                                            aria-describedby={errors.time ? "time-error" : undefined}
                                        >
                                            <option value="">Selecciona una hora</option>
                                            {timeSlots.map((slot) => (
                                                <option key={slot} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {errors.time && (
                                        <p id="time-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.time}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Deposit info */}
                            <div className="p-4 bg-[var(--color-accent)]/10 border-l-4 border-[var(--color-accent)] rounded-[var(--radius)]">
                                <p className="text-sm font-medium">Reserva tu cita con $20 — reembolsable o descontable del total.</p>
                            </div>

                            {/* Contact Form */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Nombre completo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12 mt-1"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone">WhatsApp</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="0999999999"
                                        className="h-12 mt-1"
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? "phone-error" : undefined}
                                    />
                                    {errors.phone && (
                                        <p id="phone-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="plate">Placa del vehículo</Label>
                                    <Input
                                        id="plate"
                                        type="text"
                                        value={formData.plate}
                                        onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                                        placeholder="ABC-1234"
                                        className="h-12 mt-1"
                                        aria-invalid={!!errors.plate}
                                        aria-describedby={errors.plate ? "plate-error" : undefined}
                                    />
                                    {errors.plate && (
                                        <p id="plate-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.plate}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="tu@email.com"
                                        className="h-12 mt-1"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Privacy notice */}
                            <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <p>Nunca compartiremos tu información. Usamos tus datos solo para coordinar tu cita.</p>
                            </div>

                            {/* Submit button */}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={formState === "loading"}
                                className="w-full h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
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
                                    className="p-4 bg-red-50 border border-red-200 rounded-[var(--radius)] text-sm text-red-800"
                                    role="alert"
                                >
                                    Hubo un error al procesar tu reserva. Por favor intenta nuevamente o contáctanos por WhatsApp.
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
export default SubCalendar