"use client";;
import React from "react";
import { cva } from "class-variance-authority";
import { RoundedRedLoader } from "@/components/ui/center-loader";

// A simple, typed utility for conditional class names.
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// --- Button Variants Definition ---
const buttonVariants = cva(// Base styles for all buttons.
"transition-all outline-none cursor-pointer duration-200 font-medium flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60", {
  variants: {
    variant: {
      // Default button with a hard shadow effect
      default:
        "bg-[#00ff84] text-[#000000] border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000] dark:bg-[#00ff84] dark:text-[#000000] dark:border-[#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]",
      // A dark gray secondary button
      secondary:
        "bg-[#374151] text-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000] dark:bg-[#374151] dark:text-[#ffffff] dark:border-[#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]",
      // An outline button that fills with the custom color on hover
      outline:
        "bg-transparent text-black border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-[#00ff84] hover:text-[#000000] disabled:hover:bg-transparent disabled:hover:text-[#00ff84] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#000000] dark:bg-transparent dark:text-[#00ff84] dark:border-[#00ff84] dark:shadow-[4px_4px_0px_0px_#ffffff] dark:hover:bg-[#00ff84] dark:hover:text-[#000000]",
      // A simple link-style button
      link: "bg-transparent text-[#00ff84] hover:underline dark:text-[#00ff84]",
    },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3 text-xl",
      icon: "h-12 w-12", // Made icon button a bit larger for better visuals
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// --- Loading Spinner Component ---
const Spinner = () => <RoundedRedLoader size="h-5 w-5" className="border-red-500/35 border-t-red-500" />;

// --- Button Component Implementation ---
const Button = React.forwardRef(
  ({ className, variant, size, children, loading = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}>
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
