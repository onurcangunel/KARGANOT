"use client";
import Link from "next/link";
import React from "react";
import { Info, Briefcase, Newspaper, Mail, Search, BookOpen, UploadCloud, HelpCircle, Shield, Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f9f9f9] text-sm text-gray-600 py-10 border-t shadow-[0_-1px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Hakkımızda</h3>
            <ul className="space-y-1.5">
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/hakkimizda"><Info size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Hakkımızda</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/kariyer"><Briefcase size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Kariyer</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/basin"><Newspaper size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Basın</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/iletisim"><Mail size={14} className="text-gray-400 group-hover:text-[#007aff]"/> İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Üniversiteler</h3>
            <ul className="space-y-1.5">
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/search"><Search size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Arama</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/belgeler"><BookOpen size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Ders Notları</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/belgeler/yukle"><UploadCloud size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Not Yükle</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Yardım</h3>
            <ul className="space-y-1.5">
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/sss"><HelpCircle size={14} className="text-gray-400 group-hover:text-[#007aff]"/> SSS</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/yardim"><HelpCircle size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Yardım Merkezi</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/iletisim"><Mail size={14} className="text-gray-400 group-hover:text-[#007aff]"/> İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Yasal</h3>
            <ul className="space-y-1.5">
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/gizlilik"><Shield size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Gizlilik</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/kullanim"><BookOpen size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Kullanım Şartları</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/telif"><Scale size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Telif</Link></li>
              <li><Link className="group inline-flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-0.5" href="/yasal"><Scale size={14} className="text-gray-400 group-hover:text-[#007aff]"/> Yasal Bilgilendirme</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <div className="opacity-80">
              <Link href="/gizlilik" className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs text-gray-600 bg-white hover:text-[#007aff]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z"></path></svg>
                Veri Güvenliği & Gizlilik
              </Link>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">© 2025 KARGANOT — Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
