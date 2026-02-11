"use client";

import Whybrihaspathi from "@/components/WhyChooseBrihaspathi";
import ClientsMarqueeHero from "@/components/ClientsMarqueeHero";
import CertificationsGrid5 from "@/components/Certifications";
import { HoverSliderDemo } from "@/components/HoverSliderDemo";
import DemoOnep from "@/components/homeabout/Demo";
import { ScrollingFeatureShowcase } from "@/components/Intractive";
import IndustriesSection from "@/components/homeabout/IndustriesSection";
import OurTeamSection from "@/components/homeabout/OurTeamSection";
import Indiawide from "@/components/homeabout/Indiawide";
import { Achievements, Process, Work } from "@/components/homeabout/Achiementsdemo";
import { Ourcapabilities } from "@/components/homeabout/our-capabilities";
import Clientvideo from "@/components/homeabout/Clientvideo";
import HeroCarousel from "./HeroCarousel";
import HomeServicesSection from "./HomeServicesSection";
import AboutUsSection from "@/app/about/AboutUsSection";

/* =============================================================================
   Home page – revamped layout with consistent alignment and modern sections.
   All content (except full-bleed hero) uses max-w-7xl and consistent padding.
============================================================================= */

const SectionWrapper = ({
  children,
  className = "",
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}) => (
  <section
    className={
      noPadding
        ? className
        : `w-full py-10 lg:py-14 ${className}`
    }
  >
    {noPadding ? (
      children
    ) : (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    )}
  </section>
);

type HomeProps = { showFeatureShowcase?: boolean; showHoverSlider?: boolean };

export default function Home({ showFeatureShowcase = true, showHoverSlider = true }: HomeProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── Hero (full-bleed) ─── */}
      <HeroCarousel />

      {/* ─── About Brihaspathi section ─── */}
      <AboutUsSection />

      {/* ─── Interactive feature showcase (optional; hidden on home-classic) ─── */}
      {showFeatureShowcase && <ScrollingFeatureShowcase />}

      {/* ─── Our capabilities ─── */}
      <SectionWrapper noPadding>
        <Ourcapabilities />
      </SectionWrapper>

      {/* ─── Our Services (new, aligned) ─── */}
      <HomeServicesSection />

      {/* ─── Why Choose Us (has own padding & max-width) ─── */}
      <SectionWrapper noPadding>
        <Whybrihaspathi />
      </SectionWrapper>

      {/* ─── Parallax / showcase ─── */}
      <SectionWrapper noPadding>
        <DemoOnep />
      </SectionWrapper>

      {/* ─── Achievements ─── */}
      <SectionWrapper noPadding>
        <Achievements />
      </SectionWrapper>

      {/* ─── Hover slider (hidden on home-classic) ─── */}
      {showHoverSlider && (
        <SectionWrapper noPadding>
          <HoverSliderDemo />
        </SectionWrapper>
      )}

      {/* ─── Industries ─── */}
      <SectionWrapper noPadding>
        <IndustriesSection />
      </SectionWrapper>

      {/* ─── India wide ─── */}
      <SectionWrapper noPadding>
        <Indiawide />
      </SectionWrapper>

      {/* ─── Our Team ─── */}
      <SectionWrapper noPadding>
        <OurTeamSection />
      </SectionWrapper>

      {/* ─── Client video ─── */}
      <SectionWrapper noPadding>
        <Clientvideo />
      </SectionWrapper>

      {/* ─── Clients marquee ─── */}
      <SectionWrapper noPadding>
        <ClientsMarqueeHero />
      </SectionWrapper>

      {/* ─── Certifications (full-bleed marquee) ─── */}
      <SectionWrapper noPadding className="bg-slate-50/80 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CertificationsGrid5 />
        </div>
      </SectionWrapper>
    </div>
  );
}
