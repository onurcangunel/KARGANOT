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

  // Outside click detection - close dropdown
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

  // Logout handler
  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  // NOT AUTHENTICATED: Show login/register buttons
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-orange-50"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-4 py-1.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors rounded-lg shadow-sm"
        >
          Üye Ol
        </button>
      </div>
    );
  }

  // AUTHENTICATED: Show avatar + dropdown menu
  return (
    <div className="relative" ref={ref}>
      {/* Avatar button - triggers dropdown */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Profil menüsü"
      >
        {/* Avatar circle with first letter */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* Dropdown arrow icon */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
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

      {/* Dropdown menu with AnimatePresence */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-black/5 overflow-hidden z-[70]"
          >
            {/* User info section */}
            <div className="px-4 py-3 border-b border-black/5 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-3">
                {/* Avatar (larger in dropdown) */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* User name and plan */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user?.name || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user?.plan === "PREMIUM" ? (
                      <span className="text-orange-600 font-medium">
                        Premium ✓
                      </span>
                    ) : (
                      "Free"
                    )}
                  </p>
                </div>
              </div>

              {/* Download quota (mock data) */}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>İndirilmiş Notlar</span>
                  <span className="font-medium">2/3</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                    style={{ width: "66%" }}
                  />
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <button
                onClick={() => {
                  router.push("/profil-detay");
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profilim
              </button>

              <button
                onClick={() => {
                  router.push("/notlarim");
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Notlarım
              </button>

              <button
                onClick={() => {
                  router.push("/kazanclarim");
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Kazançlarım
              </button>

              <button
                onClick={() => {
                  router.push("/yorumlarim");
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Yorumlarım
              </button>

              <button
                onClick={() => {
                  router.push("/ayarlar");
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m5.196-15.196l-4.242 4.242m0 5.908l4.242 4.242M23 12h-6m-6 0H5m15.196 5.196l-4.242-4.242m-5.908 0l-4.242 4.242" />
                </svg>
                Ayarlar
              </button>
            </div>

            {/* Logout button */}
            <div className="border-t border-black/5 p-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg flex items-center gap-3 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// KARGANOT Navbar Sheet & Icons Fix - by Onur & Copilot
