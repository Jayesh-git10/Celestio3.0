"use client";

import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Smooth scroll removed as per user request for native scrolling
  return <>{children}</>;
}
