"use client";

import { motion } from "framer-motion";
import { Card, Button } from "./ui";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  icon: string;
  delay?: number;
}

function EventCard({ title, date, time, icon, delay = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card variant="glass" className="text-center h-full">
        <span className="text-4xl mb-4 block">{icon}</span>
        <h3 className="font-nunito text-xl font-bold text-sage-800 mb-2">
          {title}
        </h3>
        <p className="text-sage-700 font-inter font-semibold mb-1">{date}</p>
        <p className="text-sage-600 font-inter text-sm">{time}</p>
      </Card>
    </motion.div>
  );
}

export default function EventDetails() {
  const handleOpenMaps = () => {
    window.open("https://maps.app.goo.gl/Zy9y43cbouAZjmdT7", "_blank");
  };

  return (
    <section className="py-20 px-4 bg-cream-50">
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800 mb-4">
            Acara Pernikahan
          </h2>
          <p className="text-sage-600 font-inter max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <EventCard
            icon="💍"
            title="Akad Nikah"
            date="Senin, 06 April 2026"
            time="08.00 WIB"
            delay={0.2}
          />
          <EventCard
            icon="🎉"
            title="Resepsi"
            date="Senin, 06 April 2026"
            time="13.00 WIB - Selesai"
            delay={0.4}
          />
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="glass" className="text-center">
            <span className="text-4xl mb-4 block">📍</span>
            <h3 className="font-nunito text-xl font-bold text-sage-800 mb-2">
              Lokasi Acara
            </h3>
            <p className="text-sage-700 font-inter mb-4">
              Pedurungan RT 02 RW 02
              <br />
              Glagah, Lamongan
            </p>
            <Button onClick={handleOpenMaps} variant="primary" size="md">
              🗺️ Buka Maps
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
