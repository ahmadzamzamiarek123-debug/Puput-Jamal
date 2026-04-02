"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect - dino moves up as user scrolls down
  const dinoY = useTransform(scrollY, [0, 500], [0, -100]);
  const flowerOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-50">
        <div className="text-center">
          <p className="text-sage-600 font-nunito">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden floral-bg">
      {/* Background Pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-20" />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cream-50/80 via-transparent to-cream-50"
        style={{ opacity: flowerOpacity }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 py-20">
        {/* Small title */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sage-600 font-nunito text-lg md:text-xl mb-4 tracking-wide"
        >
          The Wedding Of
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script text-6xl md:text-8xl lg:text-9xl text-sage-800 mb-6"
        >
          Puput & Jamal
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sage-700 font-nunito text-xl md:text-2xl font-semibold mb-8"
        >
          06 • 04 • 2026
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-32 h-1 bg-gradient-to-r from-transparent via-dino-yellow to-transparent mx-auto mb-8"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sage-500"
          >
            <svg
              className="w-8 h-8 mx-auto"
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
        </motion.div>
      </div>

      {/* Dino Character - sliding up from bottom */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        style={{ y: dinoY }}
        className="absolute bottom-0 right-4 md:right-12 lg:right-24 z-20"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/dino-flower.png"
            alt="Dino membawa bunga"
            width={180}
            height={220}
            className="w-32 md:w-44 lg:w-52 h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Floating flower decorations */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-8 md:left-16 opacity-60"
      >
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 blur-sm" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-40 right-12 md:right-24 opacity-40"
      >
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dino-yellow-light to-dino-yellow blur-sm" />
      </motion.div>
    </section>
  );
}
