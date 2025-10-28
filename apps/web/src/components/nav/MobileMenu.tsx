// /components/nav/MobileMenu.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

type Item = { href: string; label: string; icon: string };

export default function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[61] shadow-2xl border-l border-black/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-black/5">
              <div className="font-semibold text-gray-900">Menü</div>
              <button
                onClick={onClose}
                aria-label="Kapat"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-all text-gray-700 font-medium"
                >
                  <Image
                    src={it.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="shrink-0"
                  />
                  <span className="text-sm">{it.label}</span>
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-black/5">
              <p className="text-xs text-gray-500 text-center">
                KARGANOT © 2025
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// KARGANOT Navbar Sheet & Icons Fix - by Onur & Copilot
