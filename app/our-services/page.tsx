import React from "react";
import ServicesGrid from "./ServicesGrid";
import ServicesHero from "./ServicesHero";

export default function OurServicesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <ServicesHero />
      <ServicesGrid />
    </div>
  );
}