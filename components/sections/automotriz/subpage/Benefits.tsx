"use client"

import { Clock, Shield, Zap, Users, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const badgeText = "Beneficios"

const benefits = [
    {
        icon: Clock,
        title: "Ahorra hasta 5+ horas",
        description: "Servicio puerta a puerta y preparación técnica completa para tu vehículo.",
        category: "Tiempo",
        extra: "Ideal si tienes una agenda ajustada y no puedes perder medio día en filas."
    },
    {
        icon: Shield,
        title: "Mayor seguridad",
        description: "Detectamos fallas básicas antes de tu turno oficial y las corregimos con tu autorización.",
        category: "Confianza",
        extra: "Revisamos frenos, luces, neumáticos y más para que tu vehículo esté en óptimas condiciones."
    },
    {
        icon: Zap,
        title: "Proceso claro",
        description: "Recibes un informe técnico antes y después de las correcciones básicas.",
        category: "Transparencia",
        extra: "Coordinamos horarios y trámites para reducir al máximo los tiempos muertos."
    },
    {
        icon: Users,
        title: "Soporte personalizado",
        description: "Un asesor te guía por WhatsApp hasta el día de tu turno oficial.",
        category: "Acompañamiento",
        extra: "Resolvemos tus dudas y te mantenemos informado en cada etapa del proceso."
    },
]

export function SubBenefits() {
    return (
        <section
            className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
            aria-labelledby="benefits-heading"
        >
            {/* Halos de fondo suaves (manteniendo fondo claro) */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-[-3rem] h-56 w-56 rounded-full bg-[var(--color-primary)]/8 blur-3xl" />
                <div className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-[#8acbef]/12 blur-3xl" />
            </div>

            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <h2
                        id="benefits-heading"
                        className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-3"
                    >
                        Beneficios de nuestro servicio técnico
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-[60ch] mx-auto">
                        Cada detalle está pensado para que llegues a la Revisión Técnica Vehicular sin sorpresas, con tu vehículo preparado correctamente.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon
                        return (
                            <article
                                key={index}
                                className="group relative h-full"
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                {/* Glow y borde animado al hover */}
                                <div className="pointer-events-none absolute -inset-[1px] rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-[var(--color-primary)]/0 via-[#8acbef]/0 to-[#ED0086]/0 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-80 group-hover:from-[var(--color-primary)]/20 group-hover:via-[#8acbef]/15 group-hover:to-[#ED0086]/15" />

                                <div className="relative h-full p-6 bg-white/90 border border-[var(--color-border)] rounded-[var(--radius)] shadow-[var(--shadow-1)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                                    {/* Cabecera: icono + badge */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/8 transition-all duration-300 group-hover:bg-[var(--color-primary)]/15 group-hover:scale-105">
                                                <Icon
                                                    className="h-6 w-6 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900 text-pretty">
                                                    {benefit.title}
                                                </h3>
                                                <span className="text-[11px] font-medium rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 text-[var(--color-primary)] px-2 py-0.5 whitespace-nowrap">
                                                    {benefit.category}
                                                </span>
                                            </div>
                                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed text-pretty">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Línea que se revela al hover */}
                                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Texto extra que aparece/desaparece */}
                                    <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {benefit.extra}
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SubBenefits;
