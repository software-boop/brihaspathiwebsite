"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import whiteLogo from "../app/images/sollutionimages/logos/highbtlogo white- tm.png";
import blueLogo from "../app/images/sollutionimages/logos/highbtlogo tm (1).png";

const BRAND = "#07518a";

/** Set to true to show the "Contact" nav link (Get in touch button is always shown) */
const SHOW_CONTACT_LINK = false;

/* ========================= TYPES ========================= */
type InstallationItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string;
};

type AboutItem = {
  id: number;
  name: string;
  href: string;
};

/* ========================= DATA ========================= */
const SOLAR_INSTALLATIONS_DATA: { items: InstallationItem[] } = {
  items: [
    { id: 1, name: "Smart Bus Solution", slug: "smart-bus-solution", category: "Smart Mobility", description: "Advanced public transport management" },
    { id: 2, name: "AI VMS – Video Management System", slug: "ai-vms-video-management-system", category: "AI Surveillance", description: "Intelligent video monitoring solutions" },
    { id: 3, name: "Solar EPC", slug: "solar-epc", category: "Renewable Energy", description: "Complete solar power solutions" },
    { id: 4, name: "Smart Biometric & Facial Recognition", slug: "smart-biometric-facial-recognition", category: "Biometrics", description: "Secure identity verification systems" },
    { id: 5, name: "ERP Software System", slug: "erp-software-system", category: "Software", description: "Enterprise resource planning" },
  ],
};

const ABOUT_MENU: AboutItem[] = [
  { id: 1, name: "About us", href: "/about" },
  { id: 2, name: "Who We Are", href: "/about/who-we-are" },
  { id: 5, name: "Board of Directors", href: "/about/Board_of_directors" },
  { id: 4, name: "Our Team", href: "/about/our-team" },
  { id: 3, name: "Our Journey", href: "/about/ourjourney" },
  { id: 6, name: "Managing Director", href: "/about/our-managing-director" },
];

const RESOURCES_MENU: AboutItem[] = [
  { id: 1, name: "Our Events", href: "/ourevents" },
  { id: 2, name: "News", href: "/news" },
  { id: 3, name: "Our Projects", href: "/our-projects" },
  { id: 4, name: "Media", href: "/media" },
  { id: 5, name: "Case Studies", href: "/casestudy" },
];

/* ========================= COMPONENT ========================= */
export function NavigationMenuDemo() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = React.useState(false);
  const [showAboutMenu, setShowAboutMenu] = React.useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = React.useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = React.useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = React.useState(false);

  const pathname = usePathname();
  const scrollThreshold = 24;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      setMobileAboutOpen(false);
      setMobileSolutionsOpen(false);
      setMobileResourcesOpen(false);
    } else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const groupedSolutions = React.useMemo(() => {
    const groups: Record<string, InstallationItem[]> = {};
    SOLAR_INSTALLATIONS_DATA.items.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, []);

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));
  const linkClass = (active: boolean) =>
    `relative px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? "text-[#07518a]"
        : "text-slate-600 hover:text-[#07518a] hover:bg-slate-100/80"
    }`;
  const dropdownTriggerClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      active ? "text-[#07518a]" : "text-slate-600 hover:text-[#07518a] hover:bg-slate-100/80"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.25rem]">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={blueLogo}
                alt="Brihaspathi Technologies"
                width={140}
                height={44}
                className="h-9 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <Link href="/" className={linkClass(pathname === "/")}>
                Home
                {pathname === "/" && (
                  <span className="absolute bottom-1.5 left-3 right-3 h-0.5 rounded-full bg-[#07518a]" />
                )}
              </Link>

              {/* Company */}
              <div
                className="relative"
                onMouseEnter={() => setShowAboutMenu(true)}
                onMouseLeave={() => setShowAboutMenu(false)}
              >
                <button className={dropdownTriggerClass(pathname.startsWith("/about"))} aria-haspopup="true" aria-expanded={showAboutMenu}>
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAboutMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showAboutMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-1.5 min-w-[220px]"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 overflow-hidden">
                        {ABOUT_MENU.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#07518a] transition-colors"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions */}
              <div
                className="relative"
                onMouseEnter={() => setShowSolutionsMenu(true)}
                onMouseLeave={() => setShowSolutionsMenu(false)}
              >
                <button className={dropdownTriggerClass(pathname.startsWith("/solutions"))} aria-haspopup="true" aria-expanded={showSolutionsMenu}>
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSolutionsMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showSolutionsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-[min(100vw-2rem,32rem)] max-w-2xl"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-4 sm:p-6 overflow-hidden">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {Object.entries(groupedSolutions).map(([category, items]) => (
                            <div key={category}>
                              <div className="text-xs font-semibold text-[#07518a] uppercase tracking-wider mb-3">
                                {category}
                              </div>
                              <ul className="space-y-1.5">
                                {items.map((item) => (
                                  <li key={item.id}>
                                    <Link
                                      href={`/solutions/${item.slug}`}
                                      className="group flex items-start gap-2 p-2 -m-2 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                      <span className="font-medium text-slate-800 group-hover:text-[#07518a] text-sm">{item.name}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#07518a] opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5 transition-opacity" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100">
                          <Link
                            href="/solutions"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#07518a] hover:text-[#064374] transition-colors"
                          >
                            View all solutions
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources */}
              <div
                className="relative"
                onMouseEnter={() => setShowResourcesMenu(true)}
                onMouseLeave={() => setShowResourcesMenu(false)}
              >
                <button className={dropdownTriggerClass(false)} aria-haspopup="true" aria-expanded={showResourcesMenu}>
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showResourcesMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showResourcesMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-1.5 min-w-[200px]"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 overflow-hidden">
                        {RESOURCES_MENU.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="group flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#07518a] transition-colors"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/our-services" className={linkClass(pathname.startsWith("/our-services"))}>
                Services
                {pathname.startsWith("/our-services") && (
                  <span className="absolute bottom-1.5 left-3 right-3 h-0.5 rounded-full bg-[#07518a]" />
                )}
              </Link>

              {SHOW_CONTACT_LINK && (
                <Link href="/contact" className={linkClass(pathname === "/contact")}>
                  Contact
                  {pathname === "/contact" && (
                    <span className="absolute bottom-1.5 left-3 right-3 h-0.5 rounded-full bg-[#07518a]" />
                  )}
                </Link>
              )}

              <div className="ml-2 pl-2 border-l border-slate-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                  style={{ backgroundColor: BRAND, color: "#ffffff" }}
                >
                  <span className="text-white">Get in touch</span>
                </Link>
              </div>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
                <Image src={blueLogo} alt="Logo" width={120} height={40} className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                <Link href="/" onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium ${pathname === "/" ? "bg-[#07518a]/10 text-[#07518a]" : "text-slate-700 hover:bg-slate-50"}`}>
                  Home
                  {pathname === "/" && <span className="w-2 h-2 rounded-full bg-[#07518a]" />}
                </Link>

                <div>
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium ${pathname.startsWith("/about") ? "bg-[#07518a]/10 text-[#07518a]" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    Company
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAboutOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="pl-4 pb-2 space-y-0.5">
                          {ABOUT_MENU.map((item) => (
                            <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)} className="flex py-2.5 text-sm text-slate-600 hover:text-[#07518a]">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium ${pathname.startsWith("/solutions") ? "bg-[#07518a]/10 text-[#07518a]" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    Solutions
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSolutionsOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="pl-4 pb-2 space-y-3">
                          {Object.entries(groupedSolutions).map(([category, items]) => (
                            <div key={category}>
                              <div className="text-xs font-semibold text-[#07518a] uppercase tracking-wider pt-1">{category}</div>
                              <div className="space-y-0.5">
                                {items.map((item) => (
                                  <Link key={item.id} href={`/solutions/${item.slug}`} onClick={() => setMobileOpen(false)} className="flex py-2 text-sm text-slate-600 hover:text-[#07518a]">
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium text-slate-700 hover:bg-slate-50">
                    Resources
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileResourcesOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="pl-4 pb-2 space-y-0.5">
                          {RESOURCES_MENU.map((item) => (
                            <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)} className="flex py-2.5 text-sm text-slate-600 hover:text-[#07518a]">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/our-services" onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium ${pathname.startsWith("/our-services") ? "bg-[#07518a]/10 text-[#07518a]" : "text-slate-700 hover:bg-slate-50"}`}>
                  Services
                  {pathname.startsWith("/our-services") && <span className="w-2 h-2 rounded-full bg-[#07518a]" />}
                </Link>

                {SHOW_CONTACT_LINK && (
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium ${pathname === "/contact" ? "bg-[#07518a]/10 text-[#07518a]" : "text-slate-700 hover:bg-slate-50"}`}>
                    Contact
                    {pathname === "/contact" && <span className="w-2 h-2 rounded-full bg-[#07518a]" />}
                  </Link>
                )}

                <div className="pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3.5 text-sm font-semibold text-white rounded-xl"
                    style={{ backgroundColor: BRAND, color: "#ffffff" }}
                  >
                    <span className="text-white">Get in touch</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
