"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bus,
  Bell,
  Box,
  QrCode,
  Shield,
  Cpu,
  Radio,
  Sun,
  Zap,
  Fingerprint,
  Scan,
  Smartphone,
  Lock,
} from "lucide-react";

const BRAND = "#07518a";

const SLIDES = [
  {
    headline: "Smart Features for Buses",
    description:
      "Technology-integrated bus systems with AI CCTV, GPS, analytics, and driver monitoring for public transit across India.",
    slug: "smart-bus-solutions",
    cardTitle: "Smart Features for Buses",
    image: "/Service_images/Whisk_ce854c95264034882294dfbfc253026cdr (1).jpeg",
    features: [
      { icon: Bus, title: "Automatic Passenger Counting (APC)", description: "Utilizes advanced sensors to count passengers automatically, enhancing data accuracy for operational efficiency." },
      { icon: Bell, title: "Panic Buttons", description: "Installed for both passengers and drivers to provide instant alerts to control centers in emergencies." },
      { icon: Box, title: "Door Sensors", description: "Equipped with sensors to gather real-time boarding and deboarding statistics, improving route management." },
      { icon: QrCode, title: "Smart Ticketing Integration", description: "Utilizes QR codes and NFC technology for seamless ticket validation, streamlining the boarding process." },
    ],
  },
  {
    headline: "AI Surveillance & Video Analytics",
    description:
      "AI-powered video management and analytics for surveillance, transport, and safety — integrated with VMS and command centers.",
    slug: "ai-video-analytics-platform-integration",
    cardTitle: "AI Surveillance Capabilities",
    image: "/Service_images/Whisk_02b3b2939fa1f239644437eb7c2baae5dr.jpeg",
    features: [
      { icon: Shield, title: "Intelligent Monitoring", description: "24/7 AI-based monitoring with face recognition, ANPR, and intrusion detection for comprehensive security." },
      { icon: Cpu, title: "Video Analytics Platform", description: "Integrated with VMS, ICCCs, and legacy systems for real-time insights and incident response." },
      { icon: Radio, title: "Command & Control", description: "Centralized command centers with video walls and operator consoles for real-time oversight." },
      { icon: Zap, title: "Edge & Cloud Analytics", description: "Edge processing and cloud integration for scalable, low-latency analytics across sites." },
    ],
  },
  {
    headline: "Renewable Energy Solutions",
    description:
      "Solar rooftop systems, smart poles, and integrated renewable solutions for residential and commercial applications.",
    slug: "renewable-energy-solutions",
    cardTitle: "Solar & Energy Solutions",
    image: "/Service_images/Whisk_0ec60332bbdcdd09c3e46cc3f284ea16dr (1).jpeg",
    features: [
      { icon: Sun, title: "Solar Rooftop EPC", description: "End-to-end design, procurement, and commissioning of rooftop and ground-mount solar installations." },
      { icon: Zap, title: "Smart Poles", description: "Solar-powered smart poles blending renewable energy with surveillance and connectivity." },
      { icon: Box, title: "Battery & Storage", description: "Battery storage and smart grid integration for reliable, round-the-clock power." },
      { icon: Cpu, title: "Monitoring & ROI", description: "Real-time monitoring dashboards and ROI tracking for commercial and government deployments." },
    ],
  },
  {
    headline: "AI Biometric & Identity",
    description:
      "Next-gen AI biometrics integrated with Aadhaar for contactless, fraud-proof identity verification and access control.",
    slug: "ai-biometric-aadhaar-authentication",
    cardTitle: "Biometric & Identity Solutions",
    image: "/Service_images/Whisk_7201afdec8bd7b4a6aa4c45f3d5a4c01dr (1).jpeg",
    features: [
      { icon: Fingerprint, title: "Aadhaar Authentication", description: "Secure, contactless identity verification integrated with Aadhaar for government and enterprise." },
      { icon: Scan, title: "Facial Recognition", description: "AI-powered face recognition for attendance, access control, and fraud prevention." },
      { icon: Smartphone, title: "Multi-Modal Biometrics", description: "Fingerprint, face, and card-based access combined for maximum security and flexibility." },
      { icon: Lock, title: "Access Control & Audit", description: "Centralized access control with full audit trails and compliance reporting." },
    ],
  },
];

const NUM_SLIDES = SLIDES.length;
type SlideData = (typeof SLIDES)[number];

const slideTransition = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] };

function LeftContent({ slide }: { slide: SlideData }) {
  return (
    <motion.div
      key={slide.slug}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={slideTransition}
      className="w-full"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[#07518a1f] bg-[#07518a10] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#07518a]">
        Smart Solutions
      </span>
      <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {slide.headline}
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {slide.description}
      </p>
      <div className="mt-9">
        <Link
          href={`/our-services/${slide.slug}`}
          className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#07518a33] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
          style={{ backgroundColor: BRAND, color: "#ffffff" }}
        >
          <span className="text-white">GET STARTED</span>
          <ArrowRight className="h-5 w-5 text-white" />
        </Link>
      </div>
    </motion.div>
  );
}

function RightCard({ slide }: { slide: SlideData }) {
  return (
    <motion.div
      key={slide.slug}
      initial={{ opacity: 0, y: -56 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 48 }}
      transition={slideTransition}
      className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10"
    >
      <div className="flex min-h-[430px] flex-col lg:flex-row">
        <div className="flex-1 p-6 sm:p-8">
          <h3 className="mb-6 text-xl font-bold text-slate-900 sm:text-2xl">
            {slide.cardTitle}
          </h3>
          <ul className="space-y-5">
            {slide.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="flex gap-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND}12`, color: BRAND }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 sm:text-base">
                      {feature.title}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-400">
              Brihaspathi — The Guru of Tomorrow&apos;s Technology
            </p>
          </div>
        </div>
        <motion.div
          className="relative min-h-[220px] w-full lg:min-h-0 lg:w-[42%]"
          initial={{ opacity: 0, y: -36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...slideTransition, delay: 0.08 }}
        >
          <Image
            src={slide.image}
            alt={slide.cardTitle}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Normal document flow: no inner scroll, no wheel capture. Page scroll stays smooth. ─── */
export default function SolutionsHorizontalSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => Math.min(NUM_SLIDES - 1, i + 1));
  }, []);

  const progressPercent = (activeIndex + 0.5) / NUM_SLIDES;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#f4f8fc] py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(7,81,138,0.08),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(7,81,138,0.06),transparent_40%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.03fr_1fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="relative min-h-[280px] lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <LeftContent slide={SLIDES[activeIndex]} />
          </AnimatePresence>
        </div>
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <RightCard slide={SLIDES[activeIndex]} />
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-slate-200/60">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progressPercent * 100}%`,
            backgroundColor: BRAND,
          }}
        />
      </div>

      <button
        type="button"
        onClick={goToPrev}
        disabled={activeIndex === 0}
        className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-30 sm:left-6"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        disabled={activeIndex === NUM_SLIDES - 1}
        className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-30 sm:right-6"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-sm font-medium tabular-nums text-slate-500">
          {activeIndex + 1} / {NUM_SLIDES}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: NUM_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 opacity-100" : "w-2 opacity-40 hover:opacity-70"
              }`}
              style={{ backgroundColor: i === activeIndex ? BRAND : "#94a3b8" }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
