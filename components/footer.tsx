"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                            LEJOS SOMOS MÁS
                        </span>
                    </h2>
                </div>

                {/* Info */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
                        <Phone className="h-8 w-8 mb-2 text-secondary group-hover:rotate-12 transition-transform duration-300" />
                        <p className="font-semibold">Teléfono</p>
                        <p className="text-sm text-muted-foreground">+593 99 999 9999</p>
                    </div>

                    <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
                        <Mail className="h-8 w-8 mb-2 text-secondary group-hover:rotate-12 transition-transform duration-300" />
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">info@adilcorp.com</p>
                    </div>

                    <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
                        <MapPin className="h-8 w-8 mb-2 text-secondary group-hover:rotate-12 transition-transform duration-300" />
                        <p className="font-semibold">Ubicación</p>
                        <p className="text-sm text-muted-foreground">Quito, Ecuador</p>
                    </div>
                </div>

                {/* Derechos reservados */}
                <div className="mt-12 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} ADIL CORP. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}
