"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Network,
  Cctv,
  RadioTower,
  Lightbulb,
  Home,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ================= CONFIG ================= */
const banner_image = "/355737.jpg";
const BRAND = "#07518a";

/* ================= COMPONENT ================= */
export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const techItems = useMemo(
    () => [
      { icon: Brain, label: "AI Intelligence" },
      { icon: Network, label: "IoT Networks" },
      { icon: Cctv, label: "E-Security" },
      { icon: RadioTower, label: "Smart Infrastructure" },
      { icon: Lightbulb, label: "Innovation" },
      { icon: Home, label: "Smart Living" },
    ],
    []
  );

  /* ================= GSAP — one-time only (no scrub) for smooth scroll ================= */
  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (c) => {
          const { isDesktop, isMobile, reduceMotion } = c.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };
          if (reduceMotion) return;

          /* Stats reveal — one-time when in view (no scrub) */
          gsap.from(".stat-item", {
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              once: true,
            },
          });

          /* Counter animation — one-time */
          document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
            const value = Number(el.dataset.value);
            gsap.fromTo(
              el,
              { innerText: 0 },
              {
                innerText: value,
                duration: 1.4,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 85%",
                  once: true,
                },
                onUpdate() {
                  el.innerText = Number(el.innerText).toLocaleString();
                },
              }
            );
          });
        }
      );
    }, heroRef);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* ================= RENDER ================= */
  return (
    <div ref={heroRef} className="relative bg-white">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[88vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/90 via-[#07518a]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div className="text-white">
              <div className="text-xs tracking-[0.3em] uppercase mb-4 text-blue-100">
                Since 2006
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                The Guru of <br />
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Tomorrow’s Tech
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">
                Brihaspathi Technologies Limited delivers AI-driven software,
                advanced E-Security systems, and sustainable IoT solutions.
              </p>

           <p className="mt-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">Established in 2006, Brihaspathi Technologies Limited is a premier global technology conglomerate specializing in E-Security, AI-driven Software, IoT, and Renewable Energy. With a legacy of over 20 years, we have evolved from a web development startup into a multi-domain powerhouse that serves over 12,000 clients globally. Our operations are backed by a workforce of 300+ technology experts and a footprint spanning India, the USA, and Dubai.</p>
            </div>

            {/* RIGHT (hidden mobile) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {techItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="tech-card p-4 rounded-xl bg-gradient-to-br from-white to-[#f4f9ff] border shadow-md"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND}, #0a6fbf)`,
                        }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        ref={statsRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:-mt-10 lg:-mt-16"
      >
        <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {[
            { value: 2000000, label: "Cameras Installed" },
            { value: 12000, label: "Satisfied Clients" },
            { value: 300, label: "Tech Experts" },
            { value: 20, label: "Years of Innovation" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-item p-4 sm:p-6 md:p-8 text-center border-b md:border-b-0 md:border-r last:border-r-0 border-slate-100"
            >
              <div
                className="stat-number text-3xl md:text-4xl font-extrabold"
                data-value={stat.value}
                style={{ color: BRAND }}
              >
                0
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
