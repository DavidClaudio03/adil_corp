"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  logoText?: string
  menuItems?: Array<{ label: string; href: string }>
}

export default function Header({
  logoText = "ADIL CORP",
  menuItems = [
    { label: "Home", href: "#home" },
    { label: "Asesoría Automotriz", href: "#automotive" },
    { label: "Marketing Digital", href: "#marketing" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contact" },
  ],
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              aria-label="ADIL CORP - Inicio"
            >
              <img
                src="/logo_adil.png"
                alt="Logo Adil Corp"
                className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        <motion.div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          role="menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 glassmorphism mt-2 rounded-lg">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-secondary/90"
                onClick={() => setIsMenuOpen(false)}
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
      </nav>
    </motion.header>
  )
}
