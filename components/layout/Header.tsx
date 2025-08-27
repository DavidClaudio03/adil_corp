"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useToggle } from "@/hooks/useToggle";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { SITE, NAV_ITEMS } from "@/config/site";
import type { NavItem } from "@/types/nav";
import MobileNav from "./MobileNav";

type HeaderProps = Readonly<{
    logoText?: string;
    menuItems?: ReadonlyArray<NavItem>;
}>;

export default function Header({
    logoText = SITE.name,
    menuItems = NAV_ITEMS,
}: HeaderProps) {
    const { value: isMenuOpen, toggle, off } = useToggle(false);
    useLockBodyScroll(isMenuOpen);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 glassmorphism"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <a
                            href="#home"
                            className="flex items-center gap-2 text-xl lg:text-2xl font-bold text-foreground hover:glow-blue transition-all duration-300 bg-transparent"
                            aria-label={`${SITE.name} - Inicio`}
                        >
                            <Image
                                src={SITE.logoSrc}
                                alt={`${SITE.name} Logo`}
                                width={40}
                                height={40}
                                className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                                priority
                            />
                            <span className="whitespace-nowrap">{logoText}</span>
                        </a>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-secondary/90 relative group"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    role="menuitem"
                                >
                                    {item.label}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        layoutId="navbar-indicator"
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={toggle}
                            className="text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors duration-200"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle navigation menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <MobileNav isOpen={isMenuOpen} items={menuItems} onClose={off} />
            </nav>
        </motion.header>
    );
}
