"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { AnimatedItem } from "../ui/SectionWrapper";
import {
  submitGuestbook,
  getGuestbookEntries,
  type GuestbookEntry,
} from "@/app/actions";

const attendanceOptions = [
  { value: "", label: "Konfirmasi Kehadiran" },
  { value: "Hadir", label: "✅ Hadir" },
  { value: "Tidak Hadir", label: "❌ Tidak Hadir" },
  { value: "Tentative", label: "🤔 Belum Pasti" },
];

function WishForm({ onSuccess }: { onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMessage(null);

    startTransition(async () => {
      const result = await submitGuestbook(formData);
      if (result.success) {
        setMessage({
          type: "success",
          text: "Terima kasih! Ucapan Anda telah terkirim. 💕",
        });
        onSuccess();
        const form = document.getElementById("wish-form") as HTMLFormElement;
        form?.reset();
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Terjadi kesalahan",
        });
      }
    });
  }

  return (
    <form id="wish-form" action={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nama Anda"
        required
        disabled={isPending}
        className="
          w-full px-4 py-3 rounded-xl
          bg-cream-50 border border-sage-200
          text-sage-800 font-inter text-sm
          placeholder:text-sage-400
          focus:outline-none focus:ring-2 focus:ring-dino-yellow/50 focus:border-dino-yellow
          disabled:opacity-50
          transition-all
        "
      />

      <select
        name="attendance"
        required
        disabled={isPending}
        className="
          w-full px-4 py-3 rounded-xl
          bg-cream-50 border border-sage-200
          text-sage-800 font-inter text-sm
          focus:outline-none focus:ring-2 focus:ring-dino-yellow/50 focus:border-dino-yellow
          disabled:opacity-50
          transition-all
        "
      >
        {attendanceOptions.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.label}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        placeholder="Tuliskan ucapan & doa untuk kedua mempelai..."
        rows={4}
        required
        disabled={isPending}
        className="
          w-full px-4 py-3 rounded-xl
          bg-cream-50 border border-sage-200
          text-sage-800 font-inter text-sm
          placeholder:text-sage-400
          focus:outline-none focus:ring-2 focus:ring-dino-yellow/50 focus:border-dino-yellow
          disabled:opacity-50
          resize-none
          transition-all
        "
      />

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm text-center font-inter ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isPending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="
          w-full py-3.5 rounded-xl
          bg-gradient-to-r from-dino-yellow to-dino-yellow-light
          text-sage-800 font-nunito font-bold text-sm
          shadow-md hover:shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        "
      >
        {isPending ? "Mengirim..." : "💌 Kirim Ucapan"}
      </motion.button>
    </form>
  );
}

function WishCard({ entry }: { entry: GuestbookEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-cream-50 rounded-xl p-4 border border-sage-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center text-sage-700 font-bold text-sm flex-shrink-0">
          {entry.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-nunito font-bold text-sage-800 text-sm">
              {entry.name}
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage-200 text-sage-700">
              {entry.attendance}
            </span>
          </div>
          <p className="text-sage-700 text-sm mt-1 break-words leading-relaxed">
            {entry.message}
          </p>
          <p className="text-sage-400 text-xs mt-2">
            {new Date(entry.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Wishes() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  const fetchEntries = async () => {
    const data = await getGuestbookEntries();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <SectionWrapper
      id="wishes"
      staggerChildren
      className="py-20 px-4 bg-sage-200/20"
    >
      <div className="section-container">
        {/* Section Title */}
        <AnimatedItem className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/dino-wave.png"
                alt="Dino melambai"
                width={80}
                height={100}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>
          <p className="text-dino-yellow font-nunito text-sm uppercase tracking-wider mb-2">
            Guestbook
          </p>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800">
            Ucapan & Doa
          </h2>
          <p className="text-sage-600 font-inter text-sm mt-2">
            Kirimkan doa dan ucapan terbaik untuk kami 💕
          </p>
        </AnimatedItem>

        <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Form */}
          <AnimatedItem>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-4">
                ✍️ Tulis Ucapan
              </h3>
              <WishForm onSuccess={fetchEntries} />
            </div>
          </AnimatedItem>

          {/* Messages List */}
          <AnimatedItem>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-4">
                💬 Ucapan ({entries.length})
              </h3>

              {entries.length === 0 ? (
                <div className="text-center py-6 text-sage-500 font-inter text-sm">
                  Belum ada ucapan. Jadilah yang pertama! 🎉
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {entries.map((entry) => (
                      <WishCard key={entry.id} entry={entry} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </AnimatedItem>
        </div>

        {/* Footer Thank You */}
        <AnimatedItem className="mt-16 text-center">
          <div className="inline-flex items-center gap-3">
            <Image
              src="/dino-happy.png"
              alt="Dino happy"
              width={50}
              height={60}
              className="animate-float"
            />
            <div>
              <p className="font-script text-2xl text-sage-800">Terima Kasih</p>
              <p className="text-sage-600 font-inter text-sm">
                Atas kehadiran dan doa restu Anda
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-script text-xl text-sage-700">Puput & Jamal</p>
          </div>

          <div className="mt-8 pt-6 border-t border-sage-200">
            <p className="text-sage-400 font-inter text-xs">
              Made with 💕 | © 2026 Puput & Jamal
            </p>
          </div>
        </AnimatedItem>
      </div>
    </SectionWrapper>
  );
}
