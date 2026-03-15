"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SketchDrawingProps {
  src: string;
  className?: string;
  duration?: number;
  delay?: number;
  color?: string;
  triggerOnScroll?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  autoPlay?: boolean;
  strokeWidth?: number;
  onComplete?: () => void;
}

export default function SketchDrawing({
  src,
  className = "",
  duration = 2,
  delay = 0,
  color = "#F5F0E8",
  triggerOnScroll = false,
  triggerRef,
  autoPlay = false,
  strokeWidth,
  onComplete,
}: SketchDrawingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animateSketch = useCallback((svgEl: SVGElement) => {
    const paths = svgEl.querySelectorAll<SVGGeometryElement>(
      "path, line, rect, circle, ellipse, polyline, polygon"
    );

    paths.forEach((el) => {
      const stroke = color;
      el.style.stroke = stroke;
      el.style.fill = "none";
      if (strokeWidth) el.style.strokeWidth = String(strokeWidth);

      let length = 0;
      try {
        if ("getTotalLength" in el && typeof (el as SVGPathElement).getTotalLength === "function") {
          length = (el as SVGPathElement).getTotalLength();
        } else {
          const bbox = el.getBBox();
          length = 2 * (bbox.width + bbox.height);
        }
      } catch {
        length = 200;
      }

      el.style.strokeDasharray = String(length);
      el.style.strokeDashoffset = String(length);
    });

    const tl = gsap.timeline({ onComplete });
    paths.forEach((el, i) => {
      let length = 0;
      try {
        if ("getTotalLength" in el && typeof (el as SVGPathElement).getTotalLength === "function") {
          length = (el as SVGPathElement).getTotalLength();
        } else {
          const bbox = el.getBBox();
          length = 2 * (bbox.width + bbox.height);
        }
      } catch {
        length = 200;
      }

      tl.to(
        el,
        {
          strokeDashoffset: 0,
          duration: duration * (0.6 + Math.random() * 0.8),
          ease: "power2.inOut",
        },
        delay + i * 0.08
      );
    });

    return tl;
  }, [color, duration, delay, strokeWidth, onComplete]);

  useEffect(() => {
    if (!containerRef.current) return;

    fetch(src)
      .then((r) => r.text())
      .then((svgText) => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svgText;
        const svgEl = containerRef.current.querySelector("svg");
        if (!svgEl) return;

        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svgEl.classList.add("sketch-svg");

        const paths = svgEl.querySelectorAll<SVGGeometryElement>(
          "path, line, rect, circle, ellipse, polyline, polygon"
        );
        paths.forEach((el) => {
          el.style.stroke = color;
          el.style.fill = "none";
          if (strokeWidth) el.style.strokeWidth = String(strokeWidth);
          try {
            let length = 0;
            if ("getTotalLength" in el && typeof (el as SVGPathElement).getTotalLength === "function") {
              length = (el as SVGPathElement).getTotalLength();
            } else {
              const bbox = el.getBBox();
              length = 2 * (bbox.width + bbox.height);
            }
            el.style.strokeDasharray = String(length);
            el.style.strokeDashoffset = String(length);
          } catch {
            el.style.strokeDasharray = "200";
            el.style.strokeDashoffset = "200";
          }
        });

        if (autoPlay) {
          animateSketch(svgEl);
          return;
        }

        if (triggerOnScroll) {
          const trigger = triggerRef?.current || containerRef.current;
          ScrollTrigger.create({
            trigger,
            start: "top 80%",
            onEnter: () => {
              if (!hasAnimated.current) {
                hasAnimated.current = true;
                animateSketch(svgEl);
              }
            },
          });
        }
      });
  }, [src, animateSketch, color, strokeWidth, autoPlay, triggerOnScroll, triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`sketch-container ${className}`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  );
}
