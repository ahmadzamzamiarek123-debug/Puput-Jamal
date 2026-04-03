"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  autoPlayOnOpen?: boolean;
  isInviteOpen?: boolean;
}

export default function MusicPlayer({
  autoPlayOnOpen = true,
  isInviteOpen = false,
}: MusicPlayerProps) {
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

  // Track whether auto-play has already fired (prevents re-triggering on pause)
  const hasAutoPlayed = useRef(false);

  // Auto-play when invite is opened (only once)
  useEffect(() => {
    if (autoPlayOnOpen && isInviteOpen && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [isInviteOpen, autoPlayOnOpen]);

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
    <AnimatePresence>
      {isInviteOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
          className="fixed bottom-24 right-4 z-50"
        >
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              relative w-12 h-12 rounded-full shadow-lg 
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
            {isPlaying && (
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-dino-yellow"
              />
            )}

            {/* Icon */}
            <span className="relative z-10 text-xl">
              {isPlaying ? "🎵" : "🔇"}
            </span>

            {/* Music note animation when playing */}
            {isPlaying && (
              <motion.span
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -20,
                  x: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 text-sm"
              >
                ♪
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
