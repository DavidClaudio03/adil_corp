"use client"

import { useEffect, useState } from "react"
import { Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyMobile() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA after scrolling 300px
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleAgendarClick = () => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
    }

    const handleWhatsAppClick = () => {
        // CONNECT: Replace with actual WhatsApp number
        window.open("https://wa.me/593999999999?text=Hola,%20quiero%20agendar%20mi%20revisión%20técnica", "_blank")
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[var(--color-border)] shadow-[var(--shadow-3)] p-3 animate-in slide-in-from-bottom duration-300">
            <div className="flex gap-2">
                <Button
                    onClick={handleAgendarClick}
                    className="flex-1 h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                    data-analytics="cta_sticky_agendar"
                >
                    <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
                    Agendar
                </Button>
                <Button
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 bg-transparent"
                    data-analytics="cta_sticky_whatsapp"
                >
                    <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                    WhatsApp
                </Button>
            </div>
        </div>
    )
}
export default StickyMobile;