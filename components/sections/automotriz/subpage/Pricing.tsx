"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";

const badgeText = "Precios"

export function SubPricing() {
    const handleCTA = () => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section
            className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[var(--color-primary)]/5 to-white"
            aria-labelledby="pricing-heading"
        >
            {/* Fondos decorativos */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center opacity-50"
            >
                <div className="h-40 w-40 rounded-full bg-[var(--color-primary)]/15 blur-3xl" />
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end opacity-40"
            >
                <div className="h-32 w-32 rounded-full bg-[var(--color-accent)]/20 blur-3xl mr-6" />
            </div>

            {/* Badge */}
            <div className="text-center mb-4 relative z-10">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="text-center mb-10 sm:mb-12">
                    <h2
                        id="pricing-heading"
                        className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-3"
                    >
                        Precios claros, servicio ejecutivo
                    </h2>
                    <p className="text-lg text-muted max-w-[60ch] mx-auto">
                        Sin sorpresas ni costos ocultos. Tu revisión ejecutiva desde{" "}
                        <span className="font-semibold text-[var(--color-primary)]">$50</span> por vehículo.
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        Elige el plan que mejor se adapta a tu tiempo y a tu vehículo.
                    </p>
                </div>

                {/* Cards de precios */}
                <div className="grid gap-6 md:grid-cols-3 lg:gap-7 items-stretch">
                    {/* Servicio base */}
                    <article className="relative flex flex-col h-full rounded-3xl border border-white/60 bg-white/80 shadow-[var(--shadow-3)] backdrop-blur-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-3)]/80">
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)]/70 to-[var(--color-accent)]/60" />
                        <div className="flex-1 p-6 sm:p-7 flex flex-col">
                            <header className="mb-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Plan inicial
                                </p>
                                <h3 className="mt-1 text-xl font-semibold">
                                    Servicio base
                                </h3>
                            </header>

                            <div className="mb-4">
                                <span className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">$50</span>
                                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">
                                        / vehículo
                                    </span>
                                </span>
                                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                                    Informe de inspección técnico para conocer el estado real de tu vehículo.
                                </p>
                            </div>

                            <ul className="mt-2 space-y-2 text-sm text-[var(--color-text-muted)] flex-1">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Inspección visual y básica de sistemas clave.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Informe técnico digital con hallazgos principales.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Recomendaciones generales previas a RTV.</span>
                                </li>
                            </ul>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleCTA}
                                    className="w-full text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                                    data-analytics="cta_pricing_base"
                                >
                                    Elegir servicio base
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Servicio ejecutivo (destacado) */}
                    <article className="relative flex flex-col h-full rounded-3xl border border-[var(--color-primary)]/30 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/80 to-[var(--color-primary)]/95 text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] overflow-hidden scale-105 md:scale-110 md:-mt-4 transition-transform duration-300 hover:-translate-y-2">
                        <div className="absolute inset-x-6 top-4 flex justify-between items-center text-xs">
                            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-medium tracking-wide">
                                Más elegido
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/90 px-3 py-1 font-semibold">
                                Recomendado
                            </span>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] via-white to-[var(--color-accent)]" />

                        <div className="flex-1 p-6 sm:p-7 pt-10 flex flex-col">
                            <header className="mb-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                                    Servicio ejecutivo RTV
                                </p>
                                <h3 className="mt-1 text-2xl font-semibold">
                                    Servicio ejecutivo
                                </h3>
                            </header>

                            <div className="mb-4">
                                <span className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">$75</span>
                                    <span className="text-xs text-white/70 uppercase tracking-wide">
                                        / vehículo
                                    </span>
                                </span>
                                <p className="mt-2 text-sm text-white/80">
                                    Asesoría RTV + inspección completa + asesor dedicado para que pases la revisión sin filas ni estrés.
                                </p>
                            </div>

                            <ul className="mt-2 space-y-2 text-sm text-white/85 flex-1">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px]" />
                                    <span>Acompañamiento completo en todo el proceso de RTV.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px]" />
                                    <span>Diagnóstico electrónico y revisión profesional de sistemas críticos.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px]" />
                                    <span>Asesor dedicado que coordina horarios y gestiones por ti.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px]" />
                                    <span>Recomendaciones precisas para asegurar la aprobación.</span>
                                </li>
                            </ul>

                            <div className="mt-6">
                                <Button
                                    size="lg"
                                    onClick={handleCTA}
                                    className="w-full h-11 text-sm font-semibold bg-white text-[var(--color-primary)] hover:bg-[#f4f2ff] hover:text-[var(--color-primary)] transition-all duration-200 shadow-lg shadow-black/25"
                                    data-analytics="cta_pricing_ejecutivo"
                                >
                                    Agenda tu revisión ejecutiva
                                </Button>
                                <p className="mt-2 text-[11px] text-white/70 text-center">
                                    Ideal si quieres delegar todo el proceso y asegurarte de pasar RTV.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Revisión express */}
                    <article className="relative flex flex-col h-full rounded-3xl border border-white/60 bg-white/85 shadow-[var(--shadow-3)] backdrop-blur-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-3)]/80">
                        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)]/70 to-[var(--color-primary)]/60" />
                        <div className="flex-1 p-6 sm:p-7 flex flex-col">
                            <header className="mb-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Máxima prioridad
                                </p>
                                <h3 className="mt-1 text-xl font-semibold">
                                    Revisión express
                                </h3>
                            </header>

                            <div className="mb-4">
                                <span className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">$95</span>
                                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">
                                        / vehículo
                                    </span>
                                </span>
                                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                                    Aprobación de RTV por ti (previa autorización escrita). Tú eliges la fecha, nosotros hacemos el resto.
                                </p>
                            </div>

                            <ul className="mt-2 space-y-2 text-sm text-[var(--color-text-muted)] flex-1">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Gestión completa del turno y acompañamiento.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Te representamos en RTV con la documentación necesaria.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 mt-[2px] text-[var(--color-primary)]" />
                                    <span>Ideal si no tienes tiempo para hacer filas.</span>
                                </li>
                            </ul>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleCTA}
                                    className="w-full text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                                    data-analytics="cta_pricing_express"
                                >
                                    Quiero revisión express
                                </button>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Servicios adicionales */}
                <div className="mt-8 sm:mt-10 rounded-2xl border border-dashed border-[var(--color-border)] bg-white/80 px-4 py-4 sm:px-6 sm:py-5 shadow-[var(--shadow-1)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold">
                                Servicios adicionales y ajustes en sitio
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Reparaciones ligeras (focos, kit de emergencia, análisis de emisiones, etc.) se cotizan
                                según necesidad, siempre con tu aprobación previa.
                            </p>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[var(--color-primary)]">
                            Valores variables según repuestos y mano de obra.
                        </p>
                    </div>
                </div>

                {/* Indicadores de confianza */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="flex items-start gap-3 p-4 bg-white/85 rounded-2xl border border-white/60 shadow-[var(--shadow-1)]">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Métodos de pago flexibles</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Aceptamos efectivo, tarjeta y transferencias para tu comodidad.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/85 rounded-2xl border border-white/60 shadow-[var(--shadow-1)]">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Garantía de servicio</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                30 días de soporte post-revisión para dudas y ajustes menores.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/85 rounded-2xl border border-white/60 shadow-[var(--shadow-1)]">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Atención inmediata</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Soporte por WhatsApp y teléfono para coordinar tu cita sin complicaciones.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA principal */}
                <div className="mt-10 text-center">
                    <Button
                        size="lg"
                        onClick={handleCTA}
                        className="h-12 px-8 bg-primary hover:bg-[var(--color-primary-hover)] text-white transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-primary)]/30"
                        data-analytics="cta_pricing_agendar"
                    >
                        Agenda tu revisión ahora
                    </Button>
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                        Elige tu plan, reserva en línea y nosotros nos encargamos del resto.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SubPricing;
