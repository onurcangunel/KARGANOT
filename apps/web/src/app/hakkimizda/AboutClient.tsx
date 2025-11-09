"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { BookOpen, Users, Shield, Sparkles, TrendingUp, Bot, Coins, GraduationCap, ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function AboutClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4">
          {/* Background */}
          <Image
            src="/image/about_banner.png"
            alt="KARGANOT Hero Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 dark:opacity-50 -z-[1]"
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              KARGANOT — Bilgini Paylaş, Kazancını Artır
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Türkiye’nin ilk öğrenci odaklı bilgi paylaşım ve kazanç platformu.
            </p>
            <div className="flex items-center justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/urun" aria-label="KARGANOT ürünlerini keşfet">
                      <Button size="lg">Keşfet</Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Ürün ve özellikleri incele</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Link href="/kayit" aria-label="Hemen başla, ücretsiz kayıt ol">
                <Button variant="outline" size="lg" className="backdrop-blur-sm">
                  Hemen Başla
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 space-y-16 md:space-y-20">
        {/* Bölüm 1 — Hikaye */}
        <section aria-labelledby="hikaye-heading">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Sol: Metin */}
            <div>
              <h2 id="hikaye-heading" className="text-2xl md:text-3xl font-bold mb-4">
                KARGANOT’un Hikayesi
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                KARGANOT, öğrencilerin bilgi paylaşarak birbirine destek olduğu bir topluluktur. Amacımız, her öğrencinin
                emeğinin değer gördüğü adil bir ekosistem kurmak.
              </p>
              <Separator className="my-6" />
            </div>
            {/* Sağ: İstatistik Kartları */}
            {/* Metrik kartları geçici olarak kaldırıldı; ileride gerçek zamanlı istatistiklerle yeniden eklenecek */}
          </motion.div>
        </section>

        {/* Bölüm 2 — Neden KARGANOT? */}
        <section aria-labelledby="neden-heading">
          <h2 id="neden-heading" className="text-2xl md:text-3xl font-bold mb-6">Neden KARGANOT?</h2>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 gap-4 md:gap-6"
          >
            {[ 
              { icon: Users, title: "%100 öğrenci merkezli yapı", desc: "Kararlarımızı ve akışlarımızı öğrencilerin yararı belirler." },
              { icon: Coins, title: "Adil ve şeffaf kazanç", desc: "Komisyon oranları ödeme adımında açıkça gösterilir." },
              { icon: Bot, title: "Yapay zekâ destekli arama/öneri", desc: "Doğru kaynağa hızlı erişim için akıllı eşleştirme." },
              { icon: GraduationCap, title: "Geniş üniversite uyumluluğu", desc: "Program, fakülte ve ders ağacı ile kapsamlı uyum." },
            ].map((f, i) => (
              <motion.li key={i} variants={item}>
                <Card className="rounded-2xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.01]">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="shrink-0 rounded-xl bg-primary/10 text-primary p-2">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge>{f.title}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* Bölüm 3 — Vizyonumuz */}
        <section aria-labelledby="vizyon-heading">
          <motion.div {...fadeUp}>
            <h2 id="vizyon-heading" className="text-2xl md:text-3xl font-bold mb-4">Vizyonumuz</h2>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">
              Türkiye’de bilgi paylaşımını dijitalleştirip, öğrenciler arası destek kültürünü güçlendirmek.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Card className="rounded-2xl">
                <CardContent className="p-5 text-sm text-muted-foreground">
                  • Not paylaşım → Ödeme → Doğrulama → Öneri
                  <br/>• Kampüs elçileri → Topluluk etkinlikleri
                  <br/>• AI destekli kişisel öğrenme planları
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Bölüm 4 — Gelecek Hedefimiz */}
        <section aria-labelledby="gelecek-heading">
          <h2 id="gelecek-heading" className="text-2xl md:text-3xl font-bold mb-6">Gelecek Hedefimiz</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Akademik Kaynaklar", icon: BookOpen, desc: "Ders özeti, flashcard, video özetleriyle zengin içerik.", href: "#" },
              { title: "Ödev/Yardım Pazarı", icon: Users, desc: "Etik kurallarla 1-1 destek ve mentorluk.", href: "#" },
              { title: "AI Öğrenme Asistanı", icon: Sparkles, desc: "Zayıf konu önerileri, quiz üretimi ve kişisel planlar.", href: "#" },
            ].map((g) => (
              <Card key={g.title} className="rounded-2xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <g.icon className="w-5 h-5" /> {g.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-4">{g.desc}</p>
                  <Link href={g.href} className="inline-flex items-center text-primary hover:underline text-sm" aria-label={`${g.title} hakkında daha fazla`}>Daha Fazla <ArrowRight className="w-4 h-4 ml-1"/></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Dark Mode Özel görsel (sağ-alt) */}
      <div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
        {/* Öncelik: /images/darkmode_karga.png; yoksa /image/kargalar.png fallback */}
        <picture>
          <source srcSet="/images/darkmode_karga.png" type="image/png" />
          <img src="/image/kargalar.png" alt="KARGANOT dark mode karga" className="drop-shadow-lg w-[220px] md:w-[280px] h-auto" />
        </picture>
      </div>

      {/* Sol-alt köşe logo gif */}
      <div className="fixed bottom-6 left-6 z-[6] pointer-events-none select-none">
        {/* Eğer gif yoksa CornerGif bileşenindeki fallback otomatik devreye girer. */}
        <picture>
          <source srcSet="/images/karganot_logo.gif" type="image/gif" />
          <img src="/image/logo.png" alt="KARGANOT köşe logosu" className="w-[72px] md:w-[88px] h-auto" />
        </picture>
      </div>
    </div>
  );
}
