// /components/nav/NavbarItem.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface NavbarItemProps {
  href: string;
  label: string;
  icon: string;
  isActive: boolean;
}

export default function NavbarItem({ href, label, icon, isActive }: NavbarItemProps) {
  return (
    <li className="relative">
      <Link
        href={href}
        className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium
          ${isActive ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-600"}`}
        prefetch
      >
        <Image
          src={icon}
          alt=""
          width={20}
          height={20}
          className="shrink-0 transition-transform group-hover:scale-110"
        />
        <span>{label}</span>
      </Link>
      {isActive && (
        <motion.span
          layoutId="activeTab"
          className="absolute left-2 right-2 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </li>
  );
}

// KARGANOT Navbar UX Pass - by Onur & Copilot
