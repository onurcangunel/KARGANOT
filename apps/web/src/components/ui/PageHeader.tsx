"use client";
import React from "react";
import SlideUp from "@/components/ui/motion/SlideUp";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function PageHeader({ title, description, icon, className }: PageHeaderProps) {
  return (
    <header className={`w-full mb-8 ${className ?? ""}`}>
      <SlideUp>
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1">{icon}</div>}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>}
          </div>
        </div>
      </SlideUp>
    </header>
  );
}
