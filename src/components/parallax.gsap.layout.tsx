"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { DetailedHTMLProps, useRef } from "react";

interface ParallaxGsaplayoutProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const ParallaxGsapLayout = ({
  children,
  ...props
}: ParallaxGsaplayoutProps) => {
  const ref = useRef(null);
  

  useGSAP(
    () => {
      if (ref.current)
        ScrollTrigger.create({
          trigger: ref.current,
          // pin: true,
          start: "top bottom-=20%",
          end: "bottom top+=20%",
          // markers: true,
          onEnter: () => {
            gsap.to(ref.current, {
              opacity: 1,
              duration: 1,
              rotateX: 0,
              scale: 1,
            }); // Animasi opacity masuk
          },
          onEnterBack: () => {
            gsap.to(ref.current, {
              opacity: 1,
              duration: 1,
              rotateX: 0,
              scale: 1,
            }); // Saat kembali masuk
          },
          onLeave: () => {
            gsap.to(ref.current, {
              opacity: 0.2,
              duration: 1,
              rotateX: 24,
              scale: 0.95,
            }); // Animasi opacity keluar
          },
          onLeaveBack: () => {
            gsap.to(ref.current, {
              opacity: 0.2,
              duration: 1,
              rotateX: 24,
              scale: 0.95,
            }); // Saat kembali keluar
          },
        });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default ParallaxGsapLayout;
