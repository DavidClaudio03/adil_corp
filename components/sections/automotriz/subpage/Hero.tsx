"use client"

import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubHeroAuto() {
    const handlePrimaryCTA = () => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
    }

    const handleWhatsAppCTA = () => {
        window.open(
            "https://wa.me/593996834173?text=Hola%20ADIL%20CORP,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
            "_blank"
        )
    }

    return (
        <header className="relative overflow-hidden bg-gradient-to-br from-[#543fb2]/5 to-[#8acbef]/5">
            {/* Fondos suaves / halos */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 -left-16 h-64 w-64 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
                <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-[#8acbef]/20 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-20 lg:px-8 lg:py-28 min-h-screen flex items-center">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-7">
                        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                            Aprueba tu RTV sin filas —
                            <span className="block text-[var(--color-primary)]">
                                agenda en minutos con nosotros
                            </span>
                        </h1>

                        <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[60ch]">
                            Coordinamos todo el proceso por ti: pre-revisión, trámites y aprobación.
                            Tú solo eliges el día y la hora, nosotros hacemos el resto.
                        </p>

                        {/* Mini-beneficios destacados */}
                        <div className="grid gap-3 sm:grid-cols-3 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[var(--color-primary)]" />
                                <span className="text-[13px] text-gray-800">
                                    Menos estrés, cero filas
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[var(--color-primary)]" />
                                <span className="text-[13px] text-gray-800">
                                    Acompañamiento ejecutivo
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[var(--color-primary)]" />
                                <span className="text-[13px] text-gray-800">
                                    Agenda rápida y clara
                                </span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <Button
                                size="lg"
                                onClick={handlePrimaryCTA}
                                className="group h-12 px-6 bg-primary hover:bg-[var(--color-primary-hover)] text-white transition-all duration-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.55)] hover:-translate-y-0.5"
                                data-analytics="cta_hero_agendar"
                            >
                                <span>Agenda tu revisión</span>
                                <span className="ml-2 inline-flex items-center transition-transform duration-200 group-hover:translate-x-1">
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleWhatsAppCTA}
                                className="h-12 px-6 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 bg-transparent hover:-translate-y-0.5 hover:shadow-md"
                                data-analytics="cta_hero_whatsapp"
                            >
                                Hablar por WhatsApp
                            </Button>
                        </div>
                    </div>

                    {/* Image + efectos */}
                    <div className="relative lg:pl-4">
                        {/* Glow degradado alrededor de la card */}
                        <div className="pointer-events-none absolute -inset-6 rounded-[var(--radius)] bg-gradient-to-br from-[var(--color-primary)]/30 via-[#8acbef]/30 to-[#ED0086]/25 opacity-60 blur-3xl" />

                        <div className="relative group">
                            {/* Card principal con zoom/hover */}
                            <div className="relative overflow-hidden rounded-[var(--radius)] bg-white shadow-[var(--shadow-3)] border border-white/80 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-[0_28px_65px_rgba(15,23,42,0.45)]">
                                <Image
                                    src="/sub-hero.jpg"
                                    alt="Centro de revisión técnica vehicular moderno"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-[1.03]"
                                    priority
                                    loading="eager"
                                    decoding="async"
                                />

                                {/* Overlay que aparece/desaparece */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Texto sobre la imagen que aparece al hover */}
                                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-xs text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                        <span className="font-medium">
                                            Gestionamos todo tu proceso de RTV
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/80">
                                        <span>Preparación, acompañamiento y revisión final incluida</span>
                                        <span className="hidden sm:inline">
                                            Tiempo promedio de gestión &lt; 24h*
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini card flotante: aprobación */}
                            <div className="hidden sm:flex absolute -left-3 top-6 items-center gap-2 rounded-xl bg-white/95 shadow-lg border border-[var(--color-border)]/60 px-3 py-2">
                                <div className="h-7 w-7 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                    <span className="text-[11px] font-semibold text-[var(--color-primary)]">
                                        98%
                                    </span>
                                </div>
                                <div className="text-[11px] leading-snug">
                                    <p className="font-semibold text-gray-900">Aprobación RTV</p>
                                    <p className="text-[10px] text-[var(--color-text-muted)]">
                                        Clientes recurrentes
                                    </p>
                                </div>
                            </div>

                            {/* Mini card flotante: cupos */}
                            <div className="hidden md:flex absolute -right-4 bottom-8 items-center gap-2 rounded-xl bg-white/95 shadow-lg border border-[var(--color-border)]/60 px-3 py-2">
                                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                                <p className="text-[11px] text-gray-900 font-medium">
                                    Cupos limitados esta semana
                                </p>
                            </div>
                        </div>

                        {/* Nota pequeña bajo la imagen */}
                        <p className="mt-3 text-[11px] text-[var(--color-text-muted)] text-right">
                            *Tiempos estimados según disponibilidad y calendario RTV oficial.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SubHeroAuto
