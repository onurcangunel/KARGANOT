import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PricingClient from "./_client";

export const metadata: Metadata = buildMetadata({
  title: "Ücretlendirme | KARGANOT",
  description: "Ücretsiz veya Premium planla KARGANOT'un tüm avantajlarını keşfet.",
  slug: "/ucretlendirme",
  image: "/image/pricing_banner.png",
});

export default function Page() {
  return <PricingClient />;
}
