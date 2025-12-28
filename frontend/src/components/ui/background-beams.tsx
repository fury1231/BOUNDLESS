"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (beamsRef.current) {
          const rect = beamsRef.current.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <div
        ref={beamsRef}
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />

        {/* SVG Beams */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Beam paths */}
          {[...Array(12)].map((_, i) => {
            const startX = (i * 150) % 1920;
            const controlX1 = startX + 200 + (mousePosition.x * 0.02);
            const controlY1 = 200 + (mousePosition.y * 0.01);
            const endX = startX + 400;

            return (
              <g key={i}>
                <path
                  d={`M ${startX} 0 Q ${controlX1} ${controlY1} ${endX} 100%`}
                  fill="none"
                  stroke={`url(#beam-gradient-${(i % 3) + 1})`}
                  strokeWidth="1.5"
                  className="animate-beam"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.3,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Animated rays */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full animate-beam-horizontal"
              style={{
                top: `${10 + i * 12}%`,
                background: `linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, ${0.1 + i * 0.02}) 50%, transparent 100%)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i}s`,
              }}
            />
          ))}
        </div>

        {/* Vertical beams */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full animate-beam-vertical"
              style={{
                left: `${15 + i * 15}%`,
                background: `linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, ${0.08 + i * 0.02}) 50%, transparent 100%)`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${10 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs at intersections */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-500/30 blur-sm animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
