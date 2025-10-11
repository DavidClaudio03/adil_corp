"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { Button } from "@/components/ui/button";
import PortfolioCard from "./PortafolioCard";
import { CASE_STUDIES, PORTFOLIO_COPY } from "@/config/portafolio";
import { Badge } from "@/components/ui/badge";

type Props = Readonly<{
    badgeText: string;
}>;

export default function MiniPortfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    useRevealOnScroll([sectionRef]);
    const badgeText = PORTFOLIO_COPY.badgeText || "Portafolio";

    return (
        <section ref={sectionRef} id="mini-portafolio" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-primary text-primary-foreground border-primary/30 animate-bounce">
                    {badgeText}
                </Badge>
            </div>
            <div className="max-w-7xl mx-auto">
                {/* Showcase */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 mb-8 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-4">{PORTFOLIO_COPY.heading}</h3>
                        <p className="text-muted-foreground">{PORTFOLIO_COPY.subheading}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {CASE_STUDIES.map(cs => (
                            <PortfolioCard key={cs.id} item={cs} />
                        ))}
                    </div>
                </div>

                {/* CTA final */}
                <div className="text-center">
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-secondary/40 hover:opacity-90 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-secondary/30 group"
                    >
                        <Link href="">
                            {PORTFOLIO_COPY.ctaLabel}
                            {/* Icono conservado dentro del propio botón por tu diseño original */}
                            <svg
                                viewBox="0 0 24 24"
                                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
