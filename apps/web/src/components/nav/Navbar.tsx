// /components/nav/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";

const items = [
  {
    href: "/",
    label: "Ana Sayfa",
    icon: "/images/navbar/home.png",
    match: /^\/$/,
  },
  {
    href: "/belgeler",
    label: "Belgeler",
    icon: "/images/navbar/docs.png",
    match: /^\/belgeler(\/|$)/,
  },
  {
    href: "/belgeler/yukle",
    label: "Not Yükle",
    icon: "/images/navbar/upload.png",
    match: /^\/belgeler\/yukle/,
  },
  {
    href: "/pricing",
    label: "Premium",
    icon: "/images/navbar/premium.png",
    match: /^\/pricing/,
  },
  {
    href: "/profil-detay",
    label: "Profil",
    icon: "/images/navbar/profile.png",
    match: /^\/profil/,
  },
  {
    href: "/hakkimizda",
    label: "Hakkımızda",
    icon: "/images/navbar/info.png",
    match: /^\/hakkimizda/,
  },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5 shadow-sm">
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Sol: Logo + KARGANOT text */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/image/logo.png"
            alt="KARGANOT Logo"
            width={44}
            height={44}
            priority
            className="transition-transform hover:scale-105 duration-200"
          />
          <span className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-200 hidden sm:block">
            KARGANOT
          </span>
        </Link>

        {/* Orta: Desktop menü (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-1 relative">
          {items.map((it) => {
            const active = it.match.test(pathname);
            return (
              <li key={it.href} className="relative">
                <Link
                  href={it.href}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all duration-200
                    ${
                      active
                        ? "text-orange-600 font-semibold bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                    }`}
                  prefetch
                >
                  <Image
                    src={it.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="shrink-0 transition-transform group-hover:scale-110 duration-200 translate-y-[1px]"
                  />
                  <span className="text-sm font-medium">{it.label}</span>
                </Link>

                {/* Active indicator - orange gradient underline */}
                {active && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute left-2 right-2 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400 shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Sağ: Profil/Giriş + Mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop: ProfileMenu veya Giriş/Üye Ol */}
          <div className="hidden md:block">
            <ProfileMenu />
          </div>

          {/* Mobile: Hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileOpen(true)}
            aria-label="Menüyü aç"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile sheet menu (sağdan açılır) */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items.map(({ href, label, icon }) => ({ href, label, icon }))}
      />
    </header>
  );
}

// KARGANOT UI/UX Enhancement - by Onur & Copilot
