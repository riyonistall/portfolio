"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SmoothScrollProvider from "@/app/components/ui/SmoothScrollProvider";
import Navigation from "@/app/components/ui/Navigation";
import CustomCursor from "@/app/components/ui/CustomCursor";
import SceneIntro from "@/app/components/scenes/SceneIntro";

// Dynamic imports for heavy scenes
const SceneIdentity = dynamic(() => import("@/app/components/scenes/SceneIdentity"), { ssr: false });
const ScenePhilosophy = dynamic(() => import("@/app/components/scenes/ScenePhilosophy"), { ssr: false });
const SceneSketchUniverse = dynamic(() => import("@/app/components/scenes/SceneSketchUniverse"), { ssr: false });
const SceneProjects = dynamic(() => import("@/app/components/scenes/SceneProjects"), { ssr: false });
const SceneClosing = dynamic(() => import("@/app/components/scenes/SceneClosing"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger on page ready
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />
      <main ref={mainRef}>
        <SceneIntro />
        <SceneIdentity />
        <ScenePhilosophy />
        <SceneSketchUniverse />
        <SceneProjects />
        <SceneClosing />
      </main>
    </SmoothScrollProvider>
  );
}
