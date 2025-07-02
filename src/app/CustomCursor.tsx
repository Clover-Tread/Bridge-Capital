"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const blendRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      if (blendRef.current) blendRef.current.style.display = "none";
      return;
    }

    const moveTo = (ref: React.RefObject<HTMLDivElement>, axis: "x" | "y") =>
      gsap.quickTo(ref.current, axis, {
        duration: 0.4,
        ease: "power3",
      });

    const xTo = moveTo(cursorRef, "x");
    const yTo = moveTo(cursorRef, "y");
    const xBlendTo = moveTo(blendRef, "x");
    const yBlendTo = moveTo(blendRef, "y");

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xBlendTo(e.clientX);
      yBlendTo(e.clientY);
    };

    const hoverSelector =
      'a, button, input, textarea, [role="button"], label, select';

    const handleMouseEnter = (e: Event) => {
      const target = (e.target as HTMLElement).closest(hoverSelector);
      if (target) {
        cursorRef.current?.classList.add("interactive-hover");
        blendRef.current?.classList.add("interactive-hover");
      }
    };

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove("interactive-hover");
      blendRef.current?.classList.remove("interactive-hover");
    };

    window.addEventListener("mousemove", moveCursor);

    const targets = document.querySelectorAll(hoverSelector);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={blendRef} className="custom-cursor-blend" />
      <div ref={cursorRef} className="custom-cursor-core" />
    </>
  );
};

export default CustomCursor;
