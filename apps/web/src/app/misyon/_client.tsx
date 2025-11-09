"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Users, Shield, Bot } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, ease: "easeOut" } } as const;

export default function MissionClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="relative flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center">
          <Image src="/image/mission_banner.png" alt="KARGANOT Mission" fill priority sizes="100vw" className="object-cover -z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/50 dark:via-black/40 dark:to-black/60 -z-[1]" />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">KARGANOT’un Misyonu</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="text-base md:text-lg text-white/90 max-w-3xl">Eğitimde adalet, paylaşımda kazanç — bilgi paylaştıkça çoğalır.</motion.p>
          <div className="mt-6 flex items-center gap-3">
            <Link href="/urun" aria-label="KARGANOT’u keşfet"><Button size="lg">Keşfet</Button></Link>
            <Link href="/kayit" aria-label="Hemen Başla"><Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30">Hemen Başla</Button></Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20 space-y-16">
        <section aria-labelledby="amac-heading" className="grid md:grid-cols-2 gap-8 md:gap-10">
          <motion.div {...fadeUp}>
            <h2 id="amac-heading" className="text-2xl md:text-3xl font-bold mb-4">Amacımız Öğrencinin Gücünü Ortaya Çıkarmak</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">KARGANOT, her öğrencinin potansiyeline erişebilmesi için kurulmuş bir platformdur. Bilgiyi paylaşmak, sadece bireysel bir fayda değil; aynı zamanda kolektif bir ilerlemedir.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="relative h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden">
            <Image src="/image/about_banner.png" alt="Öğrencinin Gücü" fill className="object-cover" />
          </motion.div>
        </section>

        <Separator />

        <section aria-labelledby="deger-heading">
          <h2 id="deger-heading" className="text-2xl md:text-3xl font-bold mb-6">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Adaletli Ekosistem", desc: "Her emeğin değeri vardır. KARGANOT, bilgi paylaşımını adil kazanç modeliyle destekler." },
              { icon: Users, title: "Topluluk Gücü", desc: "Bilgi, paylaşılınca büyür. Biz öğrenciler arasında dayanışmayı güçlendiriyoruz." },
              { icon: Bot, title: "Yenilik ve Teknoloji", desc: "Yapay zekâ destekli analizlerle her öğrencinin öğrenme yolculuğunu kişiselleştiriyoruz." },
            ].map((v) => (
              <Card key={v.title} className="rounded-2xl backdrop-blur-sm bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 shadow-sm transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><v.icon className="w-5 h-5"/> {v.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{v.desc}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="gelecek-heading">
          <h2 id="gelecek-heading" className="text-2xl md:text-3xl font-bold mb-4">Geleceğe Doğru</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">Amacımız sadece bir not paylaşım platformu olmak değil. KARGANOT, Türkiye’nin dijital öğrenme devriminde öğrencinin sesi olacak.</p>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            <div className="grid md:grid-cols-3 gap-6 relative">
              {[
                { year: "Bugün", text: "Not paylaşımı ve kazanç sistemi" },
                { year: "2026", text: "AI öğrenme asistanı ve sınav analizi" },
                { year: "2027", text: "Global öğrenci ağı (TR → EU)" },
              ].map((t, i) => (
                <div key={t.year} className="text-center">
                  <div className="mx-auto w-3 h-3 rounded-full bg-primary shadow" />
                  <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary">{t.year}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="birlikte-heading" className="text-center">
          <div>
            <h2 id="birlikte-heading" className="text-2xl md:text-3xl font-bold mb-4">Birlikte Daha Güçlüyüz</h2>
            <blockquote className="italic text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground">“Bir öğrencinin başarısı, binlercesine ilham olabilir. Biz, o ilhamın taşıyıcısıyız.”</blockquote>
            <div className="mt-6 flex justify-center">
              <Image src="/image/logo.png" alt="KARGANOT Crow" width={56} height={56} className="opacity-90 animate-pulse" />
            </div>
          </div>
        </section>
      </div>

      <div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
        <Image src="/image/kargalar.png" alt="Dark mode karga" width={280} height={280} className="drop-shadow-lg w-[220px] md:w-[280px] h-auto" />
      </div>
    </div>
  );
}
