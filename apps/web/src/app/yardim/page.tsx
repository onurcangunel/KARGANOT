import type { Metadata } from "next";
import sssData from "@/content/faq/sss.mdx";
import YardimClient from "./YardimClient";

export const metadata: Metadata = {
  title: "Yardım Merkezi | KARGANOT",
  description: "KARGANOT kullanımıyla ilgili tüm sorularına hızlıca yanıt bul.",
};

type SSSItem = { q: string; a: string };
type MDXFrontmatter = { readonly items?: SSSItem[] };
const frontmatter = (sssData as unknown as { readonly frontmatter?: MDXFrontmatter }).frontmatter || { items: [] };

export default function YardimPage() {
  return <YardimClient items={frontmatter.items || []} />
}
