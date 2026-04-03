"use client";

import Image from "next/image";
import SectionWrapper, { AnimatedItem, SlideIn } from "../ui/SectionWrapper";

interface PersonProps {
  name: string;
  fullName: string;
  title: string;
  parents: string;
  imageSrc: string;
}

function PersonCard({ name, fullName, title, parents, imageSrc }: PersonProps) {
  return (
    <div className="text-center">
      {/* Photo */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 animate-pulse-soft" />
        <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-cream-50 shadow-lg">
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </div>
      </div>

      {/* Info */}
      <p className="text-sage-500 font-nunito text-xs uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="font-script text-3xl md:text-4xl text-sage-800 mb-1">
        {name}
      </h3>
      <p className="text-sage-700 font-nunito text-sm font-medium mb-2">
        {fullName}
      </p>
      <p className="text-sage-500 font-inter text-xs leading-relaxed">
        {parents}
      </p>
    </div>
  );
}

export default function Couple() {
  return (
    <SectionWrapper
      id="couple"
      staggerChildren
      className="py-20 px-4 bg-sage-200/20"
    >
      <div className="section-container">
        {/* Section Title */}
        <AnimatedItem className="text-center mb-6">
          <p className="text-dino-yellow font-nunito text-sm uppercase tracking-wider mb-2">
            Bismillahirrahmanirrahim
          </p>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800">
            Assalamu&apos;alaikum Wr. Wb.
          </h2>
        </AnimatedItem>

        {/* Intro Text */}
        <AnimatedItem className="text-center mb-12">
          <p className="text-sage-600 font-inter text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Maha Suci Allah yang telah menciptakan makhluk-Nya
            berpasang-pasangan. Ya Allah, semoga ridho-Mu tercurah mengiringi
            pernikahan kami.
          </p>
        </AnimatedItem>

        {/* Couple Cards */}
        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-2xl mx-auto">
          <SlideIn direction="left">
            <PersonCard
              title="Pengantin Wanita"
              name="Puput"
              fullName="Putri Rahayu Retno Safitri"
              parents="Putri dari Bpk. Anwar (Alm) & Ibu Nur Qomariyah"
              imageSrc="/an.png"
            />
          </SlideIn>

          {/* Ampersand Divider - Between cards on mobile, centered overlay on desktop */}
          <AnimatedItem className="flex items-center justify-center order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-10">
            <div className="w-16 h-16 rounded-full bg-dino-yellow flex items-center justify-center shadow-lg">
              <span className="font-script text-3xl text-sage-800">&</span>
            </div>
          </AnimatedItem>

          <SlideIn direction="right">
            <PersonCard
              title="Pengantin Pria"
              name="Jamal"
              fullName="Khoirul Jamal"
              parents="Putra dari Bpk. Abdul Jamil (Alm) & Ibu Kasmi"
              imageSrc="/WhatsApp_Image_2026-01-21_at_02.21.22-removebg-preview.png"
            />
          </SlideIn>
        </div>

        {/* Divider */}
        <AnimatedItem className="mt-12">
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-sage-400 to-transparent mx-auto" />
        </AnimatedItem>
      </div>
    </SectionWrapper>
  );
}
