"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type ScaleInProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  from?: number;
  className?: string;
};

export default function ScaleIn({
  children,
  duration = 0.35,
  delay = 0,
  from = 0.98,
  className,
}: ScaleInProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: from }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
