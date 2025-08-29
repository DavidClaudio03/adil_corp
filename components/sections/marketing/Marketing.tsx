"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { MARKETING_SERVICES, MARKETING_HERO } from "@/config/marketing";
import ServiceTile from "./ServiceTile";
import MarketingHero from "./MarketingHero";

export default function Marketing() {
    const marketingRef = useRef<HTMLElement>(null);
    useRevealOnScroll([marketingRef]);

    return (
        <section ref={marketingRef} id="marketing" className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <MarketingHero
                    badgeText={MARKETING_HERO.badgeText}
                    title={MARKETING_HERO.title}
                    lead={MARKETING_HERO.lead}
                    imageSrc={MARKETING_HERO.heroImageSrc}
                    imageAlt={MARKETING_HERO.heroImageAlt}
                    ctaLabel={MARKETING_HERO.ctaLabel}
                />

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-12">
                    {MARKETING_SERVICES.map((svc, i) => (
                        <ServiceTile key={svc.id} service={svc} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
