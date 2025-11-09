"use client";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto max-w-[1280px] px-6 py-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
