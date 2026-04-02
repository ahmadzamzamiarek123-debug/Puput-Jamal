"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Cover from "@/components/sections/Cover";
import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import Event from "@/components/sections/Event";
import Wishes from "@/components/sections/Wishes";
import FloatingNav from "@/components/layout/FloatingNav";
import MusicPlayer from "@/components/layout/MusicPlayer";

function CoverLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream-50">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center border-4 border-cream-50 shadow-lg mb-4">
          <span className="font-script text-3xl text-sage-800">P&J</span>
        </div>
        <p className="text-sage-500 font-nunito text-sm animate-pulse">Memuat undangan...</p>
      </div>
    </div>
  );
}

function InvitationContent() {
  const searchParams = useSearchParams();
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Read ?to= parameter and decode (+ and %20 → space)
  const guestName = searchParams.get("to") || "Tamu Undangan";

  const handleOpenInvite = () => {
    setIsInviteOpen(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      {/* Cover Page */}
      <AnimatePresence mode="wait">
        {!isInviteOpen && (
          <Cover guestName={guestName} onOpenInvite={handleOpenInvite} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isInviteOpen && (
        <main className="min-h-screen">
          <Hero />
          <Couple />
          <Event />
          <Wishes />
        </main>
      )}

      {/* Music Player */}
      <MusicPlayer isInviteOpen={isInviteOpen} autoPlayOnOpen />

      {/* Floating Navigation */}
      <FloatingNav isVisible={isInviteOpen} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<CoverLoading />}>
      <InvitationContent />
    </Suspense>
  );
}
