"use client"

import { useEffect, useState } from "react"
import { Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyMobile() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Mostrar sticky CTA después de hacer scroll 300px
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleAgendarClick = () => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
    }

    const handleWhatsAppClick = () => {
        window.open(
            "https://wa.me/593999999999?text=Hola,%20quiero%20agendar%20mi%20revisión%20técnica",
            "_blank"
        )
    }

    if (!isVisible) return null

    return (
        <div
            className="
        fixed bottom-0 left-0 right-0 z-50 lg:hidden
        border-t border-[var(--color-border)]
        bg-white/95 backdrop-blur
        shadow-[0_-16px_40px_rgba(15,23,42,0.35)]
        animate-in slide-in-from-bottom duration-300
      "
            style={{
                paddingBottom: "env(safe-area-inset-bottom, 0px)"
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
                        onClick={handleAgendarClick}
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

                    <Button
                        onClick={handleWhatsAppClick}
                        variant="outline"
                        className="
              flex-1 h-11
              border-2 border-[#25D366]/80
              text-[#128C7E]
              bg-white
              hover:bg-[#25D366]/10
              flex items-center justify-center
              text-sm font-semibold
              transition-all duration-200
            "
                        data-analytics="cta_sticky_whatsapp"
                    >
                        <MessageCircle className="h-5 w-5 mr-1.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StickyMobile
