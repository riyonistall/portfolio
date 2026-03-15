"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: "Craft over", accent: false },
  { text: "complexity.", accent: false },
  { text: "", accent: false },
  { text: "Every pixel", accent: false },
  { text: "is a decision.", accent: true },
  { text: "", accent: false },
  { text: "Code is", accent: false },
  { text: "a medium.", accent: false },
];

export default function ScenePhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    linesRef.current.filter(Boolean).forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 40, skewX: 2 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: "power3.out" },
        i * 0.1
      );
    });

    // Animate flowing sketch lines
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path");
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 3 + i * 0.5, ease: "power1.inOut" },
          0.2 + i * 0.4
        );
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden scene"
      id="philosophy"
      style={{ background: "#1A1A1A" }}
    >
      {/* Background flowing sketch lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.08 }}
      >
        <path
          d="M-100 200 C200 180 400 350 700 280 C1000 210 1200 400 1600 300"
          fill="none"
          stroke="#F5F0E8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M-100 400 C300 380 500 550 800 460 C1100 370 1300 530 1700 450"
          fill="none"
          stroke="#F5F0E8"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M-100 600 C250 580 600 720 900 640 C1200 560 1400 700 1700 620"
          fill="none"
          stroke="#F5F0E8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M200 -50 C220 200 180 500 210 800"
          fill="none"
          stroke="#C8A97E"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M1200 -50 C1220 250 1180 550 1210 900"
          fill="none"
          stroke="#C8A97E"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 px-8 md:px-20 lg:px-32 max-w-5xl w-full">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            color: "rgba(245,240,232,0.3)",
            marginBottom: "3rem",
          }}
        >
          PHILOSOPHY
        </p>

        <div className="space-y-2">
          {LINES.map((line, i) => (
            <div
              key={i}
              ref={(el) => { linesRef.current[i] = el; }}
              className="overflow-hidden opacity-0"
            >
              {line.text && (
                <span
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    fontWeight: 300,
                    color: line.accent ? "#C8A97E" : "#F5F0E8",
                    fontStyle: line.accent ? "italic" : "normal",
                    lineHeight: 1.05,
                    display: "block",
                  }}
                >
                  {line.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
