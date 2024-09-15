"use client";

import Navbar from "@/components/navbar";
import HomeContent from "./components/home-content";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <HomeContent />
    </Suspense>
  );
}
