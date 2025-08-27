"use client";

import Link from "next/link";
import { memo } from "react";
import type { FooterContact } from "@/types/footer";

type Props = Readonly<{ item: FooterContact }>;

export default memo(function FooterContactItem({ item }: Props) {
    const Wrapper = item.href ? Link : "div";
    const wrapperProps = item.href ? { href: item.href } : {};

    return (
        <Wrapper
            {...(wrapperProps as any)}
            className="flex flex-col items-center group hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--color-ring] rounded-md p-2"
            aria-label={item.srOnly ?? `${item.label}: ${item.value}`}
        >
            <item.icon className="h-8 w-8 mb-2 text-secondary group-hover:rotate-12 transition-transform duration-300" />
            <p className="font-semibold">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.value}</p>
        </Wrapper>
    );
});
