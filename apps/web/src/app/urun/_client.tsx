"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, UploadCloud, Brain, GraduationCap, CheckCircle2, Coins, Search, Star } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, ease: "easeOut" } } as const;

export default function ProductClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="relative flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center">
          <Image src="/image/product_banner.png" alt="KARGANOT Ürün" fill priority sizes="100vw" className="object-cover -z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/50 dark:via-black/40 dark:to-black/60 -z-[1]" />
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">KARGANOT — Öğrenmeyi Yeniden Tanımlıyoruz</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="text-base md:text-lg text-white/90 max-w-3xl">Not paylaş, kazanç sağla, yapay zekâ destekli öğrenme dünyasına katıl.</motion.p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/kayit" aria-label="Kullanıcı Ol"><Button size="lg">Kullanıcı Ol</Button></Link>
            <a href="#features" aria-label="Detaylı İncele"><Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30">Detaylı İncele</Button></a>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20 space-y-20">
        {/* Features */}
        <section id="features" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl md:text-3xl font-bold mb-6 text-center">Ana Özellikler</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: UploadCloud, title: "Not Paylaşım Sistemi", desc: "Kendi notlarını yükle, diğer öğrencilerle paylaş, her indirmeden kazanç sağla." },
              { icon: Shield, title: "Güvenli Ödeme Altyapısı", desc: "iyzico destekli güvenli ödeme sistemiyle kazançlarını anında al." },
              { icon: Brain, title: "AI Öğrenme Önerileri", desc: "Yapay zekâ, ilgilendiğin derslere göre sana özel önerilerde bulunur." },
              { icon: GraduationCap, title: "208 Üniversite Uyumlu", desc: "Tüm fakülte, bölüm ve ders verileriyle tam entegre çalışma." },
            ].map((f) => (
              <Card key={f.title} className="rounded-2xl backdrop-blur-sm bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><f.icon className="w-5 h-5"/> {f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Interactive Showcase */}
        <section aria-labelledby="how-heading" className="space-y-6">
          <h2 id="how-heading" className="text-2xl md:text-3xl font-bold text-center">Sistem Nasıl Çalışıyor?</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: UploadCloud, title: "Notunu yükle", desc: "Ders notlarını birkaç adımda sisteme ekle." },
              { icon: CheckCircle2, title: "İncelenip onaylansın", desc: "Kalite kontrol sürecinden geçsin." },
              { icon: Search, title: "Öğrenciler keşfetsin", desc: "Arama ve öneriyle görünür olsun." },
              { icon: Coins, title: "Kazancını al", desc: "Her indirmeden payını anında kazan." },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm">
                <div className="flex items-center gap-3 mb-2"><s.icon className="w-5 h-5"/><span className="font-semibold">{s.title}</span></div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlight */}
        <section aria-labelledby="why-heading" className="relative overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="absolute inset-0 -z-[1] bg-gradient-to-r from-yellow-100 via-indigo-100 to-transparent dark:from-yellow-950/30 dark:via-indigo-950/30" />
          <h2 id="why-heading" className="text-2xl md:text-3xl font-bold mb-6 text-center">Neden KARGANOT?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Öğrenciden Öğrenciye Güven", desc: "Topluluk odaklı doğrulama ve puanlama sistemi." },
              { icon: Coins, title: "Şeffaf Komisyon Sistemi", desc: "Komisyon oranı ödeme adımında şeffaf biçimde gösterilir." },
              { icon: Star, title: "Kalite & Doğrulama Süreci", desc: "Özenli inceleme akışları ile yüksek kalite." },
            ].map((h) => (
              <div key={h.title} className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-2 mb-2"><h.icon className="w-5 h-5"/><span className="font-semibold">{h.title}</span></div>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg md:text-xl font-semibold">Her paylaşılan bilgi, bir öğrencinin geleceğini değiştirir.</p>
        </section>

        {/* Future Vision Banner */}
        <section aria-labelledby="future-heading" className="relative overflow-hidden rounded-2xl p-10 text-center">
          <div className="absolute inset-0 -z-[1] bg-gradient-to-b from-primary/10 to-transparent" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 -z-[1]">
            <div className="mx-auto h-24 w-[90%] opacity-40 blur-lg bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full" />
          </motion.div>
          <h2 id="future-heading" className="text-2xl md:text-3xl font-bold mb-4">KARGANOT sadece bir platform değil, geleceğin eğitim ağı.</h2>
          <Link href="/misyon" aria-label="Misyonumuzu Oku"><Button size="lg">Misyonumuzu Oku</Button></Link>
        </section>
      </div>

      {/* Dark mode fixed images */}
      <div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
        <Image src="/image/kargalar.png" alt="Dark mode karga" width={280} height={280} className="drop-shadow-lg w-[220px] md:w-[280px] h-auto" />
      </div>
      <div className="fixed bottom-6 left-6 z-[6] pointer-events-none select-none">
        <picture>
          <source srcSet="/images/karganot_logo.gif" type="image/gif" />
          <img src="/image/logo.png" alt="KARGANOT köşe logosu" className="w-[72px] md:w-[88px] h-auto" />
        </picture>
      </div>
    </div>
  );
}
