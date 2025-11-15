"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyMobile() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScrollOrResize = () => {
            if (typeof window === "undefined") return

            const isSmallScreen = window.innerWidth < 1024
            const shouldShow = isSmallScreen && window.scrollY > 300

            setIsVisible(shouldShow)

            // Referencia al elemento de Chatbase (el botón flotante)
            const chatbaseButton = document.getElementById("chatbase-bubble-button");

            // En StickyMobile.tsx
            if (shouldShow) {
                document.body.classList.add("sticky-mobile-open")
            } else {
                // IMPORTANTE: Esto se ejecuta en desktop porque shouldShow es false
                document.body.classList.remove("sticky-mobile-open")
            }
        }

        handleScrollOrResize()

        window.addEventListener("scroll", handleScrollOrResize)
        window.addEventListener("resize", handleScrollOrResize)

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize)
            window.removeEventListener("resize", handleScrollOrResize)
            document.body.classList.remove("sticky-mobile-open")
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="
                fixed bottom-0 left-0 right-0 lg:hidden
                border-t border-[var(--color-border)]
                bg-white/95 backdrop-blur
                shadow-[0_-16px_40px_rgba(15,23,42,0.35)]
                animate-in slide-in-from-bottom duration-300
            "
            style={{
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
                // El valor máximo típico de z-index en navegadores (ganamos a casi todo)
                zIndex: 2147483647
            }}
            aria-label="Accesos rápidos para agendar o chatear por WhatsApp"
        >
            <div className="mx-auto max-w-md px-3 py-2.5">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-[var(--color-text-muted)] leading-tight">
                        <span className="font-semibold text-[var(--color-primary)]">
                            Agenda en menos de 1 minuto
                        </span>
                        <span className="hidden xs:inline"> · Confirmación por WhatsApp</span>
                    </p>
                    <span className="text-[10px] rounded-full bg-[var(--color-primary)]/8 text-[var(--color-primary)] px-2 py-0.5 font-medium">
                        RTV ejecutiva
                    </span>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() =>
                            document
                                .getElementById("booking-calendar")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="
                            flex-1 h-11
                            bg-[var(--color-primary)]
                            hover:bg-[var(--color-primary-hover)]
                            text-white
                            flex items-center justify-center
                            text-sm font-semibold
                            transition-all duration-200
                            hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.4)]
                        "
                        data-analytics="cta_sticky_agendar"
                    >
                        <Calendar className="h-5 w-5 mr-1.5" aria-hidden="true" />
                        <span>Agendar cita</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StickyMobile
