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
}: { open: boolean; onClose: () => void; items: Item[] }) {
  // Arkada scroll'u kilitle
  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Karanlık arka plan */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
            onClick={onClose}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          />
          {/* Sheet (sağdan kayan panel) */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[61] shadow-2xl border-l border-black/10"
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <div className="font-semibold">Menü</div>
              <button 
                onClick={onClose} 
                aria-label="Kapat" 
                className="p-2 rounded hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Linkler */}
            <nav className="px-3 py-4 space-y-1">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition"
                >
                  <Image src={it.icon} alt="" width={20} height={20} />
                  <span className="text-sm">{it.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// KARGANOT Mobile Menu - by Onur & Copilot
