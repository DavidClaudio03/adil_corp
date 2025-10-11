"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, Wrench } from "lucide-react";

export default function BlogCta() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 text-gradient">¿Necesitas ayuda personalizada?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    Nuestros expertos están listos para asesorarte en servicios automotrices y marketing digital
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Wrench className="mr-2 h-5 w-5" /> Reserva Servicio Mecánico
                    </Button>
                    <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent">
                        <TrendingUp className="mr-2 h-5 w-5" /> Solicita Propuesta Digital
                    </Button>
                </div>
            </div>
        </section>
    );
}
