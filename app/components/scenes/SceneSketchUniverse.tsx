"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FLOATERS = [
  { src: "/assets/sketches/laptop.svg", label: "Development", x: "12%", y: "20%", size: 160 },
  { src: "/assets/sketches/browser.svg", label: "Web Design", x: "62%", y: "10%", size: 180 },
  { src: "/assets/sketches/wireframe.svg", label: "UX/UI", x: "38%", y: "45%", size: 150 },
  { src: "/assets/sketches/code.svg", label: "Engineering", x: "72%", y: "55%", size: 140 },
  { src: "/assets/sketches/pencil.svg", label: "Illustration", x: "18%", y: "62%", size: 120 },
  { src: "/assets/sketches/grid.svg", label: "Systems", x: "52%", y: "70%", size: 130 },
  { src: "/assets/sketches/shapes.svg", label: "Motion", x: "80%", y: "25%", size: 100 },
];

function FloatingSketch({
  src,
  label,
  x,
  y,
  size,
  delay,
}: {
  src: string;
  label: string;
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const floatRef = useRef<gsap.core.Tween | null>(null);

  const animatePaths = useCallback((svgEl: SVGSVGElement) => {
    const paths = svgEl.querySelectorAll<SVGGeometryElement>(
      "path, line, rect, circle, ellipse, polyline"
    );
    paths.forEach((el) => {
      try {
        let len = 0;
        if ("getTotalLength" in el && typeof (el as SVGPathElement).getTotalLength === "function") {
          len = (el as SVGPathElement).getTotalLength();
        } else {
          const bb = el.getBBox();
          len = 2 * (bb.width + bb.height);
        }
        el.style.strokeDasharray = String(len);
        gsap.fromTo(
          el,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.5 + Math.random(), ease: "power2.inOut" }
        );
      } catch {
        /* noop */
      }
    });
  }, []);

  useEffect(() => {
    if (!svgContainerRef.current) return;

    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (!svgContainerRef.current) return;
        svgContainerRef.current.innerHTML = text;
        const svgEl = svgContainerRef.current.querySelector("svg");
        if (!svgEl) return;

        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svgEl.classList.add("sketch-svg");

        const paths = svgEl.querySelectorAll<SVGGeometryElement>(
          "path, line, rect, circle, ellipse, polyline"
        );
        paths.forEach((el) => {
          el.style.stroke = "#F5F0E8";
          el.style.fill = "none";
          try {
            let len = 0;
            if ("getTotalLength" in el && typeof (el as SVGPathElement).getTotalLength === "function") {
              len = (el as SVGPathElement).getTotalLength();
            } else {
              const bb = el.getBBox();
              len = 2 * (bb.width + bb.height);
            }
            el.style.strokeDasharray = String(len);
            el.style.strokeDashoffset = String(len);
          } catch {
            /* noop */
          }
        });

        // Initial draw in on scroll
        gsap.delayedCall(delay, () => animatePaths(svgEl));
      });
  }, [src, delay, animatePaths]);

  useEffect(() => {
    if (!containerRef.current) return;
    // Floating animation
    floatRef.current = gsap.to(containerRef.current, {
      y: `+=${12 + Math.random() * 10}`,
      x: `+=${(Math.random() - 0.5) * 8}`,
      duration: 2.5 + Math.random() * 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 2,
    });

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay }
    );

    return () => {
      floatRef.current?.kill();
    };
  }, [delay]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!containerRef.current) return;
    gsap.to(containerRef.current, { scale: 1.08, duration: 0.4, ease: "power2.out" });

    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (svgEl) animatePaths(svgEl);
  }, [animatePaths]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!containerRef.current) return;
    gsap.to(containerRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute opacity-0 gpu"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        cursor: "pointer",
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <div
        ref={svgContainerRef}
        style={{
          width: "100%",
          height: "100%",
          filter: isHovered ? "drop-shadow(0 0 12px rgba(200,169,126,0.4))" : "none",
          transition: "filter 0.4s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: -24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          color: isHovered ? "rgba(200,169,126,0.9)" : "rgba(245,240,232,0.25)",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function SceneSketchUniverse() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden scene"
      id="sketch-universe"
      style={{ background: "#0D0D0D" }}
    >
      <div
        ref={headingRef}
        className="absolute top-16 left-8 md:left-16 opacity-0 z-20"
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            color: "rgba(245,240,232,0.3)",
            marginBottom: "0.75rem",
          }}
        >
          CRAFT UNIVERSE
        </p>
        <h2
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            lineHeight: 1.1,
          }}
        >
          Tools of the trade
        </h2>
      </div>

      {FLOATERS.map((f, i) => (
        <FloatingSketch key={f.src} {...f} delay={0.3 + i * 0.15} />
      ))}

      {/* Subtle grid lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={`${(i + 1) * 12.5}%`}
            y1="0"
            x2={`${(i + 1) * 12.5}%`}
            y2="100%"
            stroke="#F5F0E8"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={`${(i + 1) * 16.67}%`}
            x2="100%"
            y2={`${(i + 1) * 16.67}%`}
            stroke="#F5F0E8"
            strokeWidth="1"
          />
        ))}
      </svg>
    </section>
  );
}
