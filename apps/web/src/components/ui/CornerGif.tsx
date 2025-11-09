"use client";
import React from 'react';

export default function CornerGif() {
  return (
    <div aria-hidden className="pointer-events-none fixed left-3 bottom-3 z-[1]">
      {/* GIF varsa göster, yoksa MP4/gif fallback */}
      <picture>
        <source srcSet="/videos/hero-bg.gif" type="image/gif" />
        {/* Son çare olarak statik logo */}
        <img
          src="/image/logo.png"
          alt="KARGANOT Köşe Logosu"
          className="w-12 h-12 md:w-[50px] md:h-[50px] opacity-90 dark:opacity-95"
        />
      </picture>
    </div>
  );
}
