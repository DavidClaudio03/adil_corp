import { Clock, Shield, Zap, Users, Award } from "lucide-react"

const benefits = [
    {
        icon: Clock,
        title: "Ahorra 3+ horas",
        description: "Sin filas ni esperas. Agenda tu cita y llega directo a tu turno confirmado.",
    },
    {
        icon: Shield,
        title: "Garantía de aprobación",
        description: "Pre-inspección gratuita. Si tu vehículo no cumple, te avisamos antes y te asesoramos.",
    },
    {
        icon: Zap,
        title: "Proceso en 45 minutos",
        description: "Desde tu llegada hasta el certificado en mano. Optimizamos cada paso del proceso.",
    },
    {
        icon: Users,
        title: "Soporte personalizado",
        description: "Un asesor dedicado te acompaña en todo el proceso. Resolvemos tus dudas al instante.",
    },
    {
        icon: Award,
        title: "Certificación inmediata",
        description: "Certificado digital enviado a tu email. Válido para todos los trámites oficiales.",
    },
]

export function SubBenefits() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="benefits-heading">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 id="benefits-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                        Beneficios de nuestro servicio ejecutivo
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon
                        return (
                            <div
                                key={index}
                                className="group relative p-6 bg-white border border-[var(--color-border)] rounded-[var(--radius)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-3)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-200">
                                            <Icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold mb-2 text-pretty">{benefit.title}</h3>
                                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed text-pretty">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default SubBenefits;