"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SketchDrawing from "@/app/components/sketch/SketchDrawing";

gsap.registerPlugin(ScrollTrigger);

export default function SceneIdentity() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      rightRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      "-=1.2"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center scene"
      id="identity"
      style={{ background: "#F5F0E8" }}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 px-8 md:px-16 lg:px-24 py-20">
        {/* Left — Typography */}
        <div
          ref={leftRef}
          className="flex flex-col justify-center opacity-0"
          style={{ borderRight: "1px solid rgba(26,26,26,0.1)" }}
        >
          <div className="pr-8 md:pr-16">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                color: "rgba(26,26,26,0.4)",
                marginBottom: "2.5rem",
              }}
            >
              IDENTITY
            </p>

            <div className="space-y-1">
              <div
                ref={line1Ref}
                className="opacity-0"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  lineHeight: 1.1,
                  fontStyle: "italic",
                }}
              >
                Designing brands
              </div>
              <div
                ref={line2Ref}
                className="opacity-0"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  lineHeight: 1.1,
                }}
              >
                between logic
              </div>
              <div
                ref={line3Ref}
                className="opacity-0"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  lineHeight: 1.1,
                  fontStyle: "italic",
                }}
              >
                and emotion.
              </div>
            </div>

            <p
              ref={taglineRef}
              className="opacity-0 mt-10"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "rgba(26,26,26,0.5)",
                lineHeight: 1.8,
                maxWidth: "320px",
              }}
            >
              Full-stack designer crafting digital experiences that balance
              systematic thinking with creative intuition.
            </p>
          </div>
        </div>

        {/* Right — Sketch Illustrations */}
        <div
          ref={rightRef}
          className="opacity-0 grid grid-cols-2 gap-6 pl-8 md:pl-16"
        >
          {[
            { src: "/assets/sketches/laptop.svg", label: "Development" },
            { src: "/assets/sketches/pencil.svg", label: "Design" },
            { src: "/assets/sketches/grid.svg", label: "Systems" },
            { src: "/assets/sketches/browser.svg", label: "Web" },
          ].map((item, i) => (
            <div
              key={item.src}
              className="flex flex-col items-center gap-3"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div style={{ height: "120px", width: "100%" }}>
                <SketchDrawing
                  src={item.src}
                  className="w-full h-full gpu"
                  duration={1.8}
                  delay={0.3 + i * 0.2}
                  color="#1A1A1A"
                  triggerOnScroll={true}
                  strokeWidth={1.2}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  color: "rgba(26,26,26,0.35)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
