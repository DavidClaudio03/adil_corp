"use client";

import { useEffect } from "react";

export default function ScrollToElement() {
    useEffect(() => {
        // Obtener el hash de la URL
        const hash = window.location.hash.slice(1); // Remover el #

        if (hash) {
            // Esperar un pequeño delay para asegurar que el DOM esté completamente renderizado
            const timer = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, []);

    return null;
}
