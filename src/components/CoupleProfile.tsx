"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "./ui";

interface PersonProps {
  name: string;
  title: string;
  parents: string;
  imageSrc: string;
  delay?: number;
}

function PersonCard({
  name,
  title,
  parents,
  imageSrc,
  delay = 0,
}: PersonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 animate-pulse-soft" />
        <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-cream-50 shadow-lg">
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </div>
      </div>
      <p className="text-sage-600 font-nunito text-sm mb-1">{title}</p>
      <h3 className="font-script text-3xl md:text-4xl text-sage-800 mb-2">
        {name}
      </h3>
      <p className="text-sage-600 font-inter text-sm">{parents}</p>
    </motion.div>
  );
}

export default function CoupleProfile() {
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
          <p className="text-sage-600 font-nunito text-lg mb-2">
            Bismillahirrahmanirrahim
          </p>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800 mb-4">
            Assalamu&apos;alaikum Wr. Wb.
          </h2>
        </motion.div>

        {/* Ayat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card variant="glass" className="text-center mb-12">
            <p className="text-sage-700 font-inter text-base md:text-lg leading-relaxed italic mb-4">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
              menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
              kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan
              di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <p className="text-sage-600 font-nunito font-semibold">
              QS. Ar-Rum : 21
            </p>
          </Card>
        </motion.div>

        {/* Couple Cards */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <PersonCard
            title="Pengantin Wanita"
            name="Putri Rahayu"
            parents="Putri dari Bpk. Anwar (Alm) & Ibu Nur Qomariyah"
            imageSrc="/an.png"
            delay={0.2}
          />

          {/* Divider */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="text-dino-yellow text-4xl">&amp;</span>
          </motion.div>

          <PersonCard
            title="Pengantin Pria"
            name="Khoirul Jamal"
            parents="Putra dari Bpk. Abdul Jamil (Alm) & Ibu Kasmi"
            imageSrc="/WhatsApp_Image_2026-01-21_at_02.21.22-removebg-preview.png"
            delay={0.4}
          />
        </div>

        {/* Mobile divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-20 h-0.5 bg-dino-yellow mx-auto mt-8 md:hidden"
        />
      </div>
    </section>
  );
}
