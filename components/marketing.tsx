"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Monitor, Smartphone, BarChart3, Target } from "lucide-react"

export default function Marketing() {
    const marketingRef = useRef<HTMLElement>(null)

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

        if (marketingRef.current) {
            marketingRef.current.classList.add(
                "opacity-0",
                "translate-y-8",
                "transition-all",
                "duration-700"
            )
            observer.observe(marketingRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={marketingRef} id="marketing" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30 animate-bounce">
                        Marketing Digital Profesional
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient animate-gradient-x">
                        INNOVACIÓN DIGITAL PARA TU EMPRESA
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                        Muchos negocios en Quito aún no aprovechan lo digital. Diseñamos páginas web, gestionamos redes y
                        ejecutamos campañas que generan resultados medibles.
                    </p>
                </div>

                <div className="relative mb-12 overflow-hidden rounded-3xl futuristic-image-container max-w-5xl mx-auto">
                    <img
                        src="/multiple-computer-monitors-displaying-digital-mark.png"
                        alt="Múltiples pantallas mostrando dashboards de marketing digital y métricas de redes sociales"
                        className="w-full h-64 md:h-96 object-cover futuristic-image"
                        loading="lazy"
                    />
                    <div className="futuristic-overlay"></div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            icon: Monitor,
                            title: "Diseño Web",
                            description: "Sitios web profesionales que convierten visitantes en clientes",
                        },
                        {
                            icon: Smartphone,
                            title: "Redes Sociales",
                            description: "Gestión estratégica de contenido y comunidades digitales",
                        },
                        {
                            icon: BarChart3,
                            title: "Campañas Publicitarias",
                            description: "Pautas optimizadas en Facebook, Instagram y Google",
                        },
                        {
                            icon: Target,
                            title: "Estrategia Digital",
                            description: "Planes integrales basados en datos y objetivos reales",
                        },
                    ].map((service, index) => (
                        <Card
                            key={index}
                            className="gradient-border hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="gradient-border-content">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                            <service.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-2 text-balance">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">{service.description}</p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-secondary to-primary hover:opacity-90 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-secondary/30 group"
                    >
                        Solicita tu Propuesta
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
