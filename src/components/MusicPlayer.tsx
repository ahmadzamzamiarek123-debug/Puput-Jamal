"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio("/Ari Lasso - Cinta Terakhir.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          relative w-14 h-14 rounded-full shadow-lg 
          flex items-center justify-center
          transition-all duration-300
          ${
            isPlaying
              ? "bg-dino-yellow text-sage-800"
              : "bg-sage-800 text-cream-50"
          }
        `}
        aria-label={isPlaying ? "Pause musik" : "Play musik"}
      >
        {/* Pulsing ring when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-dino-yellow"
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <span className="relative z-10 text-2xl">
          {isPlaying ? "🎵" : "🔇"}
        </span>

        {/* Music note animation when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -30,
                x: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-lg"
            >
              ♪
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="bg-sage-800 text-cream-50 text-xs px-3 py-1.5 rounded-lg shadow-md">
          {isPlaying ? "Matikan musik" : "Putar musik"}
        </span>
      </motion.div>
    </motion.div>
  );
}
