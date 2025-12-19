"use client";

import Link from "next/link";
import Button from "@/components/ui/retro-btn";

export default function Comic404() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-yellow-100 font-sans px-6 overflow-hidden">
      <h1
        className="relative text-8xl md:text-9xl font-extrabold text-red-600 mb-4
             "
      >
        404
      </h1>

      <p className="text-lg text-gray-800 mb-6 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="bg-yellow-300 z-50">
        <Link href={"/"}> ← Back to Home</Link>
      </Button>
    </section>
  );
}
