"use client";

import { useRouter } from "next/navigation";
import { servicesData } from "@/app/our-services/servicesdata";
import {
  ArrowRight,
  Link2,
  Lightbulb,
  Monitor,
  Cpu,
  Brain,
  ClipboardList,
  Code2,
  Sun,
  Bus,
  Shield,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const BRAND = "#07518a";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "system-integration-turnkey-delivery": Link2,
  "solution-engineering-consulting": Lightbulb,
  "command-control-centre-engineering": Monitor,
  "it-network-digital-infrastructure": Cpu,
  "ai-video-analytics-platform-integration": Brain,
  "program-management-operations-om": ClipboardList,
  "software-products-services": Code2,
  "renewable-energy-solutions": Sun,
  "smart-bus-solutions": Bus,
  "law-enforcement-in-car-surveillance": Shield,
  "ai-biometric-aadhaar-authentication": Fingerprint,
};

export default function HomeServicesSection() {
  const router = useRouter();

  return (
    <section className="relative w-full bg-slate-50/80 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-12 text-center max-w-3xl mx-auto"
        >
          <span
            className="inline-block text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: BRAND }}
          >
            What we offer
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            End-to-end technology solutions—from surveillance and AI analytics to
            renewable energy and smart infrastructure—engineered for scale and
            reliability.
          </p>
        </motion.div>

        {/* Services grid - icon-based cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
        >
          {servicesData.map((service, index) => {
            const IconComponent =
              SERVICE_ICONS[service.slug] || Link2;
            return (
              <motion.button
                key={service.slug}
                variants={item}
                onClick={() => router.push(`/our-services/${service.slug}`)}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#07518a]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07518a]/20 focus-visible:ring-offset-2 cursor-pointer text-left"
              >
                {/* Icon */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl mb-4 transition-colors duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${BRAND}15`,
                    color: BRAND,
                  }}
                >
                  <IconComponent className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug mb-2 group-hover:text-[#07518a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1 mb-5">
                  {service.description}
                </p>

                {/* CTA */}
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 w-fit"
                  style={{ color: BRAND }}
                >
                  <span>Explore service</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 text-center"
        >
          <button
            onClick={() => router.push("/our-services")}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white cursor-pointer"
            style={{ backgroundColor: BRAND, color: "#ffffff" }}
          >
            <span className="text-white">View all services</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
