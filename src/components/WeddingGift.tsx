"use client";

import { motion } from "framer-motion";
import { Card, Button } from "./ui";

export default function WeddingGift() {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} berhasil disalin!`);
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
          className="text-center mb-8"
        >
          <span className="text-5xl mb-4 block">🎁</span>
          <h2 className="font-nunito text-2xl md:text-3xl font-bold text-sage-800 mb-4">
            Wedding Gift
          </h2>
          <p className="text-sage-600 font-inter max-w-md mx-auto">
            Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin
            memberikan tanda kasih untuk kami, dapat melalui:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="text-center h-full">
              <span className="text-3xl mb-3 block">💳</span>
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-2">
                Transfer Bank
              </h3>
              <div className="bg-cream-50 rounded-xl p-4 mb-4 border border-sage-200">
                <p className="text-sage-700 font-nunito font-bold mb-1">
                  SEABANK
                </p>
                <p className="text-sage-800 font-inter text-lg font-semibold">
                  901570066360
                </p>
                <p className="text-sage-600 text-sm">
                  a.n Putri Rahayu Retno Safitri
                </p>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard("901570066360", "Nomor rekening")
                }
                variant="secondary"
                size="sm"
              >
                📋 Salin Rekening
              </Button>
            </Card>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="text-center h-full">
              <span className="text-3xl mb-3 block">📦</span>
              <h3 className="font-nunito text-lg font-bold text-sage-800 mb-2">
                Kirim Kado
              </h3>
              <div className="bg-cream-50 rounded-xl p-4 mb-4 border border-sage-200">
                <p className="text-sage-700 font-inter text-sm leading-relaxed">
                  Pedurungan RT/RW 02/02
                  <br />
                  DukuhTunggal Kec.Glagah
                  <br />
                  Kab.Lamongan
                </p>
              </div>
              <Button
                onClick={() =>
                  copyToClipboard(
                    "Pedurungan RT/RW 02/02 DukuhTunggal Kec.Glagah Kab.Lamongan",
                    "Alamat",
                  )
                }
                variant="secondary"
                size="sm"
              >
                📋 Salin Alamat
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
