// /components/nav/ProfileMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  BookOpen,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const profileItems = [
  { href: "/profil-detay", label: "Profilim", icon: User },
  { href: "/profil-detay?tab=notlar", label: "Notlarım", icon: BookOpen },
  { href: "/profil-detay?tab=kazanc", label: "Kazancım", icon: DollarSign },
  { href: "/profil-detay?tab=yorumlar", label: "Yorumlarım", icon: MessageSquare },
  { href: "/profil-detay?tab=ayarlar", label: "Ayarlar", icon: Settings },
];

export default function ProfileMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-4 py-2 text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          Üye Ol
        </button>

        {/* Login Modal - Placeholder */}
        {showLoginModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
              <p className="text-gray-600">Login modal buraya gelecek...</p>
              <button
                onClick={() => setShowLoginModal(false)}
                className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0).toUpperCase() || "K"}
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <p className="font-bold text-gray-900 text-sm">{user?.name || "Kullanıcı"}</p>
              <p className="text-xs text-gray-600">{user?.email || ""}</p>
            </div>
            <div className="py-2">
              {profileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  router.push("/");
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
