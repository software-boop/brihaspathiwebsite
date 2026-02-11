'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  Cctv,
  Thermometer,
  Lock,
  LayoutDashboard,
  Shield,
  Brain,
  Cpu,
  Radio,
  Cloud,
  Fingerprint,
  Scan,
  Smartphone,
  Workflow,
  Users,
  BarChart3,
  Zap,
  Bell,
  DoorOpen,
  QrCode,
  Sun,
  Battery,
  LineChart,
  ArrowRight,
  ClipboardCheck,
  Code,
  type LucideIcon,
} from 'lucide-react';

const FEATURE_ICON_MAP: Record<string, LucideIcon> = {
  Cctv,
  Thermometer,
  Lock,
  LayoutDashboard,
  ClipboardCheck,
  Shield,
  Brain,
  Cpu,
  Radio,
  Cloud,
  Fingerprint,
  Scan,
  Smartphone,
  Workflow,
  Users,
  BarChart3,
  Zap,
  Bell,
  DoorOpen,
  QrCode,
  Sun,
  Battery,
  LineChart,
  Code,
};

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface ProjectData {
  title: string;
  description: string;
  link: StaticImageData | string;
  color: string;
  pageHref?: string;
  features?: FeatureItem[];
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: StaticImageData | string;
  color: string;
  pageHref?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  features?: FeatureItem[];
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  pageHref,
  progress,
  range,
  targetScale,
  features,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-[85vh] flex items-start justify-center pt-4 lg:pt-6 sticky top-0"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{
            scale,
            top: '2vh',
            boxShadow: '0 4px 24px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
          }}
          className="relative flex w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white origin-center h-[520px] md:h-[480px]"
        >
          {/* Left: content — more space, image smaller on right */}
          <div className="flex flex-1 flex-col min-w-0 md:flex-row md:items-stretch">
            {/* Text + features */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8 md:min-w-0 md:max-w-[58%]">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl lg:text-2xl leading-snug">
                {title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600 line-clamp-2 md:line-clamp-none">
                {description}
              </p>
              {features && features.length > 0 && (
                <ul className="mt-4 space-y-2.5 overflow-y-auto max-h-[200px] md:max-h-[220px] pr-1">
                  {features.map((f, idx) => {
                    const IconComponent = f.icon ? FEATURE_ICON_MAP[f.icon] : null;
                    return (
                      <li key={idx} className="flex gap-3 items-start">
                        {IconComponent && (
                          <div
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${color}14`, color }}
                          >
                            <IconComponent className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-base font-semibold text-slate-800 block leading-tight">{f.title}</span>
                          <span className="text-sm leading-relaxed text-slate-500 block mt-0.5">{f.description}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              <motion.a
                href={pageHref ?? "/our-services"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-base font-semibold text-white transition-all hover:opacity-95"
                style={{ backgroundColor: color }}
              >
                Explore solution
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
            {/* Image — smaller, right side */}
            <div className="relative w-full h-44 shrink-0 md:w-[42%] md:h-full md:min-h-0 overflow-hidden bg-slate-100 border-t md:border-t-0 md:border-l border-slate-100">
              <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale }}
              >
                <Image
                  src={url}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </motion.div>
            </div>
          </div>
          {/* Accent bar — top */}
          <div
            className="absolute left-0 right-0 top-0 h-0.5 md:h-1 shrink-0"
            style={{ backgroundColor: color }}
          />
        </motion.div>
      </div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main className="bg-[#f8f9fa]" ref={container}>
        {/* Capability Hero Header - compact spacing */}
        <section className="w-full py-6 lg:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block rounded-full border border-[#07518a]/20 bg-[#07518a]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#07518a]"
              >
                Our Expertise
              </motion.span>
            
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl font-sans"
              >
                Our Capabilities
              </motion.h1>
            
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-base leading-relaxed text-gray-600"
              >
                At <span className="font-semibold text-[#07518a]">Brihaspathi Technologies</span>, we deliver end-to-end technology solutions that secure, connect, and power the world&apos;s most mission-critical infrastructures.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Dynamic Card Section - reduced gap from header */}
        <section className="pb-[10vh] -mt-4">
          {projects.map((project, i) => {
            // Adjust the scroll range based on number of projects for smoother transition
            const rangeStart = i * (1 / projects.length);
            const targetScale = 1 - (projects.length - i) * 0.04;
            
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                pageHref={project.pageHref}
                description={project.description}
                features={project.features}
                progress={scrollYProgress}
                range={[rangeStart, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        {/* Footer Accent */}
       
    </main>
  );
});

Component.displayName = 'Component';

export default Component;