"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ORG_GROUPS, type OrgPerson } from "./org-groups";

/* ───────────────────────────────── helpers ─────────────────────────────── */

/** Truncate text to ~N chars on a word boundary */
const truncate = (text: string, max = 180) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max)) + "…";

/* ───────────────────────────── component ───────────────────────────── */

const TeamCarousel = () => {
  const teamMembers = ORG_GROUPS[0].people;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);

  /* ── navigation ── */
  const goTo = useCallback(
    (idx: number) => setSelectedIdx((idx + teamMembers.length) % teamMembers.length),
    [teamMembers.length],
  );
  const goNext = useCallback(() => goTo(selectedIdx + 1), [goTo, selectedIdx]);
  const goPrev = useCallback(() => goTo(selectedIdx - 1), [goTo, selectedIdx]);

  /* ── scroll the thumbnail strip so selected item is centred ── */
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.children[selectedIdx] as HTMLElement | undefined;
    if (!card) return;
    const offset = card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2;
    el.scrollTo({ left: offset, behavior: "smooth" });
  }, [selectedIdx]);

  /* ── auto-rotate ── */
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [autoPlay, goNext]);

  /* ── keyboard ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const current: OrgPerson = teamMembers[selectedIdx];

  /* ────────────────────────── render ────────────────────────── */
  return (
    <section
      className="w-full bg-gradient-to-b from-white via-slate-50 to-white py-10 lg:py-14 overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ─── HEADER ─── */}
        <div className="text-center mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#07518a]">
            Meet the Leaders
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight font-sans">
            Our&nbsp;<span className="text-[#07518a]">Team</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            The experienced professionals driving innovation and growth at
            Brihaspathi Technologies.
          </p>
        </div>

        {/* ─── FEATURED MEMBER CARD ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative mx-auto max-w-5xl rounded-3xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Photo */}
              <div className="relative md:w-[38%] aspect-[3/4] md:aspect-auto bg-slate-100 overflow-hidden">
                <img
                  src={current.photo}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=07518a&color=fff&size=400`;
                  }}
                />
                {/* Gradient fade on bottom (mobile) & right (desktop) */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <motion.h3
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                >
                  {current.name}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                  className="mt-1 text-sm sm:text-base font-medium text-[#07518a]"
                >
                  {current.designation}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5 h-px w-12 bg-[#07518a]/30"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed"
                >
                  {current.bio}
                </motion.p>

                {/* LinkedIn */}
                {current.linkedin &&
                  current.linkedin !== "hwfwhfwhjf" &&
                  current.linkedin !== "https://www.linkedin.com" &&
                  current.linkedin !== "https://www.linkedin.com/" && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      href={current.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-[#07518a] hover:text-[#063a68] font-medium text-sm transition-colors w-fit"
                    >
                      <FaLinkedin className="text-lg" />
                      View LinkedIn Profile
                    </motion.a>
                  )}

                {/* Counter */}
                <p className="mt-6 text-xs text-gray-400 font-medium tracking-wide">
                  {String(selectedIdx + 1).padStart(2, "0")}{" "}
                  <span className="text-gray-300">/</span>{" "}
                  {String(teamMembers.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── NAVIGATION ARROWS + THUMBNAIL STRIP ─── */}
        <div className="relative mt-10 mx-auto max-w-5xl">
          {/* Left arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous member"
            className="absolute -left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg ring-1 ring-gray-200 flex items-center justify-center text-[#07518a] hover:bg-[#07518a] hover:text-white transition-colors"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            aria-label="Next member"
            className="absolute -right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg ring-1 ring-gray-200 flex items-center justify-center text-[#07518a] hover:bg-[#07518a] hover:text-white transition-colors"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Thumbnail strip */}
          <div
            ref={stripRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth px-6 sm:px-14 pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Hide the native scrollbar for webkit */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {teamMembers.map((member, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={member.id}
                  onClick={() => goTo(idx)}
                  className={`
                    group flex-shrink-0 flex flex-col items-center w-20 sm:w-24
                    transition-all duration-300
                    ${isActive ? "" : "opacity-50 grayscale hover:opacity-80 hover:grayscale-0"}
                  `}
                >
                  {/* Avatar */}
                  <div
                    className={`
                      relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden
                      ring-[3px] transition-all duration-300
                      ${
                        isActive
                          ? "ring-[#07518a] shadow-lg scale-110"
                          : "ring-transparent group-hover:ring-gray-300"
                      }
                    `}
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

                  {/* Name */}
                  <span
                    className={`
                      mt-2 text-[10px] sm:text-xs text-center font-medium leading-tight line-clamp-1
                      transition-colors duration-300
                      ${isActive ? "text-[#07518a]" : "text-gray-600"}
                    `}
                  >
                    {member.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── PROGRESS BAR ─── */}
        <div className="mt-6 mx-auto max-w-5xl">
          <div className="h-[2px] bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#07518a] rounded-full"
              initial={false}
              animate={{ width: `${((selectedIdx + 1) / teamMembers.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;
