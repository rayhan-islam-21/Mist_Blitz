import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DeptCard = forwardRef(function DeptCard(
  { title, description, image, className, style },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "absolute z-20 w-[380px] rounded-[28px] overflow-hidden",
        "bg-white border border-black/10",
        "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]",
        "transition-all duration-300",
        "hover:shadow-[0_45px_100px_-30px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* IMAGE PANEL */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* COMIC DIAGONAL CUT */}
        <span
          className="absolute -bottom-10 -right-10
                     h-24 w-56 rotate-[-12deg]
                     bg-primary/90"
        />

        {/* TITLE */}
        <h3
          className="absolute bottom-6 left-6 right-6
                     text-2xl font-extrabold text-white
                     tracking-wide drop-shadow-md"
        >
          {title}
        </h3>
      </div>

      {/* CONTENT */}
      <div className="relative p-7">
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* CTA */}
        <button
          className="mt-6 inline-flex items-center gap-2
                     rounded-xl bg-primary px-6 py-3
                     text-sm font-bold text-white
                     transition-all duration-300
                     hover:bg-primary/90
                     hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
        >
          Know More
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

      {/* COMIC BORDER GLOW */}
      <span
        className="pointer-events-none absolute inset-0
                   rounded-[28px] ring-1 ring-primary/20"
      />
    </div>
  );
});

export default DeptCard;
