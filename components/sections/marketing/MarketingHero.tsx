"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = Readonly<{
    badgeText: string;
    title: string;
    lead: string;
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
}>;

export default function MarketingHero({
    badgeText,
    title,
    lead,
    imageSrc,
    imageAlt,
    ctaLabel,
}: Props) {
    return (
        <>
            <div className="text-center mb-12">
                <Badge className="mb-6 px-6 text-base sm:text-xl md:text-sm bg-tertiary/90 text-primary-foreground border-secondary/30 animate-bounce">
                    {badgeText}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient animate-gradient-x">
                    {title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                    {lead}
                </p>
            </div>

            <div className="relative mb-12 overflow-hidden rounded-3xl futuristic-image-container max-w-5xl mx-auto">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={1920}
                    height={1080}
                    className="w-full h-64 md:h-96 object-cover futuristic-image"
                    loading="lazy"
                />
                <div className="futuristic-overlay" />
            </div>

            <div className="text-center">
                <Button
                    size="lg"
                    className="gradient-adilcorp hover:opacity-90 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-tertiary/30 group"
                >
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
            </div>
        </>
    );
}
