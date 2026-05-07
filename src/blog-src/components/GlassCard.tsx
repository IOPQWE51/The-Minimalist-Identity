"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springTransition } from "@/lib/motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Extra column span for BentoGrid (1 = default) */
  span?: 1 | 2 | 3;
  /** Extra row span for BentoGrid (1 = default) */
  rowSpan?: 1 | 2;
  /** Disable hover glow effect */
  disableGlow?: boolean;
  /** onClick handler */
  onClick?: () => void;
  /** href to render as link */
  href?: string;
}

export function GlassCard({
  children,
  className,
  span = 1,
  rowSpan = 1,
  disableGlow = false,
  onClick,
  href,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const spanClasses = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  const rowSpanClasses = {
    1: "",
    2: "md:row-span-2",
  };

  const cardClassName = cn(
    "glass group relative overflow-hidden p-6 transition-colors duration-300",
    "hover:bg-glass-hover",
    (onClick || href) && "cursor-pointer",
    spanClasses[span],
    rowSpanClasses[rowSpan],
    className
  );

  const glowOverlay = !disableGlow ? (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
      style={{
        background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, var(--glow-color), transparent 40%)`,
      }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  ) : null;

  if (href) {
    return (
      <motion.a
        href={href}
        ref={cardRef as unknown as React.Ref<HTMLAnchorElement>}
        onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={springTransition}
        onClick={onClick}
        className={cardClassName}
        style={{
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        } as React.CSSProperties}
      >
        {glowOverlay}
        <div className="relative z-10">{children}</div>
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={springTransition}
      onClick={onClick}
      className={cardClassName}
      style={
        !disableGlow
          ? ({
              "--mouse-x": `${mousePos.x}%`,
              "--mouse-y": `${mousePos.y}%`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {glowOverlay}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
