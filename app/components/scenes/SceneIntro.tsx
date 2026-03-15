"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export default function SceneIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      size: Math.random() * 2 + 0.5,
    }));

    let animId: number;
    let opacity = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 232, ${p.alpha * opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    // circle SVG animation
    const circlePath = circleRef.current;
    if (circlePath) {
      const length = circlePath.getTotalLength();
      circlePath.style.strokeDasharray = String(length);
      circlePath.style.strokeDashoffset = String(length);

      const tl = gsap.timeline();

      tl.to(circlePath, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.inOut",
        delay: 0.5,
      });

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.to({}, {
        onStart: () => { opacity = 0; },
        onUpdate: function() { opacity = this.progress(); },
        duration: 1.5,
      }, "-=0.3");
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-ink-black overflow-hidden scene"
      id="intro"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none gpu"
        style={{ zIndex: 0 }}
      />

      {/* Hand-drawn circle SVG */}
      <svg
        className="absolute"
        viewBox="0 0 300 300"
        style={{
          width: "min(480px, 90vw)",
          height: "min(480px, 90vw)",
          zIndex: 1,
        }}
      >
        <path
          ref={circleRef}
          d="M150 20 C220 18 282 78 284 150 C286 222 226 284 154 284 C82 286 18 228 18 156 C16 84 74 22 150 20"
          fill="none"
          stroke="#F5F0E8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div ref={textRef} className="relative text-center z-10" style={{ zIndex: 2 }}>
        <h1
          ref={nameRef}
          className="opacity-0 font-serif text-cream"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            lineHeight: 1,
            fontFamily: "var(--font-editorial)",
          }}
        >
          RIYON
        </h1>
        <p
          ref={roleRef}
          className="opacity-0 mt-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
            letterSpacing: "0.5em",
            color: "rgba(245,240,232,0.6)",
            fontWeight: 300,
          }}
        >
          DESIGNER &amp; DEVELOPER
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            color: "rgba(245,240,232,0.3)",
          }}
        >
          SCROLL
        </span>
        <div
          className="w-px bg-cream"
          style={{
            height: 40,
            opacity: 0.2,
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
