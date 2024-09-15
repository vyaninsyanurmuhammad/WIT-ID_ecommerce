"use client";

import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const GsapLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useGSAP(() => {}, {
    dependencies: [pathname],
    revertOnUpdate: true,
  });

  return <>{children}</>;
};

export default GsapLayout;
