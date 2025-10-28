// /components/nav/ProfileMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Outside click detection
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  // NOT AUTHENTICATED: Giriş Yap / Üye Ol
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => router.push("/login")}
          className="px-5 py-2 text-sm font-semibold text-orange-600 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-full hover:from-orange-600 hover:to-amber-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Üye Ol
        </button>
      </div>
    );
  }

  // AUTHENTICATED: Avatar + Dropdown
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 group"
        aria-label="Profil menüsü"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-200">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[70]"
          >
            {/* User Info Header */}
            <div className="px-4 py-3.5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm">
                    {user?.name || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user?.plan === "PREMIUM" ? (
                      <span className="text-orange-600 font-medium">Premium ✓</span>
                    ) : (
                      "Free Plan"
                    )}
                  </p>
                </div>
              </div>

              {/* Download Quota */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span>İndirilmiş Notlar</span>
                  <span className="font-semibold">2/3</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                    style={{ width: "66%" }}
                  />
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1.5">
              {[
                { label: "Profilim", href: "/profil-detay", icon: "👤" },
                { label: "Notlarım", href: "/notlarim", icon: "📄" },
                { label: "Kazançlarım", href: "/kazanclarim", icon: "💰" },
                { label: "Yorumlarım", href: "/yorumlarim", icon: "💬" },
                { label: "Ayarlar", href: "/ayarlar", icon: "⚙️" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150 flex items-center gap-3 font-medium"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 p-1.5">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 rounded-lg flex items-center gap-3 font-semibold"
              >
                <span className="text-base">🚪</span>
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// KARGANOT UI/UX Enhancement - by Onur & Copilot
