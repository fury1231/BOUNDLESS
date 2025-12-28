"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "relative h-12 w-40 overflow-hidden bg-transparent p-[1px]",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx} * 0.96)` }}
      >
        <MovingBorderAnimation duration={duration} rx={rx} ry={ry}>
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(var(--indigo-500)_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorderAnimation>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-zinc-950 text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${rx} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export function MovingBorderAnimation({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

// Pre-styled button variant
export function MovingBorderButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <MovingBorder
      containerClassName="h-14 w-auto px-0"
      className={cn(
        "px-8 font-medium bg-zinc-950 hover:bg-zinc-900 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </MovingBorder>
  );
}

// Card variant with moving border
export function MovingBorderCard({
  children,
  className,
  containerClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  [key: string]: unknown;
}) {
  return (
    <MovingBorder
      as="div"
      containerClassName={cn("h-auto w-full", containerClassName)}
      className={cn(
        "flex flex-col p-6 bg-zinc-950/50",
        className
      )}
      rx="1rem"
      ry="1rem"
      duration={3000}
      {...props}
    >
      {children}
    </MovingBorder>
  );
}
