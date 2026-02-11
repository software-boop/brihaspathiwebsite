import Home from "@/components/Home";
import React from "react";

export default function Page() {
  return (
    <div className="w-full overflow-x-hidden">
      <Home showFeatureShowcase={false} showHoverSlider={false} />
    </div>
  );
}