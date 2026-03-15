"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Identity", href: "#identity" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Work", href: "#projects" },
  { label: "Connect", href: "#closing" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 2.8 }
    );

    // Switch nav color based on section background
    const lightSections = ["#identity", "#closing"];
    lightSections.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 10%",
        end: "bottom 10%",
        onEnter: () => setIsDark(false),
        onLeave: () => setIsDark(true),
        onEnterBack: () => setIsDark(false),
        onLeaveBack: () => setIsDark(true),
      });
    });
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-7 opacity-0"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <a
        href="#intro"
        onClick={(e) => { e.preventDefault(); scrollTo("#intro"); }}
        style={{
          fontFamily: "var(--font-editorial)",
          fontSize: "1rem",
          fontWeight: 400,
          letterSpacing: "0.25em",
          color: isDark ? "#F5F0E8" : "#1A1A1A",
          textDecoration: "none",
          transition: "color 0.5s ease",
        }}
        data-cursor-hover
      >
        RIYON
      </a>

      <div className="flex items-center gap-8 md:gap-12">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: isDark ? "rgba(245,240,232,0.5)" : "rgba(26,26,26,0.5)",
              textDecoration: "none",
              transition: "color 0.5s ease",
            }}
            data-cursor-hover
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#F5F0E8" : "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = isDark
                ? "rgba(245,240,232,0.5)"
                : "rgba(26,26,26,0.5)";
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
