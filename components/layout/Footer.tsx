"use client";

import FooterContactItem from "./FooterContactItem";
import FooterNav from "./FooterNav";
import { FOOTER_CONTACT, FOOTER_COPY, FOOTER_LINKS } from "@/config/footer";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                            {FOOTER_COPY.headline}
                        </span>
                    </h2>
                </div>

                {/* Contacto */}
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {FOOTER_CONTACT.map((c) => (
                        <FooterContactItem key={c.id} item={c} />
                    ))}
                </div>

                {/* (Opcional) Navegación de pie */}
                <FooterNav links={FOOTER_LINKS} />

                {/* Derechos reservados */}
                <div className="mt-12 text-center text-sm text-primary-foreground">
                    {FOOTER_COPY.rightsPrefix} {year} {FOOTER_COPY.rightsSuffix}
                </div>
            </div>
        </footer>
    );
}
