"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, ArrowRight } from "lucide-react";
import type { AutoService } from "@/types/automotriz";

type Props = Readonly<{ service: AutoService }>;

function IconByName({ name }: { name: AutoService["icon"] }) {
    if (name === "shield") return <Shield className="h-6 w-6 text-secondary group-hover:rotate-12 transition-transform duration-300" />;
    return <CheckCircle className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />;
}

export default memo(function ServiceCard({ service }: Props) {
    const isPrimary = service.accent === "primary";
    const accentBg = isPrimary ? "bg-primary/10 group-hover:bg-primary/20" : "bg-secondary/10 group-hover:bg-secondary/20";
    const gradientShadow = isPrimary ? "hover:shadow-primary/60" : "hover:shadow-secondary/60";
    const gradientBorder = "gradient-border";
    const BtnInner = (
        <>
            {service.ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </>
    );

    return (
        <div className={`${gradientBorder} group rounded-2xl hover:scale-105 transition-all duration-500 hover:shadow-2xl ${gradientShadow}`}>
            <Card className="gradient-border-content border-2 h-full rounded-2xl">
                <CardContent className="p-6">
                    <div className="relative mb-6 overflow-hidden rounded-2xl futuristic-image-container">
                        <Image
                            src={service.imageSrc}
                            alt={service.imageAlt}
                            width={1280}
                            height={820}
                            className="w-full h-56 object-cover futuristic-image"
                            loading="lazy"
                        />
                        <div className="futuristic-overlay" />
                    </div>

                    <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg mr-4 transition-all duration-300 group-hover:scale-110 ${accentBg}`}>
                            <IconByName name={service.icon} />
                        </div>
                        <h3
                            className={`text-xl font-bold transition-colors duration-300 ${service.accent === "primary"
                                ? "group-hover:text-primary"
                                : "group-hover:text-secondary"
                                }`}
                        >
                            {service.title}
                        </h3>

                    </div>

                    <p className="text-muted-foreground mb-6 text-pretty">
                        {service.description}
                    </p>

                    {service.href ? (
                        <Button
                            asChild // <— hace al Button actuar como <a>, mantiene estilos
                            className={`w-full group ${service.ctaVariant === "outline"
                                ? "border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                                : "gradient-tertiary text-white hover:opacity-90"} transition-all duration-300 hover:scale-105`}
                            variant={service.ctaVariant ?? "default"}
                        >
                            <Link href={service.href}>{BtnInner}</Link>
                        </Button>
                    ) : (
                        <Button
                            className={`w-full group ${service.ctaVariant === "outline"
                                ? "border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                                : "gradient-tertiary text-white hover:opacity-90"} transition-all duration-300 hover:scale-105`}
                            variant={service.ctaVariant ?? "default"}
                        >
                            {BtnInner}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
});
