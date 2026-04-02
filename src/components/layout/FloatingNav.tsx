"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "couple", label: "Mempelai", icon: "💕" },
  { id: "event", label: "Acara", icon: "📅" },
  { id: "wishes", label: "Ucapan", icon: "💬" },
];

interface FloatingNavProps {
  isVisible: boolean;
}

export default function FloatingNav({ isVisible }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Find active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.5,
          }}
          className={`
            fixed bottom-4 left-1/2 -translate-x-1/2 z-50
            px-2 py-2 rounded-full
            bg-white/70 backdrop-blur-lg
            border border-white/30
            shadow-lg shadow-sage-800/10
            transition-all duration-300
            ${isScrolled ? "scale-100" : "scale-95"}
          `}
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex flex-col items-center justify-center
                    w-14 h-14 rounded-full
                    transition-all duration-300
                    ${
                      activeSection === item.id
                        ? "bg-dino-yellow text-sage-800"
                        : "text-sage-600 hover:bg-sage-100"
                    }
                  `}
                  aria-label={item.label}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] font-nunito font-semibold mt-0.5">
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-dino-yellow rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
