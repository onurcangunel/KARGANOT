"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type SlideUpProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  offset?: number;
  className?: string;
};

export default function SlideUp({
  children,
  duration = 0.45,
  delay = 0,
  offset = 20,
  className,
}: SlideUpProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: offset / 2 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
