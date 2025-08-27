"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, ArrowRight, Wrench } from "lucide-react"

export default function Automotriz() {
    const servicesRef = useRef<HTMLElement>(null)
    const mechanicsRef = useRef<HTMLElement>(null)

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

        const elements = [servicesRef, mechanicsRef]
        elements.forEach((ref) => {
            if (ref.current) {
                ref.current.classList.add(
                    "opacity-0",
                    "translate-y-8",
                    "transition-all",
                    "duration-700"
                )
                observer.observe(ref.current)
            }
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            {/* Automotive Services Section */}
            <section ref={servicesRef} id="servicios" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                            Asesoría Automotriz Ejecutiva
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Servicios especializados que protegen tu inversión y optimizan tu tiempo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Revisión Técnica */}
                        <div className="gradient-border group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                            <Card className="gradient-border-content border-0 h-full">
                                <CardContent className="p-8">
                                    <div className="relative mb-6 overflow-hidden rounded-2xl futuristic-image-container">
                                        <img
                                            src="/executive-client-in-modern-office-with-professiona.png"
                                            alt="Inspección técnica ejecutiva"
                                            className="w-full h-48 object-cover futuristic-image"
                                            loading="lazy"
                                        />
                                        <div className="futuristic-overlay"></div>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                                            <CheckCircle className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Revisión Técnica Ejecutiva</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6 text-pretty">
                                        En Quito la revisión vehicular es tediosa y cara en tiempo. Nos encargamos de todo: preparación,
                                        trámites y aprobación final.
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-105 group">
                                        Agenda tu Revisión
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Compra Segura */}
                        <div className="gradient-border group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20">
                            <Card className="gradient-border-content border-0 h-full">
                                <CardContent className="p-8">
                                    <div className="relative mb-6 overflow-hidden rounded-2xl futuristic-image-container">
                                        <img
                                            src="/business-client-with-professional-automotive-advis.png"
                                            alt="Cliente empresarial con asesor revisando auto premium"
                                            className="w-full h-48 object-cover futuristic-image"
                                            loading="lazy"
                                        />
                                        <div className="futuristic-overlay"></div>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-secondary/10 rounded-lg mr-4 group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                                            <Shield className="h-8 w-8 text-secondary group-hover:rotate-12 transition-transform duration-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Compra Segura de Autos Usados</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6 text-pretty">
                                        En Ecuador los autos cuestan hasta el doble y los patios cobran comisiones de miles de dólares. Te
                                        asesoramos en diagnóstico, negociación y documentación para proteger tu inversión.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent transition-all duration-300 hover:scale-105 group"
                                    >
                                        Cotiza tu Asesoría
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Executive Mechanics Hero */}
                    <div ref={mechanicsRef} className="text-center mb-12 py-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="relative mb-8 overflow-hidden rounded-3xl futuristic-image-container max-w-4xl mx-auto">
                                <img
                                    src="/professional-uniformed-mechanic-servicing-executiv.png"
                                    alt="Mecánico profesional uniformado"
                                    className="w-full h-64 md:h-80 object-cover futuristic-image"
                                    loading="lazy"
                                />
                                <div className="futuristic-overlay"></div>
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-full hover:scale-110 transition-all duration-300 hover:rotate-12 cursor-pointer">
                                    <Wrench className="h-12 w-12 text-white" />
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient animate-gradient-x">
                                MANTENIMIENTO A TU PUERTA
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                                Servicios técnicos esenciales como frenos o cambio de aceite, realizados en tu domicilio con control de
                                calidad profesional.
                            </p>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-pulse hover:animate-none hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 group"
                            >
                                Reserva tu Servicio
                                <Wrench className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
