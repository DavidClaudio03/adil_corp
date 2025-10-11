"use client";

import { useState } from "react";
import ContactHero from "./ContactHero";
import ContactMainGrid from "./ContactMainGrid";
import CallMeCta from "./CallMeCta";
import ContactSuccess from "./ContactSuccess";
import { CONTACT_COPY } from "@/config/contact";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <ContactSuccess
                onReset={() => setSubmitted(false)}
                title={CONTACT_COPY.successTitle}
                lead={CONTACT_COPY.successLead}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background" id="contacto">
            <ContactHero />
            <ContactMainGrid onSuccess={() => setSubmitted(true)} />
            <CallMeCta title={CONTACT_COPY.callmeTitle} lead={CONTACT_COPY.callmeLead} />
        </div>
    );
}
