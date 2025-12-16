"use client";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  hoverFill = "fill-yellow-400/40",
  fadeDelay = 600, // 👈 how long box stays lit (ms)
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [activeSquares, setActiveSquares] = useState(new Set());

  // store timeouts so they don't conflict
  const timeoutsRef = useRef({});

  const totalWidth = width * horizontal;
  const totalHeight = height * vertical;

  const activateSquare = (index) => {
    // add square immediately
    setActiveSquares((prev) => new Set(prev).add(index));

    // clear old timeout if exists
    if (timeoutsRef.current[index]) {
      clearTimeout(timeoutsRef.current[index]);
    }

    // remove after delay
    timeoutsRef.current[index] = setTimeout(() => {
      setActiveSquares((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
      delete timeoutsRef.current[index];
    }, fadeDelay);
  };

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      preserveAspectRatio="none"
      className={cn("absolute inset-0 w-full h-full", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            onMouseEnter={() => activateSquare(index)}
            className={cn(
              "stroke-gray-400/30 transition-all duration-700 ease-out",
              activeSquares.has(index)
                ? hoverFill
                : "fill-transparent",
              squaresClassName
            )}
          />
        );
      })}
    </svg>
  );
}
