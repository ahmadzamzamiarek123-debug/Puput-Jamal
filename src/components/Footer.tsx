"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-sage-800 text-cream-50">
      <div className="section-container text-center">
        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/dino-happy.png"
                alt="Dino bahagia"
                width={100}
                height={120}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>

          <p className="font-inter text-cream-100 mb-4 max-w-md mx-auto">
            Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i.
            <br />
            Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
            hadir dan memberikan doa restu.
          </p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-script text-5xl md:text-6xl text-dino-yellow mb-6"
          >
            Puput & Jamal
          </motion.h2>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-dino-yellow to-transparent mx-auto mb-6" />

          {/* Hashtag */}
          <p className="font-nunito text-cream-100 text-lg mb-8">
            #PuputJamalWedding
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-sage-700 pt-6"
        >
          <p className="text-sage-400 text-sm">© 2026 Puput & Jamal Wedding</p>
          <p className="text-sage-500 text-xs mt-1">
            Made with 💛 for a special day
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
