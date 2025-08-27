"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ArrowRight } from "lucide-react"

export default function Testimonios() {
    const testimonialsRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!testimonialsRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up")
                        entry.target.classList.remove("opacity-0", "translate-y-8")
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        )

        testimonialsRef.current.classList.add(
            "opacity-0",
            "translate-y-8",
            "transition-all",
            "duration-700"
        )
        observer.observe(testimonialsRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={testimonialsRef}
            className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient animate-gradient-x">
                        LO QUE DICEN NUESTROS CLIENTES
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Testimonios reales de empresarios que confiaron en nosotros
                    </p>
                </div>

                {/* Cards de testimonios */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            name: "Carlos Mendoza",
                            role: "Gerente General",
                            company: "Empresa Logística",
                            testimonial:
                                "Aprobé la revisión técnica sin perder un minuto gracias a ADIL CORP. El servicio fue impecable y me permitió enfocarme en mi negocio.",
                            rating: 5,
                        },
                        {
                            name: "María Elena Vásquez",
                            role: "Directora Comercial",
                            company: "Consultora Financiera",
                            testimonial:
                                "La asesoría en compra de autos me ahorró miles de dólares y me dio la seguridad que necesitaba para una inversión tan importante.",
                            rating: 5,
                        },
                        {
                            name: "Roberto Silva",
                            role: "Propietario",
                            company: "Gimnasio Anahí",
                            testimonial:
                                "El marketing digital de ADIL CORP profesionalizó mi negocio y atrajo clientes que nunca pensé alcanzar. Los resultados hablan por sí solos.",
                            rating: 5,
                        },
                    ].map((testimonial, index) => (
                        <Card
                            key={index}
                            className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <Quote className="h-8 w-8 text-secondary mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6 text-pretty italic">
                                    "{testimonial.testimonial}"
                                </p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    <p className="text-sm text-primary font-medium">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-xl transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-gradient animate-gradient-x">
                            En ADIL CORP entregamos tiempo, seguridad y resultados reales
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            Únete a más de 200 empresarios que ya optimizaron su tiempo y potenciaron sus negocios con nosotros.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 group"
                            >
                                Reserva tu Servicio Automotriz
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/10 group"
                            >
                                Solicita Propuesta Digital
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
