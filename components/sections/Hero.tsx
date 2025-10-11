"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, TrendingUp, Clock, Car, BarChart3 } from "lucide-react";
import type { HeroProps } from "@/types/hero";

export default function Hero({
    title = "TU TIEMPO NUESTRA PRIORIDAD",
    subtitle = "Asesoría automotriz y marketing digital para que ganes tiempo y resultados",
    primaryButtonText = "RESERVA TU SERVICIO AUTOMOTRIZ",
    secondaryButtonText = "IMPULSA TU NEGOCIO CON MARKETING DIGITAL",
    description = "En Quito, hacemos que pasar la revisión técnica y hacer crecer tu negocio sea rápido, seguro y sin complicaciones.",
    backgroundImage = "/FondoHero.png",
}: HeroProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.98 },
    };

    return (
        <header className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" aria-labelledby="hero-title">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 container mx-2 px-6 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-4xl mx-2 sm:mx-auto">
                    {/* Main Title */}
                    <motion.h1
                        id="hero-title"
                        className="text-3xl xs:text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 leading-tight text-white px-4"
                        variants={itemVariants}
                        style={{
                            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
                            wordBreak: "break-word",
                            hyphens: "auto",
                            maxWidth: "100%",
                        }}
                    >
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl xs:text-sm sm:text-3xl lg:text-lg text-white font-medium mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4"
                        variants={itemVariants}
                        style={{
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                            wordBreak: "break-word",
                            hyphens: "auto",
                        }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mb-6 sm:mb-8 px-4"
                        variants={itemVariants}
                    >
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full sm:w-auto max-w-xs">
                            <Button
                                size="default"
                                className="bg-gradient-to-r from-[#543fb2] from-[60%] to-[#8acbef] to-[100%] text-white px-3 xs:px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg border-0 shadow-lg hover:shadow-xl hover:from-[#543fb2] hover:to-[#543fb2] transition-all duration-300 group w-full sm:w-auto"
                                aria-label="Reservar servicio automotriz"
                                style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                            >
                                <Calendar
                                    className="mr-1 h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="text-center leading-tight">{primaryButtonText}</span>
                            </Button>

                        </motion.div>

                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full sm:w-auto max-w-xs">
                            <Button
                                variant="outline"
                                size="default"
                                className="bg-white/90 backdrop-blur-sm border-2 border-white text-black px-2 py-2 text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-white hover:text-[#543fb2] transition-all duration-300 group w-full sm:w-auto flex items-center justify-center gap-1"
                                aria-label="Impulsar negocio con marketing digital"
                            >
                                <TrendingUp className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                <span className="text-center whitespace-normal line-clamp-2">{secondaryButtonText}</span>
                                <ArrowRight className="h-3 w-3 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Section with White Background */}
            <motion.div className="relative z-10 bg-white py-1 sm:py-2" variants={containerVariants} initial="hidden" animate="visible">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-2 sm:mb-4">
                        <motion.div className="text-center" variants={itemVariants}>
                            <div className="flex justify-center mb-1 sm:mb-2">
                                <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-black mb-1">Ahorra tiempo</h3>
                        </motion.div>

                        <motion.div className="text-center" variants={itemVariants}>
                            <div className="flex justify-center mb-1 sm:mb-2">
                                <Car className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-black mb-1">Confianza en lo automotriz</h3>
                        </motion.div>

                        <motion.div className="text-center" variants={itemVariants}>
                            <div className="flex justify-center mb-1 sm:mb-2">
                                <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-black mb-1">Estrategias digitales efectivas</h3>
                        </motion.div>
                    </div>

                    <motion.p className="text-xs sm:text-sm text-black text-center max-w-3xl mx-auto leading-relaxed" variants={itemVariants}>
                        {description}
                    </motion.p>
                </div>
            </motion.div>
        </header>
    );
}
