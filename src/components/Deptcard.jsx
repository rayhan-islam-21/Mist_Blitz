import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "./ui/retro-btn";

const DeptCard = forwardRef(function DeptCard(
  { title, description, image, className, style },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "relative w-95 h-87 overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500",
        "shadow-lg shadow-black/20 z-50 hover:shadow-2xl hover:shadow-black/40",
        className
      )}
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
      </div>

      {/* TITLE & DESCRIPTION CONTAINER */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{title}</h3>
        
        {/* DESCRIPTION - slide up on hover */}
        <p className="mt-2 max-h-0 overflow-hidden text-white text-base leading-relaxed transition-all duration-500 group-hover:max-h-40">
          {description}
        </p>

        {/* CTA BUTTON - slide up with description */}
        <div className="mt-3 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <Button className="bg-yellow-300" size="sm"> 
            Know More →
          </Button>
        </div>
      </div>
    </div>
  );
});

export default DeptCard;
