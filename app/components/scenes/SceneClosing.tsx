"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneClosing() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    if (underlineRef.current) {
      const len = underlineRef.current.getTotalLength();
      underlineRef.current.style.strokeDasharray = String(len);
      underlineRef.current.style.strokeDashoffset = String(len);
      tl.to(
        underlineRef.current,
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
        "-=0.5"
      );
    }

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden scene"
      id="closing"
      style={{ background: "#F5F0E8" }}
    >
      {/* Background sketch accent */}
      <svg
        className="absolute right-0 bottom-0 pointer-events-none"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        style={{ opacity: 0.04 }}
      >
        <circle cx="300" cy="300" r="200" stroke="#1A1A1A" strokeWidth="1" />
        <circle cx="300" cy="300" r="140" stroke="#1A1A1A" strokeWidth="1" />
        <circle cx="300" cy="300" r="80" stroke="#1A1A1A" strokeWidth="1" />
      </svg>

      <svg
        className="absolute left-0 top-0 pointer-events-none"
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        style={{ opacity: 0.04 }}
      >
        <path d="M20 280 L280 20" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" />
        <path d="M20 230 L230 20" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" />
        <path d="M20 180 L180 20" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 text-center px-8">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            color: "rgba(26,26,26,0.35)",
            marginBottom: "2.5rem",
          }}
        >
          LET&apos;S CONNECT
        </p>

        <div className="relative inline-block">
          <div
            ref={line1Ref}
            className="opacity-0"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#1A1A1A",
              lineHeight: 1.05,
            }}
          >
            Let&apos;s build
          </div>
          <div
            ref={line2Ref}
            className="opacity-0 relative inline-block"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#1A1A1A",
              lineHeight: 1.05,
              fontStyle: "italic",
            }}
          >
            something remarkable.
            {/* Hand-drawn underline */}
            <svg
              className="absolute left-0 right-0"
              style={{
                bottom: "-8px",
                width: "100%",
                height: "16px",
                overflow: "visible",
              }}
              viewBox="0 0 400 16"
              preserveAspectRatio="none"
            >
              <path
                ref={underlineRef}
                d="M5 10 C30 6 80 12 130 9 C180 6 230 13 280 10 C330 7 370 12 395 9"
                fill="none"
                stroke="#C8A97E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <p
          ref={subRef}
          className="opacity-0 mt-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "rgba(26,26,26,0.5)",
            lineHeight: 1.8,
            maxWidth: "380px",
            margin: "2.5rem auto 0",
          }}
        >
          Open to collaborations, full-time opportunities,
          and anything worth creating.
        </p>

        <div
          ref={ctaRef}
          className="opacity-0 mt-10 flex items-center justify-center gap-6"
        >
          <a
            href="mailto:hello@riyon.design"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#1A1A1A",
              borderBottom: "1px solid rgba(26,26,26,0.25)",
              paddingBottom: "4px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            data-cursor-hover
          >
            hello@riyon.design
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="12" x2="12" y2="2" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5 2 L12 2 L12 9" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <span style={{ color: "rgba(26,26,26,0.2)", fontSize: "0.6rem" }}>×</span>

          <a
            href="https://github.com/riyon"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(26,26,26,0.5)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            data-cursor-hover
          >
            GITHUB
          </a>

          <span style={{ color: "rgba(26,26,26,0.2)", fontSize: "0.6rem" }}>×</span>

          <a
            href="https://linkedin.com/in/riyon"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(26,26,26,0.5)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            data-cursor-hover
          >
            LINKEDIN
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 md:px-16"
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(26,26,26,0.25)",
          }}
        >
          RIYON © 2025
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "rgba(26,26,26,0.2)",
          }}
        >
          DESIGNED & DEVELOPED WITH CRAFT
        </span>
      </div>
    </section>
  );
}
