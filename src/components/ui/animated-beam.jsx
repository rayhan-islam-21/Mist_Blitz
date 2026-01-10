"use client";
import { useEffect, useId, useState, useCallback } from "react";
import { motion } from "framer-motion"; // Changed from "motion/react" to "framer-motion" for standard installs
import { cn } from "@/lib/utils";

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = -100,
  reverse = false,
  duration = 1, // Faster duration for better visibility during testing
  delay = 0,
  pathColor = "green",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  // Use useCallback so it's a stable dependency for ResizeObserver and effect
  const updatePath = useCallback(() => {
    if (containerRef.current && fromRef.current && toRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      // Only update if we have actual dimensions (prevents 0 height SVGs)
      if (containerRect.width > 0 && containerRect.height > 0) {
        setSvgDimensions({ width: containerRect.width, height: containerRect.height });

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  useEffect(() => {
    // 1. Monitor layout changes
    const resizeObserver = new ResizeObserver(() => updatePath());
    
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    // 2. Initial trigger after a tiny delay to ensure layout has settled
    const timeoutId = setTimeout(updatePath, 100);

    // 3. Trigger on window resize (extra safety)
    window.addEventListener("resize", updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
      clearTimeout(timeoutId);
    };
  }, [updatePath, containerRef, fromRef, toRef]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute top-0 left-0 stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
          }}
          transition={{
            delay,
            duration,
            ease: "linear", // Changed to linear for a smoother "flowing" effect
            repeat: Infinity,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};