"use client";
import { useEffect, useId, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = -100,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = "rgba(255,255,255,0.1)",
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

  const updatePath = useCallback(() => {
    // Safely access current elements
    const container = containerRef?.current;
    const from = fromRef?.current;
    const to = toRef?.current;

    if (container && from && to) {
      const containerRect = container.getBoundingClientRect();
      const rectA = from.getBoundingClientRect();
      const rectB = to.getBoundingClientRect();

      // Ensure the container actually has a size
      if (containerRect.width > 0 && containerRect.height > 0) {
        setSvgDimensions({ 
          width: containerRect.width, 
          height: containerRect.height 
        });

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
    // 1. Observe all three elements for layout shifts
    const resizeObserver = new ResizeObserver(() => updatePath());
    
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    // 2. Initial trigger with a slightly longer delay (200ms)
    // This allows the Circular layout's 'transform' and 'opacity' animations to settle
    const timeoutId = setTimeout(updatePath, 200);

    // 3. Fallback for window changes
    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath, true); // True catches shifts in parents

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath, true);
      clearTimeout(timeoutId);
    };
  }, [updatePath, containerRef, fromRef, toRef]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute top-0 left-0", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Background Path (Static) */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {/* Animated Gradient Path */}
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
            ease: "linear",
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