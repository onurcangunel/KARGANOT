"use client";
import React from "react";
import Link from "next/link";
import { Menu, UploadCloud, User, Info, HelpCircle, Package, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/motion/FadeIn";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <FadeIn duration={0.3}>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 shadow-sm border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between glass rounded-full mt-2 subtle-border">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/image/logo.png" alt="KARGANOT" width={48} height={48} className="rounded-md drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">KARGANOT</span>
          </Link>

          <div className="hidden md:flex items-center gap-3 text-sm relative">
            <Link href="/" className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition">
              Ana Sayfa
            </Link>
            <Link href="/urun" className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-1.5">
              <Package size={16} /> Ürün
            </Link>
            <Link href="/universiteler" className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition">
              Üniversiteler
            </Link>
            <div className="relative">
              <button
                className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg:white/5 transition flex items-center gap-1.5"
                onClick={() => setMoreOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              >
                Keşfet <ChevronDown size={14} />
              </button>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.6 }}
                  className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 w-64 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl p-2"
                >
                  <div className="flex flex-col">
                    <Link href="/nasil-calisir" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">Nasıl Çalışır</Link>
                    <Link href="/ucretlendirme" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">Ücretlendirme</Link>
                    <Link href="/sss" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"><HelpCircle size={16} /> SSS</Link>
                    <Link href="/hakkimizda" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"><Info size={16} /> Hakkımızda</Link>
                  </div>
                </motion.div>
              )}
            </div>
            <Link href="/login" className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition">
              Giriş
            </Link>

            <Link
              href="/register"
              className="ml-2 btn-premium flex items-center gap-2 active:scale-[0.97]"
            >
              <UploadCloud size={18} className="text-black" />
              <span>Hemen Başla</span>
            </Link>
            <ThemeToggle />
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile Sheet */}
      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-2xl p-4 shadow-2xl"
          >
            <div className="grid gap-2">
              <Link
                href="/"
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/urun"
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Package size={18} /> Ürün
              </Link>
              <details className="px-2">
                <summary className="list-none cursor-pointer px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">Keşfet</span>
                </summary>
                <div className="mt-2 grid gap-2">
                  <Link href="/nasil-calisir" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10" onClick={() => setOpen(false)}>Nasıl Çalışır</Link>
                  <Link href="/ucretlendirme" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10" onClick={() => setOpen(false)}>Ücretlendirme</Link>
                  <Link href="/sss" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2" onClick={() => setOpen(false)}>
                    <HelpCircle size={18} /> SSS
                  </Link>
                  <Link href="/hakkimizda" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2" onClick={() => setOpen(false)}>
                    <Info size={18} /> Hakkımızda
                  </Link>
                </div>
              </details>
              <Link
                href="/universiteler"
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                Üniversiteler
              </Link>
              {/* Daha fazla bağlantı mobile’da Keşfet içinde toplandı */}
              <Link
                href="/login"
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Giriş
              </Link>
              <Link
                href="/register"
                className="px-4 py-3 rounded-full btn-premium flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <UploadCloud size={18} className="text-black" /> Hemen Başla
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </FadeIn>
  );
}
