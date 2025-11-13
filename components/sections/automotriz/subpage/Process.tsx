"use client"

import { Calendar, FileCheck, Car, CheckCircle, Award } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge";

const badgeText = "Proceso";

const steps = [
    {
        icon: Calendar,
        title: "Agenda tu cita",
        description: "Elige fecha y hora en nuestro calendario. Confirmación inmediata.",
    },
    {
        icon: FileCheck,
        title: "Prepara documentos",
        description: "Matrícula vigente y cédula del propietario. Te enviamos checklist.",
    },
    {
        icon: Car,
        title: "Llega a tu turno",
        description: "Sin filas. Directo a inspección con tu asesor dedicado.",
    },
    {
        icon: CheckCircle,
        title: "Inspección rápida",
        description: "Revisión de parametros clave. Informe detallado al instante.",
    },
    {
        icon: Award,
        title: "Informe técnico",
        description: "Documento avala que el vehículo está en optimas condiciones para aprobar la RTV.",
    },
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
                        const stepIndex = Math.min(Math.floor(scrollProgress * steps.length), steps.length - 1)
                        setActiveStep(stepIndex)
                    }
                })
            },
            { threshold: Array.from({ length: 20 }, (_, i) => i / 20) },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white to-[#8acbef]/5"
            aria-labelledby="process-heading"
        >
            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 id="process-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
                        Proceso simple en 5 pasos
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[60ch] mx-auto">
                        De la reserva al certificado en menos de una hora
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="mb-12">
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-[var(--color-primary)] transition-all duration-300 ease-out"
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                            role="progressbar"
                            aria-valuenow={((activeStep + 1) / steps.length) * 100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Progreso del proceso"
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = index <= activeStep
                        return (
                            <div
                                key={index}
                                className={`relative p-6 bg-white border-2 rounded-[var(--radius)] shadow-[var(--shadow-1)] transition-all duration-300 ${isActive ? "border-[var(--color-primary)] shadow-[var(--shadow-3)]" : "border-[var(--color-border)]"
                                    }`}
                            >
                                {/* Step number */}
                                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold text-sm shadow-[var(--shadow-2)]">
                                    {index + 1}
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-full mb-4 transition-colors duration-300 ${isActive ? "bg-[var(--color-primary)] text-white" : "bg-gray-100 text-gray-400"
                                            }`}
                                    >
                                        <Icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-semibold mb-2 text-pretty">{step.title}</h3>
                                    <p className="text-sm text-[var(--color-text-muted)] text-pretty">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SubProcess;