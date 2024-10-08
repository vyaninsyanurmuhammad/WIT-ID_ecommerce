"use client";

import HomeContent from "./components/home-content";
import { Suspense } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-zinc-800">
          <div className="relative h-20 w-auto">
            <Image
              src={"/assets/images/svg/logo.svg"}
              className="!relative !h-full object-contain"
              sizes="100%"
              fill
              alt="logo-loading"
            />
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
