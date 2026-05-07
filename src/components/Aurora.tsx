"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    color: "var(--orb-1)",
    size: 600,
    x: "10%",
    y: "15%",
    duration: 22,
    delay: 0,
  },
  {
    color: "var(--orb-2)",
    size: 500,
    x: "70%",
    y: "10%",
    duration: 26,
    delay: 2,
  },
  {
    color: "var(--orb-3)",
    size: 450,
    x: "50%",
    y: "60%",
    duration: 30,
    delay: 4,
  },
  {
    color: "var(--orb-4)",
    size: 380,
    x: "20%",
    y: "75%",
    duration: 24,
    delay: 6,
  },
];

export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -50, 20, 30, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
