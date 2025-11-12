"use client"

import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubHeroAuto() {
    const handlePrimaryCTA = () => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
    }

    const handleWhatsAppCTA = () => {
        window.open("https://wa.me/593996834173?text=Hola%20ADIL%20CORP,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios", "_blank")
    }

    return (
        <header className="relative overflow-hidden bg-gradient-to-br from-[#543fb2]/5 to-[#8acbef]/5">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28 min-h-screen flex items-center">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                            Aprueba tu RTV sin filas — agenda en minutos
                        </h1>

                        <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[60ch]">
                            Aprobación rápida y sin filas. Nosotros coordinamos todo por ti.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <Button
                                size="lg"
                                onClick={handlePrimaryCTA}
                                className="h-12 px-6 bg-primary hover:gradient-accent text-white transition-all duration-200 hover:shadow-lg"
                                data-analytics="cta_hero_agendar"
                            >
                                Agenda tu revisión
                                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleWhatsAppCTA}
                                className="h-12 px-6 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-200 bg-transparent"
                                data-analytics="cta_hero_whatsapp"
                            >
                                Hablar por WhatsApp
                            </Button>
                        </div>

                        {/* Trust indicators */}
                        <div className="pt-4 border-t border-[var(--color-border)]">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                                    <span>100% Clientes satisfechos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                                    <span>Atención prioritaria</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                                    <span>Sin intermediarios</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 rounded-[var(--radius)] opacity-60 z-10" />
                        <div className="relative overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-3)] transition-transform duration-300 group-hover:scale-[1.02]">
                            <Image
                                src="/sub-hero.jpg"
                                alt="Centro de revisión técnica vehicular moderno"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover aspect-[16/9]"
                                priority
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default SubHeroAuto;
