"use client";

import { motion } from "framer-motion";

const BRAND = "#07518a";

export default function AboutSection() {
  return (
    <section className="w-full bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: BRAND }}
          >
            About Us
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Established in 2006, Brihaspathi Technologies Limited is a premier
            global technology conglomerate specializing in E-Security, AI-driven
            software, IoT, and renewable energy. With over 20 years of
            experience, we have evolved from a web development startup into a
            multi-domain leader serving 12,000+ clients worldwide, backed by
            300+ technology experts and a footprint across India, the USA, and
            Dubai.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
