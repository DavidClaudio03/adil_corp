"use client";

import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, Car, BarChart3 } from "lucide-react";

type Props = Readonly<{
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
}>;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, ease: easeOut } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } }
};

export default function MechanicsHero({
    imageSrc = "/professional-uniformed-mechanic-servicing-executiv.png",
    imageAlt = "Mecánico profesional uniformado",
    title = "MANTENIMIENTO PUERTA A PUERTA",
    description = "Servicios Técnicos Profesionales como frenos o cambio de aceite, realizados puerta a puerta, liberamos tu tiempo para realices las cosas que tienen más relevancia.",
    ctaLabel = "Reserva tu Servicio",
}: Props) {
    return (
        <motion.div className="text-center mb-10 py-10 relative" variants={containerVariants} initial="hidden" animate="visible">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl" />
            <div className="relative z-10">
                <div className="relative mb-8 overflow-hidden rounded-3xl futuristic-image-container max-w-4xl mx-auto">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1600}
                        height={900}
                        className="w-full h-64 md:h-80 object-cover futuristic-image"
                        loading="lazy"
                    />
                    <div className="futuristic-overlay" />
                </div>

                <motion.div className="flex justify-center mb-6" variants={itemVariants}>
                    <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-full hover:scale-110 transition-all duration-300 hover:rotate-12 cursor-pointer">
                        <Wrench className="h-12 w-12 text-white" />
                    </div>
                </motion.div>

                <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient animate-gradient-x" variants={itemVariants}>
                    {title}
                </motion.h2>

                <motion.p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty" variants={itemVariants}>
                    {description}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Button
                        size="lg"
                        className="gradient-tertiary animate-gradient-x-ltr hover:opacity-90 hover:animate-none hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 group"
                    >
                        {ctaLabel}
                        <Wrench className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </Button>

                </motion.div>
            </div>
        </motion.div>
    );
}
