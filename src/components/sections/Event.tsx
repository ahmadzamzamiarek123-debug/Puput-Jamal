"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { AnimatedItem, ScaleIn } from "../ui/SectionWrapper";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer() {
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

  if (!mounted) return null;

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-dino-yellow/20 rounded-xl blur-md" />
            <div className="relative bg-cream-50 rounded-xl p-2 md:p-3 border border-sage-200 shadow-sm">
              <motion.span
                key={unit.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="block font-nunito text-2xl md:text-4xl font-bold text-sage-800"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
            </div>
          </div>
          <p className="mt-1 text-sage-600 font-nunito text-[10px] md:text-xs font-semibold">
            {unit.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

interface EventCardProps {
  icon: string;
  title: string;
  date: string;
  time: string;
}

function EventCard({ icon, title, date, time }: EventCardProps) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="font-nunito text-lg font-bold text-sage-800 mb-2">
        {title}
      </h3>
      <p className="text-sage-700 font-inter font-medium text-sm">{date}</p>
      <p className="text-sage-600 font-inter text-sm">{time}</p>
    </div>
  );
}

export default function Event() {
  const handleOpenMaps = () => {
    window.open("https://maps.app.goo.gl/Zy9y43cbouAZjmdT7", "_blank");
  };

  return (
    <SectionWrapper
      id="event"
      staggerChildren
      className="py-20 px-4 bg-cream-50"
    >
      <div className="section-container">
        {/* Section Title */}
        <AnimatedItem className="text-center mb-8">
          <p className="text-dino-yellow font-nunito text-sm uppercase tracking-wider mb-2">
            Save The Date
          </p>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800">
            Waktu & Tempat
          </h2>
        </AnimatedItem>

        {/* Countdown */}
        <AnimatedItem className="mb-10">
          <div className="glass rounded-2xl p-5 md:p-6">
            <p className="text-center text-sage-600 font-nunito text-sm mb-4">
              Menghitung hari menuju pernikahan kami
            </p>
            <CountdownTimer />
          </div>
        </AnimatedItem>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <ScaleIn delay={0.1}>
            <EventCard
              icon="💍"
              title="Akad Nikah"
              date="Senin, 06 April 2026"
              time="07.00 WIB"
            />
          </ScaleIn>
          <ScaleIn delay={0.2}>
            <EventCard
              icon="🎉"
              title="Resepsi"
              date="Senin, 06 April 2026"
              time="09.00 WIB - Selesai"
            />
          </ScaleIn>
        </div>

        {/* Location */}
        <AnimatedItem>
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">📍</span>
            <h3 className="font-nunito text-lg font-bold text-sage-800 mb-2">
              Lokasi Acara
            </h3>
            <p className="text-sage-700 font-inter text-sm mb-4 leading-relaxed">
              Pedurungan RT 02 RW 02
              <br />
              Glagah, Lamongan
            </p>
            <motion.button
              onClick={handleOpenMaps}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full
                bg-dino-yellow text-sage-800
                font-nunito font-semibold text-sm
                shadow-md hover:shadow-lg
                transition-shadow
              "
            >
              <span>🗺️</span>
              <span>Buka Maps</span>
            </motion.button>
          </div>
        </AnimatedItem>

        {/* Gift Section */}
        <AnimatedItem className="mt-8">
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">🎁</span>
            <h3 className="font-nunito text-lg font-bold text-sage-800 mb-2">
              Wedding Gift
            </h3>
            <p className="text-sage-600 font-inter text-sm mb-4 max-w-sm mx-auto">
              Tanpa mengurangi rasa hormat, bagi yang ingin memberikan tanda
              kasih:
            </p>

            <div className="bg-cream-50 rounded-xl p-4 border border-sage-200 inline-block">
              <p className="text-sage-700 font-nunito font-bold text-sm mb-1">
                SEABANK
              </p>
              <p className="text-sage-800 font-inter text-lg font-semibold">
                901570066360
              </p>
              <p className="text-sage-500 text-xs">
                a.n Putri Rahayu Retno Safitri
              </p>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </SectionWrapper>
  );
}
