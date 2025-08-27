"use client";

import { motion } from "framer-motion";
import type { NavItem } from "@/types/nav";

type MobileNavProps = Readonly<{
    isOpen: boolean;
    items: ReadonlyArray<NavItem>;
    onClose: () => void;
}>;

export default function MobileNav({ isOpen, items, onClose }: MobileNavProps) {
    return (
        <motion.div
            id="mobile-menu"
            className={`md:hidden ${isOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
                opacity: isOpen ? 1 : 0,
                height: isOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            role="menu"
        >
            <div className="px-2 pt-2 pb-3 space-y-1 glassmorphism mt-2 rounded-lg">
                {items.map((item, index) => (
                    <motion.a
                        key={item.href}
                        href={item.href}
                        className="text-muted-foreground hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-secondary/90"
                        onClick={onClose}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        role="menuitem"
                    >
                        {item.label}
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}
