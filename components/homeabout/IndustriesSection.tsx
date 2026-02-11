"use client";

import React from "react";
import { motion, Transition } from "framer-motion";
import {
  Landmark,
  GraduationCap,
  Heart,
  Building2,
  ShoppingBag,
  Factory,
  Zap,
  LucideIcon,
} from "lucide-react";

/* ---------------- BRAND ---------------- */
const BRAND = "#07518a";

/* ---------------- HELPERS ---------------- */
const EASING: Transition["ease"] = [0.22, 1, 0.36, 1];

const MOTION_TIMING: Transition = {
  duration: 0.9,
  ease: EASING,
};

const randomDelay = (index: number, min = 0.1, max = 0.25) =>
  (index * 0.12) % (max - min) + min;

/* ---------------- TYPES ---------------- */
type Industry = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
};

/* ---------------- DATA ---------------- */
const INDUSTRIES: Industry[] = [
  {
    slug: "government",
    title: "Government & Smart Cities",
    icon: Landmark,
    description:
      "Smart city solutions, election monitoring, border security, and public safety systems.",
    bullets: ["Election Webcasting", "Border Security", "Smart City Projects"],
  },
  {
    slug: "education",
    title: "Education Institutions",
    icon: GraduationCap,
    description:
      "Campus security, examination surveillance, biometric attendance, and educational technology.",
    bullets: ["NEET Surveillance", "Campus Security", "Biometric Systems"],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Hospitals",
    icon: Heart,
    description:
      "Hospital security systems, patient monitoring, and healthcare technology solutions.",
    bullets: ["Hospital Security", "Patient Monitoring", "Healthcare IT"],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Construction",
    icon: Building2,
    description:
      "Building automation, security systems, and smart infrastructure solutions.",
    bullets: ["Building Automation", "Security Systems", "Smart Infrastructure"],
  },
  {
    slug: "banking",
    title: "Banking & Financial",
    icon: Landmark,
    description:
      "Bank security, ATM surveillance, fraud prevention, and financial technology solutions.",
    bullets: ["Bank Security", "ATM Monitoring", "Fraud Prevention"],
  },
  {
    slug: "retail",
    title: "Retail & Commercial",
    icon: ShoppingBag,
    description:
      "Retail security, inventory management, customer analytics, and commercial automation.",
    bullets: ["Retail Security", "Inventory Systems", "Customer Analytics"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Industrial",
    icon: Factory,
    description:
      "Industrial automation, safety systems, production monitoring, and quality control.",
    bullets: ["Industrial Automation", "Safety Systems", "Production Monitoring"],
  },
  {
    slug: "energy",
    title: "Energy & Utilities",
    icon: Zap,
    description:
      "Solar installations, power plant security, energy management, and utility monitoring.",
    bullets: ["Solar Projects", "Power Plant Security", "Energy Management"],
  },
];

/* ---------------- COMPONENT ---------------- */
export default function IndustriesWeServeSection() {
  return (
    <section className="relative z-50 py-10 lg:py-14 bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION_TIMING }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
            style={{ backgroundColor: "#0ea5e9" }}
          >
            <Landmark className="w-4 h-4 text-white" strokeWidth={2} />
            <span className="text-white text-sm font-medium">
              Industries We Serve
            </span>
          </div>
        </motion.div>

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION_TIMING, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800 font-sans"
        >
          Transforming Industries with Technology
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION_TIMING, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-sm sm:text-base max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          Our expertise spans across diverse sectors, delivering tailored solutions that meet the unique challenges and requirements of each industry.
        </motion.p>

        {/* GRID - 2x4 on desktop, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {INDUSTRIES.map((item, index) => {
            const Icon = item.icon;
            const isHealthcare = item.slug === "healthcare";

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  ...MOTION_TIMING,
                  delay: randomDelay(index),
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* CARD */}
                <div
                  className="
                    h-full rounded-xl border border-gray-200
                    bg-white p-5 sm:p-6
                    transition-shadow duration-300 hover:shadow-lg
                  "
                >
                  {/* ICON */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(14, 165, 233, 0.15)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: BRAND }}
                      strokeWidth={2}
                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`text-base sm:text-lg font-bold mb-3 ${
                      isHealthcare ? "text-[#07518a]" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* BULLET LIST */}
                  <ul className="space-y-1.5">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: BRAND }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
