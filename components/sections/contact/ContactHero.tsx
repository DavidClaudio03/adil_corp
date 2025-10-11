"use client";

import { Badge } from "@/components/ui/badge";
import { CONTACT_COPY } from "@/config/contact";

export default function ContactHero() {
    return (
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm gradient-adilcorp text-secondary-foreground border-primary/30 animate-bounce">
                    {CONTACT_COPY.badge}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                    <span className="text-gradient">{CONTACT_COPY.title1}</span>
                    <br />
                    <span className="text-foreground">{CONTACT_COPY.title2}</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                    {CONTACT_COPY.lead}
                </p>
            </div>
        </section>
    );
}

