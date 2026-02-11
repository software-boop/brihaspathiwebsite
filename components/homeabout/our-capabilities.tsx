// demo.tsx
import React from "react";
import type { StaticImageData } from "next/image";
import Component from "@/components/homeabout/stacking-card";

import AdvancedSurveillanceSecuritySolutions from "./capabilities/Advanced Surveillance & Security Solutions.jpg";
import AIVideoAnalyticsIntelligentMonitoring from "./capabilities/AI Video Analytics & Intelligent Monitoring.jpg";
import BiometricIdentityManagementSystems from "./capabilities/Biometric & Identity Management Systems.jpg";
import SoftwareProductsDigitalPlatforms from "./capabilities/Software Products & Digital Platforms.jpg";
import SmartMobilityTransportSolutions from "./capabilities/Smart Mobility & Transport Solutions.jpg";
import RenewableEnergySmartUrbanInfrastructure from "./capabilities/Renewable Energy & Smart Urban Infrastructure.jpg";

const projects: {
  title: string;
  description: string;
  link: string | StaticImageData;
  color: string;
  pageHref?: string;
  features?: { title: string; description: string; icon?: string }[];
}[] = [
  {
    title: "Advanced Surveillance & Security Solutions",
    description:
      "End-to-end surveillance and security ecosystems for cities, enterprises, and critical infrastructure—real-time situational awareness, threat detection, and centralized operations.",
    link: AdvancedSurveillanceSecuritySolutions,
    color: "#07518a",
    pageHref: "/our-services/command-control-centre-engineering",
    features: [
      { title: "AI-enabled CCTV", description: "Intelligent camera systems with analytics for real-time monitoring.", icon: "Cctv" },
      { title: "Thermal cameras", description: "Heat-based detection for perimeter and critical asset security.", icon: "Thermometer" },
      { title: "Access control", description: "Integrated access management and identity verification.", icon: "Lock" },
      { title: "Command & control centers", description: "Centralized operations for situational awareness.", icon: "LayoutDashboard" },
    ],
  },
  {
    title: "AI Video Analytics & Intelligent Monitoring",
    description:
      "AI-powered video analytics that transform raw feeds into actionable intelligence, integrated with VMS and command centers for faster response and operational efficiency.",
    link: AIVideoAnalyticsIntelligentMonitoring,
    color: "#07518a",
    pageHref: "/our-services/ai-video-analytics-platform-integration",
    features: [
      { title: "Intelligent Monitoring", description: "24/7 AI-based monitoring with face recognition, ANPR, and intrusion detection.", icon: "Brain" },
      { title: "Video Analytics Platform", description: "Integrated with VMS, ICCCs, and legacy systems for real-time insights.", icon: "Cpu" },
      { title: "Command & Control", description: "Centralized command centers with video walls and operator consoles.", icon: "Radio" },
      { title: "Edge & Cloud Analytics", description: "Edge processing and cloud integration for scalable, low-latency analytics.", icon: "Cloud" },
    ],
  },
  {
    title: "Biometric & Identity Management Systems",
    description:
      "Secure, scalable biometric and identity platforms integrated with Aadhaar and AI-based facial recognition for government, enterprises, and institutions.",
    link: BiometricIdentityManagementSystems,
    color: "#07518a",
    pageHref: "/our-services/ai-biometric-aadhaar-authentication",
    features: [
      { title: "Aadhaar Authentication", description: "Secure, contactless identity verification for government and enterprise.", icon: "Fingerprint" },
      { title: "Facial Recognition", description: "AI-powered face recognition for attendance, access control, and fraud prevention.", icon: "Scan" },
      { title: "Multi-Modal Biometrics", description: "Fingerprint, face, and card-based access for maximum security and flexibility.", icon: "Smartphone" },
      { title: "Access Control & Audit", description: "Centralized access control with full audit trails and compliance reporting.", icon: "Lock" },
    ],
  },
  {
    title: "Software Products & Digital Platforms",
    description:
      "Enterprise-grade digital solutions—from custom web and app development to automation-centric ERP and Biz Track. Built with modern stacks for scale, security, and performance.",
    link: SoftwareProductsDigitalPlatforms,
    color: "#07518a",
    pageHref: "/our-services/software-products-services",
    features: [
      { title: "Enterprise Custom Development", description: "Tailored applications built with latest tech stacks—Next.js, React, Node.js, FastAPI—for scale and maintainability.", icon: "Code" },
      { title: "Integrated Business Processes", description: "Unifies finance, HR, supply chain, and operations in one platform.", icon: "Workflow" },
      { title: "Cloud-Native Architecture", description: "Scalable, secure access with automatic updates and flexible deployment.", icon: "Cloud" },
      { title: "AI-Driven Insights", description: "Predictive analytics and intelligent automation for smarter decisions.", icon: "Brain" },
    ],
  },
  {
    title: "Smart Mobility & Transport Solutions",
    description:
      "Intelligent mobility through Smart Bus and Vehicle Surveillance—AI cameras, GPS, MDVR, passenger information systems, and analytics for operators.",
    link: SmartMobilityTransportSolutions,
    color: "#07518a",
    pageHref: "/our-services/smart-bus-solutions",
    features: [
      { title: "Automatic Passenger Counting (APC)", description: "Advanced sensors to count passengers for operational efficiency.", icon: "Users" },
      { title: "Panic Buttons", description: "For passengers and drivers to send instant alerts to control centers.", icon: "Bell" },
      { title: "Door Sensors", description: "Real-time boarding and deboarding statistics for route management.", icon: "DoorOpen" },
      { title: "Smart Ticketing Integration", description: "QR codes and NFC for seamless ticket validation and boarding.", icon: "QrCode" },
    ],
  },
  {
    title: "Renewable Energy & Smart Urban Infrastructure",
    description:
      "Solar rooftop EPC and Solar Smart Poles that blend renewable energy with surveillance, lighting, and connectivity for smart cities and enterprises.",
    link: RenewableEnergySmartUrbanInfrastructure,
    color: "#07518a",
    pageHref: "/our-services/renewable-energy-solutions",
    features: [
      { title: "Solar Rooftop EPC", description: "End-to-end design, procurement, and commissioning of rooftop and ground-mount solar.", icon: "Sun" },
      { title: "Smart Poles", description: "Solar-powered poles blending renewable energy with surveillance and connectivity.", icon: "Zap" },
      { title: "Battery & Storage", description: "Battery storage and smart grid integration for round-the-clock power.", icon: "Battery" },
      { title: "Monitoring & ROI", description: "Real-time monitoring dashboards and ROI tracking for deployments.", icon: "LineChart" },
    ],
  },
];

function ComponentDemo() {
  return <Component projects={projects} />;
}

export { ComponentDemo as Ourcapabilities };
