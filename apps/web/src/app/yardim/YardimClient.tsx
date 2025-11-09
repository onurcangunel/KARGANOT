"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Mail } from "lucide-react";
import { useState } from "react";
import axios from "axios";

type SSSItem = { q: string; a: string };

export default function YardimClient({ items }: { items: SSSItem[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      setResults(null);
      const { data } = await axios.get("/api/v1/search", { params: { q: query, limit: 5 } });
      const list = data?.data?.results ?? [];
      setResults(list);
    } catch (err) {
      alert("Arama sırasında bir sorun oluştu");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { id: "hesap", title: "Hesap Oluşturma & Giriş", desc: "Kayıt, şifre sıfırlama, ve hesap doğrulama işlemleri." },
    { id: "not", title: "Not Yükleme ve Satış", desc: "Not nasıl yüklenir, nasıl fiyatlandırılır ve satıştan nasıl kazanç sağlanır?" },
    { id: "odeme", title: "Ödeme & Kazanç Çekimi", desc: "iyzico güvencesiyle kazancını kolayca çekmenin adımları." },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 text-center">
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Yardım Merkezi</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="text-base md:text-lg text-muted-foreground">Sorularını yanıtlayalım. KARGANOT ekibi her zaman yanında.</motion.p>

          <form onSubmit={handleSearch} className="mt-6 flex items-center justify-center gap-2 max-w-xl mx-auto">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Bir soru ara..." className="flex-1" />
            <Button type="submit" disabled={loading}>{loading ? "Aranıyor" : "Ara"}</Button>
          </form>

          {results && (
            <div className="mt-4 max-w-2xl mx-auto text-left text-sm">
              <p className="text-muted-foreground mb-2">Bulunan sonuçlar:</p>
              <ul className="space-y-2">
                {results.map((r, i) => (
                  <li key={i} className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10">
                    <div className="font-medium">{r.title || r.name || r.filename || "Sonuç"}</div>
                    {r.description && <div className="text-muted-foreground text-xs">{r.description}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="absolute inset-0 -z-10">
          <Image src="/image/help_banner.png" alt="Yardım Arka Plan" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/70 to-background/90" />
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20 space-y-16">
        {/* Quick Help Grid */}
        <section aria-labelledby="popular-help">
          <h2 id="popular-help" className="text-2xl md:text-3xl font-bold text-center mb-8">Popüler Yardım Konuları</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Link href={`#${c.id}`}>
                  <Card className="rounded-2xl border bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{c.desc}</CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator />

        {/* FAQ */}
        <section aria-labelledby="faq" className="max-w-3xl mx-auto">
          <h2 id="faq" className="text-2xl md:text-3xl font-bold text-center mb-8">Sık Sorulan Sorular</h2>
          <Accordion className="divide-y rounded-xl border">
            {(items || []).map((f, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger value={`faq-${idx}`}>{f.q}</AccordionTrigger>
                <AccordionContent value={`faq-${idx}`}>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Anchors for quick links */}
        <section id="hesap" aria-labelledby="hesap-title" className="max-w-3xl mx-auto">
          <h3 id="hesap-title" className="text-xl font-semibold mb-2">Hesap Oluşturma & Giriş</h3>
          <p className="text-sm text-muted-foreground">Kayıt, şifre sıfırlama, doğrulama için Profil ve Giriş sayfalarından adımları izleyebilirsin.</p>
        </section>
        <section id="not" aria-labelledby="not-title" className="max-w-3xl mx-auto">
          <h3 id="not-title" className="text-xl font-semibold mb-2">Not Yükleme ve Satış</h3>
          <p className="text-sm text-muted-foreground">Yükleme akışında not türünü, dersini seç ve fiyatlandır. Onay sonrası satışa açılır.</p>
        </section>
        <section id="odeme" aria-labelledby="odeme-title" className="max-w-3xl mx-auto">
          <h3 id="odeme-title" className="text-xl font-semibold mb-2">Ödeme & Kazanç Çekimi</h3>
          <p className="text-sm text-muted-foreground">iyzico entegrasyonuyla güvenli çekim sağlanır. Profil {'>'} Kazançlar bölümünden talep oluştur.</p>
        </section>

        <Separator />

        {/* Contact Support */}
        <section aria-labelledby="contact" className="text-center max-w-2xl mx-auto">
          <h2 id="contact" className="text-2xl md:text-3xl font-bold mb-3">Destek Ekibimizle İletişime Geç</h2>
          <p className="text-muted-foreground mb-6">Sorununu çözemediysen bizimle iletişime geç, 24 saat içinde dönüş yapıyoruz.</p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <a href="mailto:support@karganot.com" className="inline-flex items-center gap-2"><Mail className="w-4 h-4"/>E-posta Gönder</a>
            </Button>
            <Button variant="outline" disabled>Canlı Destek (Yakında)</Button>
          </div>
        </section>

        {/* CTA Banner */}
        <section aria-labelledby="cta" className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400 via-yellow-500 to-indigo-700" />
          <h2 id="cta" className="text-2xl md:text-3xl font-bold text-white mb-3">Her öğrencinin bir sorusu olabilir. Biz buradayız.</h2>
          <Link href="/sss"><Button size="lg" className="bg-white text-black hover:bg-white/90">Sık Sorulan Sorulara Git</Button></Link>
        </section>
      </div>

      {/* Dark mode fixed images */}
      <div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
        <Image src="/image/darkmode_karga.png" alt="Dark mode karga" width={260} height={260} className="drop-shadow-lg w-[200px] md:w-[260px] h-auto" />
      </div>
      <div className="fixed bottom-6 left-6 z-[6] pointer-events-none select-none">
        <picture>
          <source srcSet="/images/karganot_logo.gif" type="image/gif" />
          <img src="/image/logo.png" alt="KARGANOT köşe logosu" className="w-[64px] md:w-[80px] h-auto" />
        </picture>
      </div>
    </div>
  );
}
