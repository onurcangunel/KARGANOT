// KARGANOT Modular Layout - by Onur & Copilot
'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Pattern - Enhanced */}
      <div
        className="fixed inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: 'url(/image/kargalar.png)' }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Back Button (if not on home page) */}
      {pathname !== '/' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Geri Dön</span>
          </button>
        </div>
      )}

      {/* Main Content with Fade Animation */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
