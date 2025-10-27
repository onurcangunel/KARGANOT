// /components/nav/ProfileMenu.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.push('/login')}
          className="text-sm px-3 py-1.5 rounded-lg border hover:border-orange-400 hover:text-orange-600 transition"
        >
          Giriş Yap
        </button>
        <button 
          onClick={() => router.push('/register')}
          className="text-sm px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Üye Ol
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-orange-50 transition"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0).toUpperCase() || 'K'}
        </div>
        <span className="hidden sm:inline text-sm font-medium">Hesabım</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-black/5 overflow-hidden z-50"
            role="menu"
          >
            {/* mini özet */}
            <div className="px-4 py-3 border-b border-black/5">
              <p className="text-sm font-semibold">{user?.name || 'Kullanıcı'}</p>
              <p className="text-xs text-gray-500">
                {user?.plan === 'PREMIUM' ? 'Premium ✓' : 'Free'} • İndirme: 2/3
              </p>
            </div>

            {/* menü */}
            <div className="py-1">
              {[
                { href: "/profil-detay", label: "Profilim" },
                { href: "/profil-detay?tab=notlar", label: "Notlarım" },
                { href: "/profil-detay?tab=kazanc", label: "Kazançlarım" },
                { href: "/profil-detay?tab=yorumlar", label: "Yorumlarım" },
                { href: "/settings", label: "Ayarlar" },
              ].map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="block px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-700 transition"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {m.label}
                </Link>
              ))}
              <button
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                role="menuitem"
                onClick={() => {
                  logout();
                  setOpen(false);
                  router.push('/');
                }}
              >
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// KARGANOT Navbar UX Pass - by Onur & Copilot
