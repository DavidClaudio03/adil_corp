"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { features } from "process";

const badgeText = "Precios"

const plans = [
    {
        id: "base",
        name: "Plan Ejecutivo RTV",
        tag: "Esencial",
        price: "$60",
        frequency: "por servicio",
        description: "Revisión técnica completa a domicilio para preparar tu vehículo bajo los parámetros oficiales.",
        recommended: false,
        highlight: "Incluye informes antes y después, correcciones básicas y recomendaciones detalladas para tu presentación en RTV.",
        featuresTitle: "Incluye:",
        features: [
            "Servicio puerta a puerta",
            "Revisión técnica completa (luces, emisiones, seguridad, niveles)",
            "Informe técnico previo",
            "Informe técnico posterior",
            "Asesoría continua por WhatsApp"
        ],
        excludesTitle: "No incluye:",
        excludesNote: "Reparaciones complejas de frenos, suspensión, motor, llantas o trabajos de desmontaje profundo.",
        extrasTitle: "Extras opcionales:",
        extrasNote: "Con autorización del cliente, podemos gestionar las correcciones adicionales necesarias para dejar el vehículo listo."
    },
    {
        id: "ejecutivo",
        name: "Plan Full Ejecutivo RTV",
        tag: "Más elegido",
        price: "$80",
        frequency: "por servicio",
        description: "Todo lo del Plan Ejecutivo RTV, más traslado del vehículo, acompañamiento técnico y presentación en el turno oficial.",
        recommended: true,
        featuresTitle: "Inluye:",
        features: [

            "Todo lo del Plan Ejecutivo RTV",
            "Traslado del vehículo a la estación de RTV",
            "Presentación en el turno asignado",
            "Gestión del turno si el cliente no lo tiene reservado",
            "Acompañamiento técnico durante la inspección",
            "Devolución del vehículo al domicilio"
        ],
        excludesTitle: "No incluye:",
        excludesNote: "Reparaciones complejas ni intervenciones dentro del centro RTV.",
        extrasTitle: "Extras opcionales:",
        extrasNote: "Con autorización del cliente, podemos realizar las correcciones necesarias para su posterior presentación."
    },
    {
        id: "adicional",
        name: "Servicio Adicional RTV",
        tag: "Complementario",
        description: "El objetivo es dejar el vehículo en condiciones óptimas para su presentación oficial.",
        recommended: false,
        featuresTitle: "Correcciones básicas",
        features: [

            "Ajuste de luces",
            "Focos",
            "Emisiones de gases básicas",
            "Kit de seguridad",
            "Nivel de fluidos",
            "Otros elementos de revisión rápida"
        ],
        advancedFeaturesTitle: "Correcciones avanzadas:",
        advancedFeatures: [
            "Frenos",
            "Suspensión",
            "Motor",
            "Llantas",
            "Sistema de emisiones"
        ],
        extrasTitle: "Valor variable según diagnóstico y tipo de servicio."
    }
]

export function SubPricing() {
    const handleCTA = () => {
        document.getElementById("booking-calendar")?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <section
            className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-white"
            aria-labelledby="pricing-heading"
        >
            {/* Fondo futurista */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
                <div className="absolute bottom-[-6rem] left-[-4rem] h-80 w-80 rounded-full bg-[#8acbef]/20 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />
            </div>

            {/* Badge superior */}
            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <header className="text-center mb-8 sm:mb-10">
                    <h2
                        id="pricing-heading"
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-balance mb-4"
                    >
                        Elige el nivel de servicio que tu vehículo merece
                    </h2>
                    <p className="text-base sm:text-lg text-muted text-pretty max-w-[60ch] mx-auto">
                        Sin sorpresas ni costos ocultos. Servicios desde{" "}
                        <span className="font-semibold text-[var(--color-primary)]">$60</span>
                    </p>

                    {/* Micro-banner: qué incluyen todos los planes */}
                    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-white/80 px-3 py-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                            <span className="font-medium text-gray-900">
                                Todos los planes incluyen inspección + informe técnico
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#8acbef]/30 bg-[#f3f8ff] px-3 py-1 text-[var(--color-text-muted)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8acbef]" />
                            <span>Sin costos ocultos, precio final por servicio</span>
                        </div>
                    </div>
                </header>

                {/* Grid de planes */}
                <div className="grid gap-6 lg:grid-cols-3 items-stretch">
                    {plans.map((plan, index) => (
                        <article
                            key={plan.id}
                            className={[
                                "group relative flex flex-col rounded-[var(--radius)] border bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300",
                                "hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.18)]",
                                plan.recommended
                                    ? "border-transparent bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/85 to-[#8acbef]/90 text-white lg:scale-[1.03] lg:z-10"
                                    : "border-[var(--color-border)]"
                            ].join(" ")}
                            style={{ transitionDelay: `${index * 40}ms` }}
                        >
                            {/* Glow para recomendado */}
                            {plan.recommended && (
                                <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-[var(--color-primary)]/70 via-[#8acbef]/60 to-[#ED0086]/70 opacity-80 blur-md" />
                            )}

                            {/* Cinta recomendado */}
                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-black/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide shadow-lg">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Recomendado
                                    </span>
                                </div>
                            )}

                            <div className="p-6 sm:p-7 flex-1 flex flex-col">
                                {/* Tag superior + mini etiqueta */}
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <span
                                        className={[
                                            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border",
                                            plan.recommended
                                                ? "border-white/40 bg-white/10"
                                                : "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                                        ].join(" ")}
                                    >
                                        {plan.tag}
                                    </span>

                                    {!plan.recommended && (
                                        <span className="text-[11px] text-[var(--color-text-muted)]">
                                            Por servicio
                                        </span>
                                    )}
                                    {plan.recommended && (
                                        <span className="hidden sm:inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white/90 border border-white/30">
                                            Ahorra tiempo y estrés
                                        </span>
                                    )}
                                </div>

                                {/* Nombre + precio */}
                                <div className="mb-4">
                                    <h3
                                        className={[
                                            "text-xl font-semibold mb-1",
                                            plan.recommended ? "text-white" : "text-gray-900"
                                        ].join(" ")}
                                    >
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span
                                            className={[
                                                "text-3xl font-bold tracking-tight",
                                                plan.recommended ? "text-white" : "text-gray-900"
                                            ].join(" ")}
                                        >
                                            {plan.price}
                                        </span>
                                        <span
                                            className={[
                                                "text-xs",
                                                plan.recommended ? "text-white/70" : "text-[var(--color-text-muted)]"
                                            ].join(" ")}
                                        >
                                            {plan.frequency}
                                        </span>
                                    </div>
                                </div>

                                {/* Descripción corta */}
                                <p
                                    className={[
                                        "text-sm mb-1",
                                        plan.recommended ? "text-white/90" : "text-gray-700"
                                    ].join(" ")}
                                >
                                    {plan.description}
                                </p>
                                <p
                                    className={[
                                        "text-xs mb-4",
                                        plan.recommended ? "text-white/75" : "text-[var(--color-text-muted)]"
                                    ].join(" ")}
                                >
                                    {plan.highlight}
                                </p>

                                <h4
                                    className={[
                                        "text-sm font-semibold mb-2",
                                        plan.recommended ? "text-white" : "text-gray-900"
                                    ].join(" ")}
                                >
                                    {plan.featuresTitle}
                                </h4>

                                {/* Lista de beneficios */}
                                <ul className="space-y-2 text-sm mb-4 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <Check
                                                className={[
                                                    "h-4 w-4 mt-0.5 flex-shrink-0",
                                                    plan.recommended
                                                        ? "text-emerald-300"
                                                        : "text-[var(--color-primary)]"
                                                ].join(" ")}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={
                                                    plan.recommended ? "text-white/90" : "text-gray-800"
                                                }
                                            >
                                                {feature}

                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <h4
                                    className={[
                                        "text-sm font-semibold mb-2",
                                        plan.recommended ? "text-white" : "text-gray-900"
                                    ].join(" ")}
                                >
                                    {plan.advancedFeaturesTitle}
                                </h4>
                                {plan.advancedFeatures && (
                                    <ul className="space-y-2 text-sm mb-4 flex-1">
                                        {plan.advancedFeatures.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2">
                                                <Check
                                                    className={[
                                                        "h-4 w-4 mt-0.5 flex-shrink-0",
                                                        plan.recommended
                                                            ? "text-emerald-300"
                                                            : "text-[var(--color-primary)]"
                                                    ].join(" ")}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className={
                                                        plan.recommended ? "text-white/90" : "text-gray-800"
                                                    }
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Exclusiones */}
                                {plan.excludesTitle && (
                                    <div className="mb-3">
                                        <h4
                                            className={[
                                                "text-sm font-semibold mb-1",
                                                plan.recommended ? "text-white" : "text-gray-900"
                                            ].join(" ")}
                                        >
                                            {plan.excludesTitle}
                                        </h4>
                                        <p
                                            className={[
                                                "text-xs",
                                                plan.recommended ? "text-white/70" : "text-[var(--color-text-muted)]"
                                            ].join(" ")}
                                        >
                                            {plan.excludesNote}
                                        </p>
                                    </div>
                                )}
                                {/* Extras */}
                                {plan.extrasTitle && (
                                    <div className="mb-3">
                                        <h4
                                            className={[
                                                "text-sm font-semibold mb-1",
                                                plan.recommended ? "text-white" : "text-gray-900"
                                            ].join(" ")}
                                        >
                                            {plan.extrasTitle}
                                        </h4>
                                        <p
                                            className={[
                                                "text-xs",
                                                plan.recommended ? "text-white/70" : "text-[var(--color-text-muted)]"
                                            ].join(" ")}
                                        >
                                            {plan.extrasNote}
                                        </p>
                                    </div>
                                )}

                                {/* CTA del card */}
                                <div className="mt-auto pt-2">
                                    <Button
                                        size="lg"
                                        onClick={handleCTA}
                                        data-analytics={`cta_pricing_${plan.id}`}
                                        className={[
                                            "w-full h-11 text-sm font-semibold transition-all duration-200",
                                            plan.recommended
                                                ? "bg-white text-[var(--color-primary)] hover:bg-gray-100 hover:shadow-xl"
                                                : "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-lg"
                                        ].join(" ")}
                                    >
                                        {plan.recommended ? "Quiero este servicio" : "Elegir servicio"}
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bloque: ¿no sabes qué elegir? */}
                <div className="mt-6 sm:mt-8">
                    <div className="mx-auto max-w-3xl rounded-[var(--radius)] border border-dashed border-[var(--color-primary)]/30 bg-gradient-to-r from-[#f5f7ff] via-white to-[#e6f4ff] px-4 py-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                ¿No sabes qué plan elegir?
                            </p>
                            <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                                El <span className="font-semibold text-[var(--color-primary)]">Servicio ejecutivo</span>{" "}
                                es el más elegido por clientes que quieren olvidarse del trámite y evitar rechazos.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCTA}
                            className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 bg-transparent"
                            data-analytics="cta_pricing_recommended_hint"
                        >
                            Ir al calendario
                        </Button>
                    </div>
                </div>

                {/* Indicadores de confianza */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div className="flex items-start gap-3 p-4 bg-white/80 rounded-[var(--radius)] border border-[var(--color-border)]/70 shadow-sm">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Métodos de pago</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Efectivo, tarjeta y transferencia bancaria.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/80 rounded-[var(--radius)] border border-[var(--color-border)]/70 shadow-sm">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Garantía de servicio</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                30 días de soporte post-revisión para dudas y ajustes.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/80 rounded-[var(--radius)] border border-[var(--color-border)]/70 shadow-sm">
                        <Check className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-medium text-sm">Soporte inmediato</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                Atención por WhatsApp y teléfono para coordinar tu cita.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA global */}
                <div className="mt-10 text-center">
                    <Button
                        size="lg"
                        onClick={handleCTA}
                        className="h-12 px-8 bg-primary hover:bg-[var(--color-primary-hover)] text-white transition-all duration-200 hover:shadow-[0_22px_45px_rgba(15,23,42,0.45)] hover:-translate-y-0.5"
                        data-analytics="cta_pricing_agendar"
                    >
                        Agenda tu revisión ahora
                    </Button>
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                        Selecciona el servicio que más se adapte a ti y agenda en menos de 1 minuto.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SubPricing
