import React from 'react';
import { redirect } from 'next/navigation';

type Params = { slug: string };

// Mevcut MDX içeriklerini slug -> import eşlemesi ile bağlıyoruz
const mdxMap: Record<string, () => Promise<{ default: React.ComponentType<any>; frontmatter?: any }>> = {
  'hakkimizda': () => import('../../../../content/kurumsal/hakkimizda.mdx'),
  'misyon': () => import('../../../../content/kurumsal/misyon.mdx'),
  'urun': () => import('../../../../content/kurumsal/urun.mdx'),
  'nasil-calisir': () => import('../../../../content/kurumsal/nasil-calisir.mdx'),
  'ucretlendirme': () => import('../../../../content/kurumsal/ucretlendirme.mdx'),
};

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(mdxMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const loader = mdxMap[params.slug];
  if (!loader) return { title: 'Sayfa bulunamadı | KARGANOT' };
  try {
    const mod = await loader();
    const fm = (mod as any).frontmatter || {};
    const title = fm.title ? `${fm.title} | KARGANOT` : `KARGANOT`; 
    const description = fm.description || 'KARGANOT kurumsal içerik';
    return {
      title,
      description,
      keywords: Array.isArray(fm.keywords) ? fm.keywords : ['karganot', 'kurumsal'],
      openGraph: {
        title,
        description,
      },
    };
  } catch {
    return { title: 'KARGANOT' };
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  // /kurumsal/[slug] -> /[slug]
  redirect(`/${params.slug}`);
}
