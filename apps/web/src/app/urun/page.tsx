import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProductClient from "./_client";

export const metadata: Metadata = buildMetadata({
  title: "Ürün | KARGANOT",
  description: "KARGANOT’un sunduğu akıllı özelliklerle öğrenmeyi yeniden keşfet.",
  slug: "/urun",
  image: "/image/logo.png",
});

export default function Page() {
  return <ProductClient />;
}
