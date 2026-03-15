"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "frozen-bottle",
    title: "Frozen Bottle",
    category: "Brand Identity",
    year: "2024",
    sketch: "/assets/sketches/bottle.svg",
    color: "#1B4F8A",
    accent: "#5BB3F0",
    description: "Redefining the premium dessert experience through bold visual language.",
  },
  {
    id: "khao-talent",
    title: "Khao Talent",
    category: "Web Platform",
    year: "2024",
    sketch: "/assets/sketches/browser.svg",
    color: "#2D4A22",
    accent: "#7EB35A",
    description: "A talent discovery platform built on transparency and craft.",
  },
  {
    id: "jrm-global",
    title: "JRM Global",
    category: "Digital Strategy",
    year: "2023",
    sketch: "/assets/sketches/grid.svg",
    color: "#4A2D1A",
    accent: "#C8956A",
    description: "Global brand narrative for a leader in cross-cultural consulting.",
  },
  {
    id: "idermify",
    title: "Idermify",
    category: "UI/UX Design",
    year: "2023",
    sketch: "/assets/sketches/wireframe.svg",
    color: "#2A1A4A",
    accent: "#9B7FD4",
    description: "Skincare intelligence app that makes dermatology accessible.",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const bgColorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const animateSketches = useCallback((el: HTMLDivElement) => {
    const svgEl = el.querySelector("svg");
    if (!svgEl) return;
    const paths = svgEl.querySelectorAll<SVGGeometryElement>(
      "path, line, rect, circle, ellipse, polyline"
    );
    paths.forEach((p) => {
      try {
        let len = 0;
        if ("getTotalLength" in p && typeof (p as SVGPathElement).getTotalLength === "function") {
          len = (p as SVGPathElement).getTotalLength();
        } else {
          const bb = p.getBBox();
          len = 2 * (bb.width + bb.height);
        }
        p.style.strokeDasharray = String(len);
        gsap.fromTo(
          p,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }
        );
      } catch {
        /* noop */
      }
    });
  }, []);

  useEffect(() => {
    if (!sketchRef.current) return;
    const el = sketchRef.current;

    fetch(project.sketch)
      .then((r) => r.text())
      .then((text) => {
        el.innerHTML = text;
        const svgEl = el.querySelector("svg");
        if (!svgEl) return;

        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svgEl.classList.add("sketch-svg");

        const paths = svgEl.querySelectorAll<SVGGeometryElement>(
          "path, line, rect, circle, ellipse, polyline"
        );
        paths.forEach((p) => {
          p.style.stroke = "#F5F0E8";
          p.style.fill = "none";
          try {
            let len = 0;
            if ("getTotalLength" in p && typeof (p as SVGPathElement).getTotalLength === "function") {
              len = (p as SVGPathElement).getTotalLength();
            } else {
              const bb = p.getBBox();
              len = 2 * (bb.width + bb.height);
            }
            p.style.strokeDasharray = String(len);
            p.style.strokeDashoffset = "0";
          } catch {
            /* noop */
          }
        });
      });
  }, [project.sketch]);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
    if (bgColorRef.current) {
      gsap.to(bgColorRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    if (sketchRef.current) {
      gsap.to(sketchRef.current, { scale: 1.05, opacity: 0.15, duration: 0.5 });
      animateSketches(sketchRef.current);
    }
  }, [animateSketches]);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    if (bgColorRef.current) {
      gsap.to(bgColorRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
    }
    if (sketchRef.current) {
      gsap.to(sketchRef.current, { scale: 1, opacity: 0.5, duration: 0.5 });
    }
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
        delay: index * 0.1,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden opacity-0 gpu"
      style={{
        aspectRatio: "3/4",
        background: "#141414",
        border: "1px solid rgba(245,240,232,0.06)",
        cursor: "pointer",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor-hover
    >
      {/* Colour wash on hover */}
      <div
        ref={bgColorRef}
        className="absolute inset-0"
        style={{ background: project.color, opacity: 0, zIndex: 0 }}
      />

      {/* Sketch */}
      <div
        ref={sketchRef}
        className="absolute inset-0 flex items-center justify-center p-10"
        style={{ opacity: 0.5, zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: isHovered ? project.accent : "rgba(245,240,232,0.35)",
              transition: "color 0.3s ease",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            {project.category} — {project.year}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              color: "rgba(245,240,232,0.45)",
              lineHeight: 1.6,
              maxHeight: isHovered ? "60px" : "0",
              overflow: "hidden",
              transition: "max-height 0.4s ease",
            }}
          >
            {project.description}
          </p>
        </div>
      </div>

      {/* Corner arrow */}
      <div
        className="absolute top-5 right-5 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translate(0,0)" : "translate(-4px, 4px)",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="4" y1="16" x2="16" y2="4" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 4 L16 4 L16 12" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function SceneProjects() {
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
      className="relative w-full min-h-screen scene py-20"
      id="projects"
      style={{ background: "#0D0D0D" }}
    >
      <div className="px-8 md:px-16 lg:px-24">
        <div ref={headingRef} className="opacity-0 mb-14">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.45em",
              color: "rgba(245,240,232,0.3)",
              marginBottom: "0.75rem",
            }}
          >
            SELECTED WORK
          </p>
          <h2
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.1,
            }}
          >
            Projects that define
            <br />
            <em>the practice.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
