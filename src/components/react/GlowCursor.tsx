"use client";
import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const posX = useRef(0);
  const posY = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const lerp = (start: number, end: number, amount: number) =>
      (1 - amount) * start + amount * end;

    const animate = () => {
      posX.current = lerp(posX.current, mouseX.current, 0.1);
      posY.current = lerp(posY.current, mouseY.current, 0.1);

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(
          200px circle at ${posX.current}px ${posY.current}px,
          rgba(56, 189, 248, 0.18),
          transparent 80%
        )`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    requestAnimationFrame(animate);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-lighten blur-3xl transition-transform duration-75"
    />
  );
}
