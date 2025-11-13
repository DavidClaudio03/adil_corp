"use client"

import { Check, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";

const badgeText = "Elegibilidad"

export function SubEligibility() {
    const handlePreEvaluation = () => {
        window.open(
            "https://wa.me/593996834173?text=Hola%20ADIL%20CORP,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
            "_blank"
        )
    }

    return (
        <section
            className="relative py-12 sm:py-16 lg:py-16 bg-gradient-to-br from-[#543fb2]/6 via-white to-[#8acbef]/8 overflow-hidden"
            aria-labelledby="eligibility-heading"
        >
            {/* Halos de fondo suaves */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-[-3rem] h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
                <div className="absolute bottom-[-4rem] right-[-3rem] h-64 w-64 rounded-full bg-[#8acbef]/18 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />
            </div>

            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-secondary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="text-center mb-10 sm:mb-12">
                    <h2
                        id="eligibility-heading"
                        className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-3"
                    >
                        Vehículos admitidos para servicio ejecutivo
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--color-text-muted)] text-pretty max-w-[60ch] mx-auto">
                        En menos de 30 segundos puedes saber si tu vehículo califica. Así evitamos sorpresas
                        y hacemos la experiencia más rápida y clara para ti.
                    </p>
                </div>

                {/* Grid principal */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Admitidos */}
                    <article className="group relative">
                        {/* Glow al hover */}
                        <div className="pointer-events-none absolute -inset-[1px] rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-emerald-300/0 via-[var(--color-primary)]/0 to-[#8acbef]/0 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-80 group-hover:from-emerald-300/45 group-hover:via-[var(--color-primary)]/20 group-hover:to-[#8acbef]/30" />

                        <div className="relative bg-white/95 p-6 rounded-[var(--radius)] shadow-[var(--shadow-2)] border border-emerald-200/70 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <Check className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Admitidos</h3>
                                </div>
                                <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium px-3 py-1 border border-emerald-100">
                                    Cumple requisitos
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm px-2" role="list">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Vehículos modelo 2014 o posterior</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Automóviles particulares y SUVs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Camionetas hasta 3.5 toneladas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Vehículos híbridos y eléctricos</span>
                                </li>
                            </ul>

                            <p className="mt-4 text-xs text-emerald-700 bg-emerald-50/80 rounded-[calc(var(--radius)-8px)] px-3 py-2">
                                Si cumples con la mayoría de estos puntos, tu vehículo es ideal para nuestro
                                servicio ejecutivo.
                            </p>
                        </div>
                    </article>

                    {/* No admitidos */}
                    <article className="group relative">
                        {/* Glow al hover */}
                        <div className="pointer-events-none absolute -inset-[1px] rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-[#ED0086]/0 via-[#8acbef]/0 to-red-300/0 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-80 group-hover:from-[#ED0086]/40 group-hover:via-[#8acbef]/20 group-hover:to-red-300/35" />

                        <div className="relative bg-white/95 p-6 rounded-[var(--radius)] shadow-[var(--shadow-2)] border border-red-200/70 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <X className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Exclusiones</h3>
                                </div>
                                <span className="hidden sm:inline-flex items-center rounded-full bg-red-50 text-red-700 text-[11px] font-medium px-3 py-1 border border-red-100">
                                    Revisa tu caso
                                </span>
                            </div>

                            <ul className="space-y-3 text-sm px-2" role="list">
                                <li className="flex items-start gap-2">
                                    <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Vehículos anteriores a 2014</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Transporte público y taxis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Vehículos de carga pesada</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>Motocicletas y vehículos modificados</span>
                                </li>
                            </ul>

                            <p className="mt-4 text-xs text-red-700 bg-red-50/80 rounded-[calc(var(--radius)-8px)] px-3 py-2">
                                Si tu vehículo entra en estas categorías, es posible que no podamos ofrecer el
                                servicio ejecutivo estándar.
                            </p>
                        </div>
                    </article>
                </div>

                {/* Call to action para casos dudosos */}
                <div className="mt-8">
                    <div className="relative rounded-[var(--radius)] overflow-hidden bg-gradient-to-r from-[#ED0086]/8 via-[var(--color-primary)]/6 to-[#8acbef]/10 border border-[var(--color-primary)]/15">
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#ED0086] via-[var(--color-primary)] to-[#8acbef]" />
                        <div className="relative p-6 sm:p-7 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[var(--color-accent)] shadow-sm">
                                    <AlertCircle className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm sm:text-base mb-1">
                                        ¿Tu vehículo es anterior a 2014 o tienes dudas?
                                    </p>
                                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-[48ch]">
                                        Solicita una preevaluación gratuita por WhatsApp. Revisamos tu caso y te
                                        confirmamos si podemos ayudarte con una solución a medida.
                                    </p>
                                </div>
                            </div>

                            <div className="flex sm:block">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreEvaluation}
                                    className="border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 bg-transparent transition-all duration-200 hover:-translate-y-0.5"
                                    data-analytics="cta_eligibility_preevaluation"
                                >
                                    Solicitar preevaluación gratuita
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubEligibility;
