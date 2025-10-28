// /components/nav/MobileMenu.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

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
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [open]);

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Sheet Panel */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[61] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="font-bold text-lg text-gray-900">Menü</div>
              <button
                onClick={onClose}
                aria-label="Kapat"
                className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
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

            {/* User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name || "Kullanıcı"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.plan === "PREMIUM" ? (
                        <span className="text-orange-600 font-medium">Premium ✓</span>
                      ) : (
                        "Free Plan"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="px-3 py-4 space-y-1">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 text-gray-700 font-medium group"
                >
                  <Image
                    src={it.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="shrink-0 transition-transform group-hover:scale-110 duration-200"
                  />
                  <span className="text-sm">{it.label}</span>
                </Link>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
              {isAuthenticated ? (
                <div className="p-3 space-y-2">
                  <button
                    onClick={() => {
                      router.push("/profil-detay");
                      onClose();
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 rounded-xl flex items-center gap-3 font-medium"
                  >
                    <span className="text-base">��</span>
                    Profilim
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-xl flex items-center gap-3 font-semibold"
                  >
                    <span className="text-base">🚪</span>
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  <button
                    onClick={() => {
                      router.push("/login");
                      onClose();
                    }}
                    className="w-full px-4 py-3 text-sm font-semibold text-orange-600 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => {
                      router.push("/register");
                      onClose();
                    }}
                    className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-full hover:from-orange-600 hover:to-amber-500 transition-all duration-200 shadow-md"
                  >
                    Üye Ol
                  </button>
                </div>
              )}
              
              <div className="px-5 py-3 bg-gray-50">
                <p className="text-xs text-gray-500 text-center font-medium">
                  © 2025 KARGANOT
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// KARGANOT UI/UX Enhancement - by Onur & Copilot
