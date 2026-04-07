"use client";

import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Smooth scroll completely removed to use standard native browser scrolling
  return <div className="relative w-full">{children}</div>;
}
