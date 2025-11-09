"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
  <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-auto w-full max-w-[1200px] px-5 py-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
