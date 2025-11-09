import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import MissionClient from "./_client";

export const metadata: Metadata = buildMetadata({
  title: "Misyon | KARGANOT",
  description: "Eğitimde adalet, paylaşımda kazanç — KARGANOT’un vizyonu.",
  slug: "/misyon",
  image: "/image/logo.png",
});

export default function Page() {
  return <MissionClient />;
}
