"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaLinkedin, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ORG_GROUPS, type OrgPerson } from "@/app/about/our-team/org-groups";

const BRAND = "#07518a";
const AUTO_SCROLL_INTERVAL_MS = 5000;

/* ─── Stat cards data ─── */
const STATS = [
  { value: "250+", label: "Employees" },
  { value: "100+", label: "Years Combined Experience" },
  { value: "15+", label: "Departments" },
];

/* ─── Helpers ─── */
const getPrevIdx = (idx: number, len: number) => (idx - 1 + len) % len;
const getNextIdx = (idx: number, len: number) => (idx + 1) % len;

const isValidLinkedIn = (url?: string) =>
  url &&
  url !== "hwfwhfwhjf" &&
  url !== "https://www.linkedin.com" &&
  url !== "https://www.linkedin.com/";

export default function OurTeamSection() {
  const teamMembers = ORG_GROUPS[0].people;
  // CEO (Chairman & MD) is first in org-groups; start at 0 so CEO shows on load
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const goTo = useCallback(
    (idx: number) => setSelectedIdx((idx + teamMembers.length) % teamMembers.length),
    [teamMembers.length],
  );
  const goNext = useCallback(() => goTo(selectedIdx + 1), [goTo, selectedIdx]);
  const goPrev = useCallback(() => goTo(selectedIdx - 1), [goTo, selectedIdx]);

  /* ─── Scroll thumbnails so selected is centred ─── */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.children[selectedIdx] as HTMLElement | undefined;
    if (!card) return;
    const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
    el.scrollTo({ left: offset, behavior: "smooth" });
  }, [selectedIdx]);

  /* ─── Auto-rotate only when section is in view (keeps CEO first on homepage until user scrolls to it) ─── */
  useEffect(() => {
    if (!autoPlay || !isInView) return;
    const id = setInterval(goNext, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoPlay, goNext, isInView]);

  const current: OrgPerson = teamMembers[selectedIdx];
  const prevIdx = getPrevIdx(selectedIdx, teamMembers.length);
  const nextIdx = getNextIdx(selectedIdx, teamMembers.length);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 lg:py-14 overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ─── OUR TEAM HEADING ─── */}
        <h2
          className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-12 lg:mb-14"
          style={{
            color: "rgba(100, 116, 139, 0.6)",
            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
          }}
        >
          Our Team
        </h2>

        {/* ─── STAT CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 lg:mb-16 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <div className="mt-2 h-0.5 w-8 mx-auto rounded-full bg-[#07518a]" />
              <p className="mt-3 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── CAROUSEL ─── */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous member"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-[#07518a] hover:bg-[#07518a] hover:text-white transition-colors"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            aria-label="Next member"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-[#07518a] hover:bg-[#07518a] hover:text-white transition-colors"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Cards row: prev (grayscale) | center (full color) | next (grayscale) */}
          <div className="flex items-stretch justify-center gap-4 sm:gap-6 px-12 sm:px-16">
            {/* Prev card – grayscale, smaller */}
            <button
              onClick={() => goTo(prevIdx)}
              className="hidden sm:block w-[22%] flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm opacity-70 hover:opacity-90 transition-all grayscale hover:grayscale-0"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={teamMembers[prevIdx].photo}
                  alt={teamMembers[prevIdx].name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamMembers[prevIdx].name)}&background=07518a&color=fff&size=200`;
                  }}
                />
              </div>
            </button>

            {/* Center card – full color, large */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 sm:flex-none sm:w-[56%] max-w-md mx-auto rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 relative group"
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] relative">
                  <img
                    src={current.photo}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=07518a&color=fff&size=400`;
                    }}
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Status dot */}
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                  {/* Name + Designation overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {current.name}
                    </h3>
                    <p className="text-sm text-white/90 mt-0.5">
                      {current.designation}
                    </p>
                    {/* LinkedIn */}
                    {isValidLinkedIn(current.linkedin) && (
                      <a
                        href={current.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="mt-3 inline-flex items-center justify-center w-9 h-9 rounded bg-black/40 hover:bg-[#0077b5] text-white transition-colors"
                      >
                        <FaLinkedin className="text-base" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next card – grayscale, smaller */}
            <button
              onClick={() => goTo(nextIdx)}
              className="hidden sm:block w-[22%] flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm opacity-70 hover:opacity-90 transition-all grayscale hover:grayscale-0"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={teamMembers[nextIdx].photo}
                  alt={teamMembers[nextIdx].name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamMembers[nextIdx].name)}&background=07518a&color=fff&size=200`;
                  }}
                />
              </div>
            </button>
          </div>

          {/* Thumbnail strip (mobile + desktop) */}
          <div
            ref={stripRef}
            className="flex gap-3 overflow-x-auto scroll-smooth px-12 sm:px-16 mt-8 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {teamMembers.map((member, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={member.id}
                  onClick={() => goTo(idx)}
                  className={`flex-shrink-0 flex flex-col items-center w-16 sm:w-20 transition-all duration-300 ${
                    isActive ? "" : "opacity-50 grayscale hover:opacity-75 hover:grayscale-0"
                  }`}
                >
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 transition-all ${
                      isActive ? "ring-[#07518a] ring-offset-2" : "ring-transparent"
                    }`}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=07518a&color=fff&size=128`;
                      }}
                    />
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] sm:text-xs text-center font-medium line-clamp-1 max-w-[64px] sm:max-w-[80px] ${
                      isActive ? "text-[#07518a]" : "text-gray-500"
                    }`}
                  >
                    {member.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
