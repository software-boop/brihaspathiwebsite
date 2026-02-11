"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, Globe, Award, Clock, ArrowRight, ChevronDown, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BRAND = "#07518a";
const HERO_VIDEO_URL =
  "https://ik.imagekit.io/tsuss6ulm/corpo%20video%202%20-.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1581092334651-ddf26d9b9f09?auto=format&fit=crop&w=1920&q=80";

/* ─── Animation variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};

/* ─── Data (same content, same numbers) ─── */
const STATS = [
  { value: "300+", label: "Workforce", icon: Users, end: 300 },
  { value: "12K+", label: "Global Clients", icon: Globe, end: 12 },
  { value: "99%", label: "Success Rate", icon: Award, end: 99 },
  { value: "20+", label: "Years Experience", icon: Clock, end: 20 },
];

const HIGHLIGHTS = [
  "Advanced E-Security Solutions",
  "AI-Powered Video Analytics",
  "Government Surveillance Projects",
  "Renewable Energy Systems",
  "Smart Infrastructure Development",
  "Enterprise System Integration",
];

/* ─── Animated counter hook ─── */
function AnimatedCounter({ end, suffix, duration = 2 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Floating particles decoration ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#07518a]/10 backdrop-blur-sm"
          style={{
            width: 60 + i * 30,
            height: 60 + i * 30,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0],
            x: [0, 10 + i * 3, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HeroCarousel — redesigned, same content + video
═══════════════════════════════════════════════════════════════════════════ */
export default function HeroCarousel() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-50">
      {/* ─── Background video ─── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Multi-layer overlay for depth — light theme, more video visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30" />
      </div>

      <FloatingParticles />

      {/* ─── Main content grid ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ════ Left column — headline + CTA ════ */}
          <div className="lg:col-span-7">
            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight font-sans"
            >
              <span className="text-slate-900">AI Surveillance,</span>
              <br />
              <span className="bg-gradient-to-r from-[#07518a] via-[#0a6ab8] to-[#07518a] bg-clip-text text-transparent">
                Smart Energy
              </span>
              <span className="text-slate-900"> &amp;</span>
              <br />
              <span className="text-slate-900">Enterprise Systems</span>
            </motion.h1>

            {/* Sub-line with vertical accent bar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 flex items-start gap-4"
            >
              <span className="flex-shrink-0 w-1 h-16 rounded-full bg-gradient-to-b from-[#07518a] to-[#07518a]/20 mt-1" />
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Trusted by governments and enterprises across India — delivering
                e-security, AI, IoT, renewable energy, and smart infrastructure at scale.
              </p>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/our-services"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold text-white rounded-2xl shadow-lg shadow-[#07518a]/25 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#07518a]/30 hover:-translate-y-0.5"
                style={{ backgroundColor: BRAND, color: "#ffffff" }}
              >
                <span className="relative z-10 text-white">Explore our services</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#07518a] to-[#0a6ab8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-bold text-slate-700 rounded-2xl border-2 border-slate-300/80 bg-white/60 backdrop-blur-sm hover:border-[#07518a]/40 hover:bg-white/90 hover:text-[#07518a] transition-all duration-300"
              >
                Get in touch
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </motion.div>

            {/* Highlights row — two lines of pills */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerFast}
              className="mt-9 flex flex-wrap gap-2.5"
            >
              {HIGHLIGHTS.map((h, idx) => (
                <motion.span
                  key={idx}
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-[#07518a]/30 hover:bg-white/90 transition-all duration-300 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#07518a] to-[#0a6ab8]" />
                  {h}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ════ Right column — Stats cards ════ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((item, idx) => {
                const Icon = item.icon;
                const suffix =
                  item.value.includes("K") ? "K+" :
                  item.value.includes("%") ? "%" : "+";
                return (
                  <motion.div
                    key={item.label}
                    variants={scaleIn}
                    transition={{ duration: 0.5 }}
                    className="group relative p-5 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Decorative corner gradient */}
                    <div
                      className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
                    />

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm"
                      style={{ backgroundColor: `${BRAND}10`, color: BRAND }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Number */}
                    <div
                      className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                      style={{ color: BRAND }}
                    >
                      <AnimatedCounter end={item.end} suffix={suffix} />
                    </div>

                    {/* Label */}
                    <div className="mt-1 text-sm text-slate-500 font-medium">
                      {item.label}
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#07518a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>

            {/* Trust badge below stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-5 flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-slate-600">
                      {["IN", "TS", "AP", "KA"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                <span className="font-semibold text-slate-700">PAN India</span>
                <br />Presence across all states
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-slate-400/50 flex items-start justify-center pt-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#07518a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
