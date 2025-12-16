"use client";
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 1,
  duration = 4,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);

  // Update container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate squares after dimensions are known
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const cols = Math.floor(dimensions.width / width);
      const rows = Math.floor(dimensions.height / height);

      const newSquares = Array.from({ length: numSquares }, (_, i) => {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        return { id: i, x: col * width, y: row * height };
      });

      setSquares(newSquares);
    }
  }, [dimensions, numSquares, width, height]);

  // Function to update a square's position randomly
  const updateSquarePosition = (id) => {
    if (!dimensions.width || !dimensions.height) return;

    const cols = Math.floor(dimensions.width / width);
    const rows = Math.floor(dimensions.height / height);

    setSquares((prev) =>
      prev.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              x: Math.floor(Math.random() * cols) * width,
              y: Math.floor(Math.random() * rows) * height,
            }
          : sq
      )
    );
  };

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} />

      {squares.map((sq) => (
        <motion.rect
          key={sq.id}
          x={sq.x}
          y={sq.y}
          width={width - 2}
          height={height - 2}
          fill="currentColor"
          strokeWidth={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: maxOpacity }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          onAnimationComplete={() => updateSquarePosition(sq.id)}
        />
      ))}
    </svg>
  );
}
