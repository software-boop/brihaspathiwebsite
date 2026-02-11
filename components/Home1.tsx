"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Cpu,
  Sun,
  Building,
  Users,
  Globe,
  Award,
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  Zap,
  MapPin,
} from "lucide-react";

import { servicesData } from "@/app/our-services/servicesdata";
import ClientsMarqueeHero from "@/components/ClientsMarqueeHero";
import CertificationsGrid5 from "@/components/Certifications";
import AboutUsSection from "@/app/about/AboutUsSection";
import OurTeamSection from "@/components/homeabout/OurTeamSection";

/* ─── Images ─── */
import Nationwide from "@/components/Testimonialimages/nationawide.png";
import Expertise from "@/components/Testimonialimages/expertise (1).png";
import Trusted from "@/components/Testimonialimages/end---end (1).png";
import Innovation from "@/components/Testimonialimages/innovation-1 (1).png";
import india from "@/components/heroimages/91527425_India.jpg";

import img4 from "@/components/homeabout/weserver/4.jpg";
import img7192 from "@/components/homeabout/weserver/7192.jpg";
import img11709 from "@/components/homeabout/weserver/11709.jpg";
import img20979 from "@/components/homeabout/weserver/20979.jpg";
import img317011 from "@/components/homeabout/weserver/317011.jpg";
import img9561348 from "@/components/homeabout/weserver/9561348.jpg";

import capSurveillance from "@/components/homeabout/capabilities/Advanced Surveillance & Security Solutions.jpg";
import capAI from "@/components/homeabout/capabilities/AI Video Analytics & Intelligent Monitoring.jpg";
import capBiometric from "@/components/homeabout/capabilities/Biometric & Identity Management Systems.jpg";
import capSoftware from "@/components/homeabout/capabilities/Software Products & Digital Platforms.jpg";
import capMobility from "@/components/homeabout/capabilities/Smart Mobility & Transport Solutions.jpg";
import capRenewable from "@/components/homeabout/capabilities/Renewable Energy & Smart Urban Infrastructure.jpg";

/* ─── Constants ─── */
const BRAND = "#07518a";
const BRAND_LIGHT = "#e4f3ff";

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
      style={{ color: BRAND }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-sans ${className}`}>
      {children}
    </h2>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO — split screen, big typography, animated stats bar
═══════════════════════════════════════════════════════════════════════════ */
const STATS = [
  { value: "20+", label: "Years", icon: Clock },
  { value: "2M+", label: "Cameras", icon: Shield },
  { value: "12K+", label: "Clients", icon: Users },
  { value: "300+", label: "Workforce", icon: Globe },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* BG image — static (no scroll-linked parallax for smooth scroll) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80"
          alt="Technology"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-[1]" />

      {/* Header overlay — content in a panel that covers the background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 backdrop-blur-md border border-white/10 bg-black/40 shadow-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-14 bg-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Since 2006
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.08] tracking-tight font-sans">
              Building a{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Secure
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Sustainable
              </span>{" "}
              Future
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed">
              AI surveillance, renewable energy, smart infrastructure, and enterprise
              technology solutions trusted by governments and institutions across India.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/our-services"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{ backgroundColor: BRAND, color: "#ffffff" }}
              >
                <span className="text-white">Explore services</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all"
              >
                Get in touch
              </Link>
            </motion.div>

            {/* Stats inside header panel */}
            <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. CAPABILITIES — horizontal scroll cards with number + image
═══════════════════════════════════════════════════════════════════════════ */
const CAPABILITIES = [
  { title: "Advanced Surveillance & Security", desc: "AI-enabled CCTV, thermal cameras, command & control centers, election monitoring and border security.", image: capSurveillance, color: "#5196fd" },
  { title: "AI Video Analytics", desc: "Face recognition, ANPR, intrusion detection, crowd analytics and vehicle tracking integrated with VMS.", image: capAI, color: "#8f89ff" },
  { title: "Biometric & Identity Systems", desc: "Aadhaar-integrated contactless attendance, access control and identity verification.", image: capBiometric, color: "#13006c" },
  { title: "Software & Digital Platforms", desc: "Enterprise dashboards, automation systems, CMS portals built with Next.js, React and FastAPI.", image: capSoftware, color: "#fd521a" },
  { title: "Smart Mobility & Transport", desc: "AI cameras, GPS, MDVR, passenger information and analytics for fleet management.", image: capMobility, color: "#ed649e" },
  { title: "Renewable Energy & Smart Infra", desc: "Solar rooftop EPC, Solar Smart Poles blending energy with surveillance and connectivity.", image: capRenewable, color: "#0a6ab8" },
];

function CapabilitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionTag>Core capabilities</SectionTag>
        <SectionHeading>What We Do Best</SectionHeading>
      </div>

      {/* Horizontal scroll */}
      <div className="relative">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex-shrink-0 w-[max(0rem,calc((100vw-80rem)/2+1rem))] hidden xl:block" aria-hidden />
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-shrink-0 w-[320px] sm:w-[360px] group"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <Image src={cap.image} alt={cap.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 text-6xl font-black text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#07518a] transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. SERVICES — Bento grid layout
═══════════════════════════════════════════════════════════════════════════ */
function ServicesSection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const visibleServices = servicesData.slice(0, 6);

  return (
    <section className="py-10 lg:py-14 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SectionTag>What we offer</SectionTag>
          <SectionHeading className="mx-auto">Our Technology Services</SectionHeading>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            End-to-end solutions from surveillance and AI analytics to renewable energy
            and enterprise systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleServices.map((service, i) => (
            <motion.button
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              onClick={() => router.push(`/our-services/${service.slug}`)}
              className={`group relative text-left overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                i === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "h-52 md:h-64" : "h-44"}`}>
                {service.mainimage && (
                  <>
                    <Image src={service.mainimage} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white drop-shadow-md">{service.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{service.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: BRAND }}>
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/our-services")}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white hover:scale-[1.02] transition-all"
            style={{ backgroundColor: BRAND, color: "#ffffff" }}
          >
            <span className="text-white">View all services</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. ACHIEVEMENTS — counters on dark band
═══════════════════════════════════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  { value: "20+", label: "Years of excellence since 2006" },
  { value: "2M+", label: "Cameras installed nationwide" },
  { value: "2L+", label: "Cameras for General Elections" },
  { value: "12K+", label: "Clients across India" },
  { value: "65K+", label: "Cameras for NEET exams" },
  { value: "674", label: "Cameras securing borders" },
];

function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-slate-950 py-10 lg:py-14 overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SectionTag>Our Impact</SectionTag>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight font-sans">
            Numbers That Speak
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 lg:p-8 text-center hover:border-blue-400/30 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{a.value}</div>
              <div className="text-sm text-slate-400 leading-relaxed">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. WHY US — alternating image/text rows
═══════════════════════════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  { title: "Nationwide Presence", desc: "Pan-India execution capability across urban, semi-urban and rural deployments with dedicated regional teams.", points: ["Pan-India execution", "Uniform quality & governance", "Regional operations teams"], image: Nationwide },
  { title: "End-to-End Expertise", desc: "From advisory and design to deployment, integration, and long-term operations — we manage the entire lifecycle.", points: ["Consulting & architecture", "System integration & rollout", "Lifecycle management"], image: Expertise },
  { title: "Trusted by PSUs", desc: "Recognized as a dependable partner for large-scale, mission-critical government and public sector initiatives.", points: ["Strict compliance", "Transparent execution", "Institutional partnerships"], image: Trusted },
  { title: "Innovation First", desc: "We continuously invest in advanced technologies to future-proof solutions and support evolving business needs.", points: ["AI & analytics platforms", "Modular architectures", "Security-first design"], image: Innovation },
];

function WhyUsSection() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SectionTag>Why Brihaspathi</SectionTag>
          <SectionHeading>The Brihaspathi Advantage</SectionHeading>
        </div>

        <div className="space-y-10 lg:space-y-14">
          {WHY_ITEMS.map((item, i) => {
            const reversed = i % 2 !== 0;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className={`flex flex-col items-center gap-6 lg:gap-10 ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                <motion.div variants={fadeUp} className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex-1 w-full">
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 font-sans">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                        <span className="text-sm">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. INDUSTRIES — compact cards with icon-style overlay
═══════════════════════════════════════════════════════════════════════════ */
const INDUSTRIES = [
  { title: "Manufacturing", image: img4, desc: "AI-driven automation for productivity and predictive maintenance." },
  { title: "Smart City", image: img20979, desc: "Integrated systems for traffic, safety and urban efficiency." },
  { title: "Defence & Security", image: img7192, desc: "Real-time surveillance analytics for mission readiness." },
  { title: "Banking & BFSI", image: img317011, desc: "AI monitoring protecting ATMs, branches and transactions." },
  { title: "Healthcare", image: img11709, desc: "Patient monitoring, anomaly detection and infection control." },
  { title: "Government", image: img9561348, desc: "Scalable intelligence for public safety and digital governance." },
];

function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-10 lg:py-14 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SectionTag>Industries</SectionTag>
          <SectionHeading>
            Industries We <span style={{ color: BRAND }}>Serve</span>
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer"
            >
              <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. INDIA WIDE — map + text, kept compact
═══════════════════════════════════════════════════════════════════════════ */
function IndiaWideSection() {
  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <SectionTag>Our Reach</SectionTag>
            <SectionHeading>
              India-Wide <span style={{ color: BRAND }}>Presence</span>
            </SectionHeading>
            <p className="mt-4 text-slate-500 leading-relaxed max-w-lg">
              Delivering technology, security, and digital solutions across multiple states with
              a strong nationwide footprint. Operations span across Telangana, Andhra Pradesh,
              Maharashtra, Rajasthan, West Bengal, Karnataka, and more.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Telangana", "Maharashtra", "Rajasthan", "West Bengal", "Karnataka", "Andhra Pradesh"].map((state) => (
                <div key={state} className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: BRAND }} />
                  {state}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-6">
              {[
                { val: "India", sub: "Headquarters" },
                { val: "Dubai", sub: "International" },
                { val: "USA", sub: "Partnerships" },
              ].map((loc) => (
                <div key={loc.val}>
                  <div className="text-lg font-bold text-slate-900">{loc.val}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{loc.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md lg:max-w-lg"
          >
            <Image src={india} alt="India map" className="w-full h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. VIDEO + PRESTIGIOUS — CTA banner with video play concept
═══════════════════════════════════════════════════════════════════════════ */
function VideoCTASection() {
  return (
    <section className="relative py-14 lg:py-20 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionTag>Trusted Since 2006</SectionTag>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight font-sans">
            Our Prestigious Clients
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From securing national elections and international borders to powering smart cities,
            transport corporations, and critical infrastructure — our solutions operate where
            reliability is non-negotiable.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 inline-flex items-center gap-4">
            <Link
              href="/casestudy"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:scale-[1.03]"
              style={{ backgroundColor: BRAND, color: "#ffffff" }}
            >
              <span className="text-white">View case studies</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/our-projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Our projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. CLIENTS MARQUEE + CERTIFICATIONS  — reuse existing
═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function Home1() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <AboutUsSection />
      <CapabilitiesSection />
      <ServicesSection />
      <AchievementsSection />
      <WhyUsSection />
      <IndustriesSection />
      <IndiaWideSection />
      <OurTeamSection />
      <VideoCTASection />
      <ClientsMarqueeHero />
      <section className="bg-slate-50 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CertificationsGrid5 />
        </div>
      </section>
    </div>
  );
}
