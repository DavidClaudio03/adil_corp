"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Target, TrendingUp, BarChart3, ArrowRight } from "lucide-react"

export default function MiniPortafolio() {
    return (
        <section id="casos-exito" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Portfolio Showcase */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 mb-8 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-4">Casos de Éxito</h3>
                        <p className="text-muted-foreground">Proyectos que han transformado negocios en Quito</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <Monitor className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Gimnasio Anahí</h4>
                                        <p className="text-sm text-muted-foreground">Fitness & Wellness</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Incremento del 300% en membresías mediante estrategia digital integral y presencia web optimizada.
                                </p>
                                <div className="flex items-center text-sm text-secondary group-hover:scale-105 transition-transform duration-300">
                                    <TrendingUp className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    +300% membresías
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glassmorphism border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Fundación Un Nuevo Camino</h4>
                                        <p className="text-sm text-muted-foreground">Organización Social</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Digitalización completa que aumentó donaciones y alcance comunitario en un 250%.
                                </p>
                                <div className="flex items-center text-sm text-primary group-hover:scale-105 transition-transform duration-300">
                                    <BarChart3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    +250% donaciones
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Botón final */}
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
