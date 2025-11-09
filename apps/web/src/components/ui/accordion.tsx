"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = React.PropsWithChildren<{
  className?: string;
}>;

type ItemProps = React.PropsWithChildren<{
  value: string;
  className?: string;
}>;

const AccordionContext = React.createContext<{
  openItems: Record<string, boolean>;
  toggle: (key: string) => void;
} | null>(null);

export function Accordion({ children, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpenItems((s) => ({ ...s, [key]: !s[key] }));
  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className }: ItemProps) {
  return (
    <div data-value={value} className={"border-b last:border-b-0 " + (className || "")}>{children}</div>
  );
}

export function AccordionTrigger({ children, value }: React.PropsWithChildren<{ value: string }>) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) return null;
  const isOpen = !!ctx.openItems[value];
  return (
    <button
      type="button"
      onClick={() => ctx.toggle(value)}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-primary transition-colors"
    >
      <span>{children}</span>
      <motion.span
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        className="inline-block select-none"
      >
        ▾
      </motion.span>
    </button>
  );
}

export function AccordionContent({ children, value }: React.PropsWithChildren<{ value: string }>) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) return null;
  const isOpen = !!ctx.openItems[value];
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden pb-4 text-muted-foreground"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Accordion;
