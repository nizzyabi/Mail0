"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";

export interface ConnectIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const plugVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -3,
    y: 3,
  },
};

const socketVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 3,
    y: -3,
  },
};

const pathVariants = {
  normal: (custom: { x: number; y: number }) => ({
    d: `M${custom.x} ${custom.y} l2.5 -2.5`,
  }),
  animate: (custom: { x: number; y: number }) => ({
    d: `M${custom.x + 2.93} ${custom.y - 2.93} l0.10 -0.10`,
  }),
};

const ConnectIcon = forwardRef<ConnectIconHandle, HTMLAttributes<HTMLDivElement>>(
  ({ onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className="flex cursor-pointer select-none items-center justify-center rounded-md p-2 transition-colors duration-200 hover:bg-accent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M19 5l3 -3"
            variants={{
              normal: {
                d: "M19 5l3 -3",
              },
              animate: {
                d: "M17 7l5 -5",
              },
            }}
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.path
            d="m2 22 3-3"
            variants={{
              normal: {
                d: "m2 22 3-3",
              },
              animate: {
                d: "m2 22 6-6",
              },
            }}
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.path
            d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
            variants={socketVariants}
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.path
            variants={pathVariants}
            custom={{ x: 7.5, y: 13.5 }}
            initial="normal"
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.path
            variants={pathVariants}
            custom={{ x: 10.5, y: 16.5 }}
            initial="normal"
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.path
            d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
            variants={plugVariants}
            animate={controls}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </svg>
      </div>
    );
  },
);

ConnectIcon.displayName = "ConnectIcon";

export { ConnectIcon };
