"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CoverProps {
  guestName?: string;
  onOpenInvite: () => void;
}

export default function Cover({
  guestName = "Tamu Undangan",
  onOpenInvite,
}: CoverProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50/50 via-transparent to-cream-50/80" />

      {/* Floating Decorations */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-8 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 opacity-40 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-32 right-12 w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dino-yellow-light to-dino-yellow opacity-50 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-40 left-12 w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-sage-300 to-sage-400 opacity-30 blur-sm"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        {/* Logo/Monogram */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="mb-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center border-4 border-cream-50 shadow-lg">
            <span className="font-script text-3xl md:text-4xl text-sage-800">
              P&J
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sage-600 font-nunito text-sm md:text-base tracking-[0.2em] uppercase mb-2"
        >
          The Wedding Of
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          className="font-script text-5xl md:text-7xl text-sage-800 mb-4"
        >
          Puput & Jamal
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sage-600 font-nunito text-base md:text-lg font-medium mb-8"
        >
          Senin, 06 April 2026
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-dino-yellow to-transparent mx-auto mb-8"
        />

        {/* Guest Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8"
        >
          <p className="text-sage-500 font-inter text-sm mb-1">Kepada Yth:</p>
          <p className="text-sage-800 font-nunito text-xl md:text-2xl font-bold">
            {guestName}
          </p>
        </motion.div>

        {/* Open Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.button
            onClick={onOpenInvite}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(244, 208, 63, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="
              relative overflow-hidden
              px-8 py-4 rounded-full
              bg-gradient-to-r from-dino-yellow to-dino-yellow-light
              text-sage-800 font-nunito font-bold text-lg
              shadow-lg shadow-dino-yellow/30
              transition-all duration-300
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>✉️</span>
              <span>Buka Undangan</span>
            </span>

            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          </motion.button>
        </motion.div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-4 text-sage-400 text-xs font-inter"
        >
          Klik untuk membuka undangan
        </motion.p>
      </div>

      {/* Dino Illustration - Bottom Right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, type: "spring" }}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/dino-flower.png"
            alt="Dino membawa bunga"
            width={120}
            height={150}
            className="w-24 md:w-32 h-auto drop-shadow-xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Dino Peeking - Bottom Left */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-4 md:left-12"
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/dino-happy.png"
            alt="Dino mengintip"
            width={80}
            height={100}
            className="w-16 md:w-20 h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
