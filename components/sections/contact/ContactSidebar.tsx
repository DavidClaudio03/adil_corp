"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CoverageCard from "./CoverageCard";
import QuickContact from "./QuickContact";
import EmergencyBanner from "./EmergencyBanner";
import { CONTACT_COPY, SERVICE_AREAS } from "@/config/contact";

export default function ContactSidebar() {
    return (
        <div className="space-y-8">
            <CoverageCard areas={SERVICE_AREAS} title={CONTACT_COPY.coverageTitle} lead={CONTACT_COPY.coverageLead} />
            <QuickContact />
            {/* c */}
        </div>
    );
}
