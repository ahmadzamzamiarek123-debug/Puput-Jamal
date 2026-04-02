"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const weddingDate = new Date("2026-04-06T07:00:00+07:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 px-4 bg-sage-200/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800 mb-2">
            Menuju Hari Bahagia
          </h2>
          <p className="text-sage-600 font-inter">Senin, 06 April 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card variant="glass" className="p-8">
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-dino-yellow/20 rounded-xl blur-md" />
                    <div className="relative bg-cream-50 rounded-xl p-3 md:p-4 border border-sage-200 shadow-sm">
                      <motion.span
                        key={unit.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="block font-nunito text-3xl md:text-5xl font-bold text-sage-800"
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                    </div>
                  </div>
                  <p className="mt-2 text-sage-600 font-nunito text-xs md:text-sm font-semibold">
                    {unit.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
