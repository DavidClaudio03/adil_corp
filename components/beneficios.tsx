"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Shield, CheckCircle, TrendingUp } from "lucide-react"

export default function BeneficiosAdil() {
    const benefitsRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up")
                    entry.target.classList.remove("opacity-0", "translate-y-8")
                }
            })
        }, observerOptions)

        if (benefitsRef.current) {
            benefitsRef.current.classList.add(
                "opacity-0",
                "translate-y-8",
                "transition-all",
                "duration-700"
            )
            observer.observe(benefitsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={benefitsRef}
            className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-gradient-x">
                        ¿Por qué elegir ADIL CORP?
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Clock,
                            title: "Evita filas y trámites innecesarios",
                            description:
                                "Optimizamos tu agenda eliminando procesos burocráticos",
                        },
                        {
                            icon: Shield,
                            title: "Transparencia y precios claros",
                            description:
                                "Sin comisiones ocultas ni sorpresas en el proceso",
                        },
                        {
                            icon: CheckCircle,
                            title: "Respaldo profesional",
                            description:
                                "Ingenieros y asesores especializados te acompañan",
                        },
                        {
                            icon: TrendingUp,
                            title: "Rentabilidad garantizada",
                            description:
                                "Servicios que protegen tu inversión y agenda",
                        },
                    ].map((benefit, index) => (
                        <Card
                            key={index}
                            className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <CardContent className="p-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <benefit.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-semibold mb-2 text-balance">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-muted-foreground text-pretty">
                                    {benefit.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
