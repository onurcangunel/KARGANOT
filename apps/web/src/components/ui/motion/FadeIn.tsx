"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type FadeInProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
};

export default function FadeIn({
  children,
  duration = 0.4,
  delay = 0,
  className,
}: FadeInProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
