'use client'

import { useState, useEffect, ReactNode } from "react";

export default function Splashscreen({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen bg-black transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-white text-4xl animate-pulse">Project Clover</h1>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">{children}</div>
  );
}
