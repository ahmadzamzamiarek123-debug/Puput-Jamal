"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper, { AnimatedItem } from "../ui/SectionWrapper";

export default function Hero() {
  const { scrollY } = useScroll();
  const dinoY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <SectionWrapper
      id="hero"
      staggerChildren
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-50 pt-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50/80 via-transparent to-cream-50" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-lg mx-auto">
        {/* Small title */}
        <AnimatedItem>
          <p className="text-sage-600 font-nunito text-base md:text-lg mb-3 tracking-[0.15em] uppercase">
            Undangan Pernikahan
          </p>
        </AnimatedItem>

        {/* Couple Names */}
        <AnimatedItem>
          <h1 className="font-script text-6xl md:text-8xl text-sage-800 mb-4">
            Puput & Jamal
          </h1>
        </AnimatedItem>

        {/* Date Badge */}
        <AnimatedItem>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-sage-200/50 border border-sage-300/30 mb-6">
            <span className="text-sage-700 font-nunito text-sm md:text-base font-medium">
              06 • April • 2026
            </span>
          </div>
        </AnimatedItem>

        {/* Quote */}
        <AnimatedItem>
          <p className="text-sage-600 font-inter text-sm md:text-base italic max-w-sm mx-auto leading-relaxed">
            &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri...&rdquo;
          </p>
          <p className="text-sage-500 font-nunito text-xs mt-2">
            QS. Ar-Rum: 21
          </p>
        </AnimatedItem>

        {/* Divider */}
        <AnimatedItem>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-dino-yellow to-transparent mx-auto mt-8" />
        </AnimatedItem>

        {/* Scroll indicator */}
        <AnimatedItem className="mt-12">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sage-400"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </AnimatedItem>
      </div>

      {/* Dino Character - Parallax */}
      <motion.div
        style={{ y: dinoY }}
        className="absolute bottom-10 right-4 md:right-16 z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/dino-flower.png"
            alt="Dino membawa bunga"
            width={150}
            height={180}
            className="w-28 md:w-40 h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Floating decorations */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-8 md:left-20 opacity-50"
      >
        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 blur-sm" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-40 right-8 md:right-24 opacity-40"
      >
        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-dino-yellow-light to-dino-yellow blur-sm" />
      </motion.div>
    </SectionWrapper>
  );
}
