"use client";
import React from 'react';
import { useTheme } from 'next-themes';

export default function DarkModeBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted || resolvedTheme !== 'dark') return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1]">
      {/* Glow/Fener etkisi */}
      <div className="absolute right-4 bottom-4 w-[520px] h-[520px] max-w-[45vw] max-h-[45vw] translate-x-6 translate-y-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,140,66,0.15),rgba(0,0,0,0)_60%)] blur-2xl" />
      {/* Karga görseli */}
      <img
        src="/darkmode_karga.png"
        alt="KARGANOT Karanlık Mod Arka Plan"
        className="absolute bottom-3 right-3 w-[460px] max-w-[50vw] sm:w-[420px] md:w-[460px] xl:w-[500px] select-none opacity-95"
        style={{ imageRendering: 'auto' }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.src.endsWith('/darkmode_karga.png')) {
            img.src = '/icons/crow.svg';
          }
        }}
      />
    </div>
  );
}
