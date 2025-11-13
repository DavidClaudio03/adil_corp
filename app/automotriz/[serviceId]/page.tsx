import { notFound } from "next/navigation";
import Link from "next/link";
import { AUTO_SERVICES } from "@/config/automotive";
import { SubHeroAuto } from "@/components/sections/automotriz/subpage/Hero";
import { SubBenefits } from "@/components/sections/automotriz/subpage/Benefits";
import { SubEligibility } from "@/components/sections/automotriz/subpage/Eligibility";
import { SubPricing } from "@/components/sections/automotriz/subpage/Pricing";
import { SubProcess } from "@/components/sections/automotriz/subpage/Process";
import { SubCalendar } from "@/components/sections/automotriz/subpage/Calendar";
import StickyMobile from "@/components/sections/automotriz/subpage/sticky_mobile";

type Props = { params: { serviceId: string } };

export function generateStaticParams() {
    return AUTO_SERVICES.map(s => ({ serviceId: s.id }));
}

export function generateMetadata({ params }: Props) {
    const svc = AUTO_SERVICES.find(s => s.id === params.serviceId);
    if (!svc) return {};
    return {
        title: `${svc.title} | Servicios`,
        description: svc.description,
    };
}

export default function ServicioPage({ params }: Props) {
    const service = AUTO_SERVICES.find(s => s.id === params.serviceId);
    if (!service) notFound();

    return (
        <div >
            <SubHeroAuto />
            <SubBenefits />
            <SubEligibility />
            <SubPricing />
            <SubProcess />
            <SubCalendar />
            <StickyMobile />
        </div>
    );
}
