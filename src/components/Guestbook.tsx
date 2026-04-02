"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Input, Textarea, Select } from "./ui";
import {
  submitGuestbook,
  getGuestbookEntries,
  type GuestbookEntry,
} from "@/app/actions";

const attendanceOptions = [
  { value: "Hadir", label: "✅ Hadir" },
  { value: "Tidak Hadir", label: "❌ Tidak Hadir" },
  { value: "Tentative", label: "🤔 Belum Pasti" },
];

function GuestbookForm({ onSuccess }: { onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await submitGuestbook(formData);
      if (result.success) {
        setSuccess(true);
        onSuccess();
        // Reset form
        const form = document.getElementById(
          "guestbook-form",
        ) as HTMLFormElement;
        form?.reset();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Terjadi kesalahan");
      }
    });
  }

  return (
    <form id="guestbook-form" action={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Nama Anda"
        required
        disabled={isPending}
      />

      <Select
        name="attendance"
        options={attendanceOptions}
        disabled={isPending}
      />

      <Textarea
        name="message"
        placeholder="Tuliskan ucapan & doa untuk kedua mempelai..."
        rows={4}
        required
        disabled={isPending}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      {success && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm text-center"
        >
          ✅ Terima kasih! Ucapan Anda telah terkirim.
        </motion.p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Mengirim..." : "💌 Kirim Ucapan"}
      </Button>
    </form>
  );
}

function GuestbookList({ entries }: { entries: GuestbookEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-sage-500">
        <p>Belum ada ucapan. Jadilah yang pertama! 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      <AnimatePresence>
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-cream-50 rounded-xl p-4 border border-sage-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center text-sage-700 font-bold text-sm flex-shrink-0">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-nunito font-bold text-sage-800">
                      {entry.name}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sage-200 text-sage-700">
                      {entry.attendance}
                    </span>
                  </div>
                  <p className="text-sage-700 text-sm mt-1 break-words">
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
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  const fetchEntries = async () => {
    const data = await getGuestbookEntries();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <section className="py-20 px-4 bg-sage-200/30">
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <Image
              src="/dino-wave.png"
              alt="Dino melambai"
              width={80}
              height={100}
              className="animate-float"
            />
          </div>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800 mb-2">
            Buku Tamu & Ucapan
          </h2>
          <p className="text-sage-600 font-inter">
            Kirimkan doa dan ucapan terbaik untuk kami 💕
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="glass">
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-4">
                ✍️ Tulis Ucapan
              </h3>
              <GuestbookForm onSuccess={fetchEntries} />
            </Card>
          </motion.div>

          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="glass">
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-4">
                💬 Ucapan ({entries.length})
              </h3>
              <GuestbookList entries={entries} />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
