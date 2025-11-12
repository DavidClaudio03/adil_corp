"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { AUTO_SERVICES } from "@/config/automotive";
import ServiceCard from "./ServiceCard";
import MechanicsHero from "./MechanicHero";

export default function Automotriz() {
    const servicesRef = useRef<HTMLElement>(null);
    const mechanicsRef = useRef<HTMLElement>(null);

    useRevealOnScroll([servicesRef, mechanicsRef]);

    return (
        <div className="min-h-screen bg-background">
            {/* Automotive Services Section */}
            <section ref={servicesRef} id="servicios" className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                            Asesoría Automotriz Ejecutiva
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Servicios especializados que protegen tu inversión y optimizan tu tiempo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {AUTO_SERVICES.map(svc => (
                            <ServiceCard key={svc.id} service={svc} />
                        ))}
                    </div>

                    {/* Executive Mechanics Hero */}
                    <section ref={mechanicsRef} aria-labelledby="maint-hero-title">
                        <MechanicsHero />
                    </section>
                </div>
            </section>
        </div>
    );
}
