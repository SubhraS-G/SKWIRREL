"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const onEnter = () => {
      dot.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(232,90,28,0.8)";
    };

    const onLeave = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(232,90,28,0.4)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-brand-orange rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hidden lg:block"
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 border border-brand-orange/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hidden lg:block"
      />
    </>
  );
}
