"use client";

import React from "react";
import HeroCarousel from "@/components/HeroCarousel";
import { ScrollingFeatureShowcase } from "@/components/Intractive";

/* ═══════════════════════════════════════════════════════════════════════════
   HOME3 — Same hero as main home + scrolling feature showcase section
═══════════════════════════════════════════════════════════════════════════ */
export default function Home3() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <HeroCarousel />
      <ScrollingFeatureShowcase />
    </div>
  );
}
