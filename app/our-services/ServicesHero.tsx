"use client";

import React from "react";

const BRAND = "#07518a";
const banner_image = "/355737.jpg";

export default function ServicesHero() {
  return (
    <section
      className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner_image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/90 via-[#07518a]/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.3em] uppercase mb-4 text-blue-100">
            Our Services
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Technology Services
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              That Scale With You
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">
            Secure, scalable, and future-ready solutions engineered to empower
            enterprises, governments, and institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
