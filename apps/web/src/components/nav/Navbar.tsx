// /components/nav/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarItem from "./NavbarItem";
import ProfileMenu from "./ProfileMenu";

const items = [
  { href: "/",                label: "Ana Sayfa",  icon: "/images/navbar/home.png",    match: /^\/$/ },
  { href: "/belgeler",        label: "Belgeler",   icon: "/images/navbar/docs.png",    match: /^\/belgeler(?!\/yukle)/ },
  { href: "/belgeler/yukle",  label: "Not Yükle",  icon: "/images/navbar/upload.png", match: /^\/belgeler\/yukle/ },
  { href: "/pricing",         label: "Premium",    icon: "/images/navbar/premium.png", match: /^\/pricing/ },
  { href: "/profil-detay",    label: "Profil",     icon: "/images/navbar/profile.png", match: /^\/profil/ },
  { href: "/hakkimizda",      label: "Hakkımızda", icon: "/images/navbar/info.png",    match: /^\/hakkimizda/ },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5">
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Sol: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/image/logo.png" 
            alt="KARGANOT" 
            width={40} 
            height={40} 
            priority 
            className="transition-transform hover:scale-110" 
          />
          <span className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors hidden sm:block">
            KARGANOT
          </span>
        </Link>

        {/* Orta: Desktop Menü */}
        <ul className="hidden md:flex items-center gap-2 relative">
          {items.map((it) => {
            const active = it.match.test(pathname);
            return (
              <NavbarItem
                key={it.href}
                href={it.href}
                label={it.label}
                icon={it.icon}
                isActive={active}
              />
            );
          })}
        </ul>

        {/* Sağ: Profil/Giriş + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <ProfileMenu />
          
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menü */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <ul className="py-2 px-4 space-y-1">
              {items.map((it) => {
                const active = it.match.test(pathname);
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                        ${active ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <Image src={it.icon} alt="" width={20} height={20} className="shrink-0" />
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// KARGANOT Navbar UX Pass - by Onur & Copilot

