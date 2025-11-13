"use client"

import { Check, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";

const badgeText = "Elegibilidad"

export function SubEligibility() {
    const handlePreEvaluation = () => {
        // CONNECT: Open WhatsApp or contact form for pre-evaluation
        window.open("https://wa.me/593996834173?text=Hola%20ADIL%20CORP,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios", "_blank")
    }

    return (
        <section
            className="py-12 sm:py-16 lg:py-16 bg-gradient-to-br from-[#543fb2]/5 to-white"
            aria-labelledby="eligibility-heading"
        >
            <div className="text-center mb-4">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-secondary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 id="eligibility-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-4">
                        Vehículos admitidos
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] text-pretty max-w-[60ch] mx-auto">
                        Verifica si tu vehículo califica para nuestro servicio ejecutivo
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Admitidos */}
                    <div className="bg-white p-6 rounded-[var(--radius)] shadow-[var(--shadow-2)] border-2 border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
                            <h3 className="text-xl font-semibold">Admitidos</h3>
                        </div>
                        <ul className="space-y-3" role="list">
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Vehículos modelo 2014 o posterior</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Automóviles particulares y SUVs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Camionetas hasta 3.5 toneladas</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Vehículos híbridos y eléctricos</span>
                            </li>
                        </ul>
                    </div>

                    {/* No admitidos */}
                    <div className="bg-white p-6 rounded-[var(--radius)] shadow-[var(--shadow-2)] border-2 border-red-200">
                        <div className="flex items-center gap-2 mb-4">
                            <X className="h-6 w-6 text-red-600" aria-hidden="true" />
                            <h3 className="text-xl font-semibold">Exclusiones</h3>
                        </div>
                        <ul className="space-y-3" role="list">
                            <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Vehículos anteriores a 2014</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Transporte público y taxis</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Vehículos de carga pesada</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm">Motocicletas y vehículos modificados</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Call to action for older vehicles */}
                <div className="mt-8 p-6 bg-[var(--color-accent)]/10 border-l-4 border-[var(--color-accent)] rounded-[var(--radius)]">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="font-medium mb-2">¿Anterior a 2014?</p>
                            <p className="text-sm text-[var(--color-text-muted)] mb-3">
                                Solicita una preevaluación gratuita y te confirmaremos si podemos atenderte.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePreEvaluation}
                                className="border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 bg-transparent"
                                data-analytics="cta_eligibility_preevaluation"
                            >
                                Solicitar preevaluación gratuita
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SubEligibility;