"use client";
import React from "react";
import { motion } from "framer-motion";
import ScaleIn from "@/components/ui/motion/ScaleIn";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function GlassCard({ children, className = "", hover = true, ...rest }: GlassCardProps) {
  return (
    <ScaleIn>
      <motion.div
        whileHover={hover ? { scale: 1.03, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.05)] ${className}`}
        {...rest}
      >
        {/* Gradient border hover effect */}
        {hover && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              padding: 1,
              background: "linear-gradient(135deg, #007aff, #00d4ff)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor" as any,
              maskComposite: "exclude" as any,
            }}
          />
        )}
        {children}
      </motion.div>
    </ScaleIn>
  );
}
