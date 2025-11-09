"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Shield } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
} as const;

export default function PricingClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden" aria-labelledby="pricing-hero">
        <div className="relative flex flex-col items-center justify-center py-20 md:py-28 px-6 text-center">
          <Image
            src="/image/pricing_banner.png"
            alt="KARGANOT Ücretlendirme"
            fill
            priority
            sizes="100vw"
            className="object-cover -z-[1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 dark:from-black/60 dark:via-black/50 dark:to-black/70 -z-[1]" />
          <motion.h1
            id="pricing-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Bilgini Paylaş, Daha Fazlasını Keşfet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base md:text-lg text-white/90 max-w-3xl mb-6"
          >
            KARGANOT'ta hem öğren, hem kazanç elde et — planını seç, hemen başla.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Link href="/register" aria-label="Hemen Katıl">
              <Button size="lg">Hemen Katıl</Button>
            </Link>
            <Link href="/sss" aria-label="Sık Sorulan Sorular">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30">
                Sık Sorulan Sorular
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20 space-y-16">
        {/* Pricing Plans */}
        <section aria-labelledby="plans-heading" className="space-y-8">
          <motion.h2
            {...fadeUp}
            id="plans-heading"
            className="text-2xl md:text-3xl font-bold text-center"
          >
            Planınızı Seçin
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <Card className="h-full rounded-2xl backdrop-blur-sm bg-white/70 dark:bg-white/5 border-white/40 dark:border-white/10 shadow-sm transition-all hover:shadow-lg hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Ücretsiz Başla
                  </CardTitle>
                  <p className="text-3xl font-bold mt-2 text-foreground">₺0 / ay</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {[
                      "Not görüntüleme limiti (ayda 10 içerik)",
                      "Sınırlı dosya indirme",
                      "Kısıtlı yapay zekâ desteği",
                      "Topluluk erişimi",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button variant="outline" className="w-full">
                      Ücretsiz Başla
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              {...stagger}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <Card className="h-full rounded-2xl backdrop-blur-sm bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-300/50 dark:border-yellow-700/50 shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02] hover:shadow-yellow-400/30 dark:hover:shadow-yellow-600/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#F5C94E]" />
                    <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-amber-400">
                      KARGANOT Premium
                    </span>
                  </CardTitle>
                  <p className="text-3xl font-bold mt-2 text-foreground">₺99 / ay</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tam erişim + sınırsız öğrenme + kazanç avantajları.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {[
                      "Sınırsız not görüntüleme ve indirme",
                      "Tüm AI asistan özellikleri açık",
                      "Özel içeriklere erken erişim",
                      "Öncelikli destek",
                      "Satış kazancı oranları ödeme ekranında şeffaf biçimde belirtilir",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-yellow-600 dark:text-yellow-400" />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button
                      className="w-full bg-[#F5C94E] text-black hover:bg-[#f0c13a] transition-all hover:shadow-lg hover:shadow-yellow-400/50 dark:hover:shadow-yellow-600/30"
                      size="lg"
                    >
                      Premium'a Geç
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Transparency Note */}
          <motion.p
            {...fadeUp}
            className="text-center text-sm italic text-muted-foreground max-w-3xl mx-auto mt-8"
          >
            KARGANOT, sürdürülebilirliği sağlamak ve öğrencilere daha kaliteli hizmet sunmak için her
            satıştan küçük bir pay alır. Kesin komisyon tutarı ödeme adımında açıkça gösterilir ve sadece
            altyapı ile güvenlik maliyetlerini karşılamak içindir.
          </motion.p>
        </section>

        {/* Payment Info */}
        <motion.section
          {...fadeUp}
          aria-labelledby="payment-heading"
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-muted/30 border border-border"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5 text-primary" />
            <div className="space-y-1">
              <h3 id="payment-heading" className="font-semibold">
                Güvenli Ödeme
              </h3>
              <p className="text-sm text-muted-foreground">
                Ödemeler iyzico güvencesiyle alınır. Tüm bilgiler SSL sertifikalı şekilde korunur.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section
          {...fadeUp}
          aria-labelledby="cta-heading"
          className="relative overflow-hidden rounded-2xl p-10 text-center bg-gradient-to-br from-[#1E1E1E] to-[#2C2C2C] text-white"
        >
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
            KARGANOT Premium ile bilgiye sınırsız erişimin keyfini çıkar.
          </h2>
          <Link href="/register" aria-label="Premium'a Katıl">
            <Button
              size="lg"
              className="bg-[#F5C94E] text-black hover:bg-[#f0c13a] transition-all hover:shadow-lg hover:shadow-yellow-400/50"
            >
              Premium'a Katıl
            </Button>
          </Link>
        </motion.section>
      </div>

      {/* Dark mode fixed images */}
      <div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
        <Image
          src="/image/kargalar.png"
          alt="Dark mode karga"
          width={280}
          height={280}
          className="drop-shadow-lg w-[220px] md:w-[280px] h-auto opacity-80"
        />
      </div>
      <div className="fixed bottom-6 left-6 z-[6] pointer-events-none select-none">
        <Image
          src="/image/logo.png"
          alt="KARGANOT köşe logosu"
          width={88}
          height={88}
          className="w-[72px] md:w-[88px] h-auto"
        />
      </div>
    </div>
  );
}
