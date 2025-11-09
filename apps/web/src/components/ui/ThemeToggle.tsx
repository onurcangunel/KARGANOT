"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const current = resolvedTheme || theme || "light";
  const isDark = current === "dark";

  const label = useMemo(() => (isDark ? "Aydınlık moda geç" : "Karanlık moda geç"), [isDark]);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      aria-label={label}
      className="relative inline-flex items-center justify-center h-9 w-9 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -45, opacity: 0, y: -2 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        exit={{ rotate: 45, opacity: 0, y: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-base"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}
