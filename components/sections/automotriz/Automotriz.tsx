"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { AUTO_SERVICES, AUTO_COPY } from "@/config/automotive";
import ServiceCard from "./ServiceCard";
import MechanicsHero from "./MechanicHero";
import { Badge } from "@/components/ui/badge";

export default function Automotriz() {
    const servicesRef = useRef<HTMLElement>(null);
    const mechanicsRef = useRef<HTMLElement>(null);
    const badgeText = AUTO_COPY.BadgeText || "Automotiz";

    useRevealOnScroll([servicesRef, mechanicsRef]);

    return (
        <div className="min-h-screen bg-background">
            {/* Automotive Services Section */}
            <section ref={servicesRef} id="automotriz" className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4">
                    <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary/90 text-primary-foreground border-secondary/30 animate-bounce">
                        {badgeText}
                    </Badge>
                </div>
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
