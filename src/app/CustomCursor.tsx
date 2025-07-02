"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const blendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (blendRef.current) blendRef.current.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(blendRef.current, "x", {
      duration: 0.7,
      ease: "power3",
    });
    const yTo = gsap.quickTo(blendRef.current, "y", {
      duration: 0.7,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const hoverSelector =
      'a, button, input, textarea, [role="button"], label, select';

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(hoverSelector);
      if (target) {
        blendRef.current?.classList.add("interactive-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(hoverSelector);
      if (target) {
        blendRef.current?.classList.remove("interactive-hover");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={blendRef} className="custom-cursor-blend" />;
};

export default CustomCursor;
