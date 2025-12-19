"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue } from "framer-motion";


import { cn } from "@/lib/utils"
import Image from "next/image";

/**
 * A custom pointer component that displays an animated cursor.
 * Add this as a child to any component to enable a custom pointer when hovering.
 * You can pass custom children to render as the pointer.
 *
 * @component
 * @param {HTMLMotionProps<"div">} props - The component props
 */
export function Pointer(
  {
    className,
    style,
    children,
    ...props
  }
) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Get the parent element directly from the ref
      const parentElement = containerRef.current.parentElement

      if (parentElement) {
        // Add cursor-none to parent
        parentElement.style.cursor = "none"

        // Add event listeners to parent
        const handleMouseMove = (e) => {
          x.set(e.clientX)
          y.set(e.clientY)
        }

        const handleMouseEnter = (e) => {
          x.set(e.clientX)
          y.set(e.clientY)
          setIsActive(true)
        }

        const handleMouseLeave = () => {
          setIsActive(false)
        }

        parentElement.addEventListener("mousemove", handleMouseMove)
        parentElement.addEventListener("mouseenter", handleMouseEnter)
        parentElement.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          parentElement.style.cursor = ""
          parentElement.removeEventListener("mousemove", handleMouseMove)
          parentElement.removeEventListener("mouseenter", handleMouseEnter)
          parentElement.removeEventListener("mouseleave", handleMouseLeave)
        };
      }
    }
  }, [x, y])

  return (
    <>
      <div ref={containerRef} />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-50 transform-[translate(-50%,-50%)]"
            style={{
              top: y,
              left: x,
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            {...props}>
            {children || (
              <Image 
              src="/sponsers/icons8-f1-car-50.png"
              alt="logo"
              width={35}
              height={35}
              className="text-yellow-300"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
