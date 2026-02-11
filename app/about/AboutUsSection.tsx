"use client";

import {
  Building2,
  Eye,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/* ─── BRAND ─── */
const BRAND = "#07518a";

/* ─── Three key points (matches reference design) ─── */
const KEY_POINTS = [
  {
    title: "Innovation-Driven Approach",
    desc: "Continuously pushing boundaries with R&D and cutting-edge technology integration.",
  },
  {
    title: "End-to-End Solutions",
    desc: "From consultation to implementation and maintenance, we provide comprehensive support.",
  },
  {
    title: "Make in India Initiative",
    desc: "Proud contributor to India's manufacturing strength with in-house production capabilities.",
  },
];

/* ════════════════════════════════════════════════════
   COMPONENT — About Brihaspathi (two columns, light blue bg)
   No scroll-tied animations for smoother scrolling.
   ════════════════════════════════════════════════════ */
export default function AboutUsSection() {
  return (
    <section
      className="w-full py-10 lg:py-14"
      style={{ backgroundColor: "#f0f9ff" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 items-start">
          {/* ── LEFT: About Brihaspathi + 3 points + CTA ── */}
          <div>
            {/* Pill badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ backgroundColor: `${BRAND}18` }}
            >
              <Building2 size={14} color={BRAND} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: BRAND }}
              >
                About Brihaspathi
              </span>
            </div>

            {/* Heading — dark gray, two-line style */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-800 font-sans">
              Pioneering Technology
              <br />
              Excellence Since 2006
            </h2>

            {/* Intro paragraph */}
            <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Founded in 2006, Brihaspathi Technologies Limited has evolved from
              a web development company into a comprehensive technology
              solutions provider. We specialize in cutting-edge innovations
              across IoT, software development, renewable energy, and security
              systems.
            </p>

            {/* Three bullet points with checkmark in circle */}
            <ul className="mt-8 space-y-4">
              {KEY_POINTS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${BRAND}20` }}
                  >
                    <CheckCircle2 size={18} color={BRAND} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:brightness-110"
              style={{ backgroundColor: BRAND, color: "#ffffff" }}
            >
              <span className="text-white">Learn More About Us</span>
              <ArrowRight size={16} className="text-white shrink-0" />
            </Link>
          </div>

          {/* ── RIGHT: Mission card, Vision card (no image) ── */}
          <div className="flex flex-col gap-5">
            {/* Mission Card — white, rounded */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `${BRAND}12`,
                    border: `1px solid ${BRAND}30`,
                  }}
                >
                  <Target size={20} color={BRAND} />
                </div>
                <h3
                  className="text-lg font-bold text-gray-800"
                  style={{ color: BRAND }}
                >
                  Our Mission
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To design and deliver state-of-the-art technology solutions that
                address today&apos;s challenges, strengthen operational efficiency,
                and contribute to a secure and sustainable future through
                advanced innovation.
              </p>
            </div>

            {/* Vision Card — white, rounded */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `${BRAND}12`,
                    border: `1px solid ${BRAND}30`,
                  }}
                >
                  <Eye size={20} color={BRAND} />
                </div>
                <h3
                  className="text-lg font-bold text-gray-800"
                  style={{ color: BRAND }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To lead the technology industry by providing innovative,
                integrated solutions at competitive prices while upholding the
                highest standards of integrity and fostering long-term
                partnerships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
