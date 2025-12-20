import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DeptCard = forwardRef(
  ({ title, description, image, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-10 w-80 rounded-3xl border border-transparent",
          "bg-linear-to-br from-background/70 to-muted/20 backdrop-blur-md",
          "shadow-lg hover:shadow-2xl transition-all duration-300",
          "hover:border-primary/50 group",
          className
        )}
      >
        {/* IMAGE */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-200 leading-snug">
            {description}
          </p>
        </div>

        {/* HOVER ACCENT LINE */}
        <span
          className="absolute inset-x-6 bottom-0 h-1 rounded-full
                     bg-linear-to-r from-transparent via-primary to-transparent
                     opacity-0 transition-all duration-300
                     group-hover:opacity-100"
        />
      </div>
    );
  }
);

DeptCard.displayName = "DeptCard";
export default DeptCard;
