"use client"

import { Calendar, MapPinHouse, Car, CheckCircle, BadgeCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const badgeText = "Proceso"

const steps = [
    {
        icon: Calendar,
        title: "Agenda tu cita",
        description: "Reserva tu servicio en línea con confirmación inmediata."
    },
    {
        icon: MapPinHouse,
        title: "Recogemos tu vehículo",
        description: "Vamos a tu ubicación y trasladamos el vehículo para su revisión."
    },
    {
        icon: Car,
        title: "Revisión inicial",
        description: "Evaluamos el estado real del vehículo según parámetros de la RTV."
    },
    {
        icon: CheckCircle,
        title: "Aprobación del cliente",
        description: "Te indicamos los correctivos necesarios y tú autorizas los trabajos."
    },
    {
        icon: BadgeCheck,
        title: "Mantenimientos y entrega final",
        description:
            "Realizamos los ajustes autorizados y entregamos el vehículo listo para RTV."
    }
]

export function SubProcess() {
    const [activeStep, setActiveStep] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const scrollProgress = entry.intersectionRatio
                        const stepIndex = Math.min(
                            Math.floor(scrollProgress * steps.length),
                            steps.length - 1
                        )
                        setActiveStep(stepIndex)
                    }
                })
            },
            { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const currentStep = steps[activeStep]

    return (
        <section
            ref={sectionRef}
            className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-[#f5f7ff] to-[#8acbef]/8 overflow-hidden"
            aria-labelledby="process-heading"
        >
            {/* Halos de fondo suaves */}
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

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <h2
                        id="process-heading"
                        className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-3"
                    >
                        Proceso simple en 5 pasos
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[60ch] mx-auto">
                        Pasos definitivos - claros, cortos y faciles de escanear para que tu vehículo esté listo para la RTV.
                    </p>
                </div>

                {/* Barra de progreso mejorada */}
                <div className="mb-10 sm:mb-12">
                    <div className="relative">
                        <div className="h-2 w-full rounded-full bg-gray-200/80 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[#8acbef] to-[secondary] transition-all duration-400 ease-out"
                                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                                role="progressbar"
                                aria-valuenow={((activeStep + 1) / steps.length) * 100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Progreso del proceso"
                            />
                        </div>

                        {/* Bolita del paso actual */}
                        <div
                            className="absolute -top-[6px] h-5 w-5 rounded-full bg-white border border-[var(--color-primary)] shadow-md flex items-center justify-center transition-transform duration-300"
                            style={{
                                left: `${(activeStep / (steps.length - 1)) * 100}%`,
                                transform: "translateX(-50%)"
                            }}
                        >
                            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-center text-[var(--color-text-muted)]">
                        Estás viendo el paso{" "}
                        <span className="font-semibold text-[var(--color-primary)]">
                            {activeStep + 1} de {steps.length}
                        </span>
                        : {currentStep.title}
                    </p>
                </div>

                {/* Layout: steps + detalle */}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
                    {/* Steps */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = index === activeStep
                            const isCompleted = index < activeStep

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveStep(index)}
                                    className="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-[var(--radius)]"
                                    style={{ transitionDelay: `${index * 40}ms` }}
                                >
                                    {/* Glow */}
                                    {isActive && (
                                        <div className="pointer-events-none absolute -inset-[1px] rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-[var(--color-primary)]/35 via-[secondary]/30 to-[secondary]/35 opacity-80 blur-md" />
                                    )}

                                    <div
                                        className={[
                                            "relative p-5 bg-white border rounded-[var(--radius)] shadow-[var(--shadow-1)] transition-all duration-300",
                                            "group-hover:-translate-y-1 group-hover:shadow-[0_16px_38px_rgba(15,23,42,0.18)]",
                                            isActive
                                                ? "border-[var(--color-primary)]/70"
                                                : isCompleted
                                                    ? "border-emerald-300/70"
                                                    : "border-[var(--color-border)]"
                                        ].join(" ")}
                                    >
                                        {/* Número de paso */}
                                        <div
                                            className={[
                                                "absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-[var(--shadow-2)]",
                                                isCompleted || isActive
                                                    ? "bg-[var(--color-primary)] text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            ].join(" ")}
                                        >
                                            {index + 1}
                                        </div>

                                        {/* Estado pequeño */}
                                        {(isCompleted || isActive) && (
                                            <span className="absolute -top-3 right-3 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 border border-emerald-100">
                                                {isCompleted ? "Listo" : "Ahora"}
                                            </span>
                                        )}

                                        <div className="flex flex-col items-center text-center">
                                            <div
                                                className={[
                                                    "flex h-14 w-14 items-center justify-center rounded-full mb-4 transition-all duration-300",
                                                    isActive
                                                        ? "bg-[var(--color-primary)] text-white scale-105"
                                                        : isCompleted
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-gray-100 text-gray-400 group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)]"
                                                ].join(" ")}
                                            >
                                                <Icon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            <h3 className="text-base font-semibold mb-2 text-gray-900 text-pretty">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-[var(--color-text-muted)] text-pretty">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Panel detalle del paso activo (solo en pantallas medianas+) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28 rounded-[var(--radius)] bg-white/95 border border-[var(--color-primary)]/25 shadow-[0_18px_45px_rgba(15,23,42,0.12)] p-5">
                            <p className="text-xs font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-2">
                                Detalle del paso {activeStep + 1}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {currentStep.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                {currentStep.description}
                            </p>
                            <ul className="space-y-1.5 text-xs text-[var(--color-text-muted)]">
                                {activeStep === 0 && (
                                    <>
                                        <li>• Selecciona la fecha y horario que más te convenga.</li>
                                        <li>• Completa los datos del vehículo y tu contacto para confirmar la recogida.</li>
                                        <li>• Recibirás la confirmación y los detalles por WhatsApp y correo.</li>
                                    </>
                                )}
                                {activeStep === 1 && (
                                    <>
                                        <li>• Deja las llaves y acceso al vehículo disponibles para el equipo.</li>
                                        <li>• Asegura un punto de encuentro claro y que el vehículo esté en condiciones de circular.</li>
                                        <li>• Recibirás un aviso de llegada y seguimiento por WhatsApp.</li>
                                    </>
                                )}
                                {activeStep === 2 && (
                                    <>
                                        <li>• Realizamos una inspección completa de luces, frenos, emisiones y seguridad.</li>
                                        <li>• Documentamos hallazgos con fotos y mediciones cuando aplica.</li>
                                        <li>• Te entregamos un diagnóstico inicial y recomendaciones de corrección.</li>
                                    </>
                                )}
                                {activeStep === 3 && (
                                    <>
                                        <li>• Te presentamos el informe técnico con los correctivos necesarios.</li>
                                        <li>• Acordamos qué trabajos autorizarás y el presupuesto estimado.</li>
                                        <li>• Firmas la autorización (digital o física) para proceder con las intervenciones.</li>
                                    </>
                                )}
                                {activeStep === 4 && (
                                    <>
                                        <li>• Realizamos los mantenimientos y ajustes autorizados.</li>
                                        <li>• Entregamos el informe final y comprobantes de trabajo realizados.</li>
                                        <li>• Devolvemos el vehículo y ofrecemos seguimiento post-servicio por 30 días.</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubProcess
