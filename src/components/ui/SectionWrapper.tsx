"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

// Container variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
};

// Individual item variants
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
    },
  },
};

/**
 * SectionWrapper - Reusable animation wrapper for sections
 *
 * Wraps content with scroll-triggered animations using Framer Motion.
 * Supports staggered children animations for a professional "Canva-like" effect.
 *
 * @example
 * <SectionWrapper staggerChildren>
 *   <AnimatedItem>First item</AnimatedItem>
 *   <AnimatedItem>Second item (appears after first)</AnimatedItem>
 * </SectionWrapper>
 */
export default function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.15,
}: SectionWrapperProps) {
  if (staggerChildren) {
    return (
      <motion.section
        id={id}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        custom={staggerDelay}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  );
}

/**
 * AnimatedItem - Child component for staggered animations
 *
 * Use inside SectionWrapper with staggerChildren=true
 */
export function AnimatedItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * AnimatedText - Animated text with fade-up effect
 */
export function AnimatedText({
  children,
  className = "",
  as: Component = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
}) {
  const MotionComponent = motion[Component];

  return (
    <MotionComponent className={className} variants={itemVariants}>
      {children}
    </MotionComponent>
  );
}

/**
 * AnimatedImage - Animated image with scale effect
 */
export function AnimatedImage({
  src,
  alt,
  className = "",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    />
  );
}

/**
 * FadeIn - Simple fade-in animation
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideIn - Slide in from direction
 */
export function SlideIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) {
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - Scale in animation
 */
export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
