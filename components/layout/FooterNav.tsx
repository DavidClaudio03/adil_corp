"use client";

import Link from "next/link";
import { memo } from "react";
import type { FooterLink } from "@/types/footer";

type Props = Readonly<{ links: ReadonlyArray<FooterLink> }>;

export default memo(function FooterNav({ links }: Props) {
    if (!links.length) return null;

    return (
        <nav aria-label="Footer navigation" className="mt-10">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                {links.map(link => (
                    <li key={link.id}>
                        <Link
                            href={link.href}
                            className="text-background/80 hover:text-background underline-offset-4 hover:underline transition-colors"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
});
