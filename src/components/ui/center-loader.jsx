import React from "react";

export const RoundedRedLoader = ({ size = "h-12 w-12", className = "" }) => {
  return (
    <div
      className={`rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin ${size} ${className}`}
      aria-label="Loading"
    />
  );
};

const CenterLoader = ({
  fullScreen = false,
  containerClassName = "",
  size = "h-12 w-12",
  className = "",
}) => {
  return (
    <div
      className={`${fullScreen ? "min-h-screen" : "w-full"} flex items-center justify-center ${containerClassName}`}
    >
      <RoundedRedLoader size={size} className={className} />
    </div>
  );
};

export default CenterLoader;