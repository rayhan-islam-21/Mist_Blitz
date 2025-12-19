"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Car } from "lucide-react";

export default function ScrollCarConnector() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Animate position
  const x = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={ref} className="relative h-[260px] my-20">
      
      {/* Dashed Line */}
      <div className="absolute left-8 top-8 w-[360px] h-[220px] border-l-2 border-b-2 border-dashed border-black rotate-[-12deg]" />

      {/* Moving Car */}
      <motion.div
        style={{ x, y, rotate }}
        className="absolute left-8 top-8 z-10 text-red-600"
      >
        <Car size={36} strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}
