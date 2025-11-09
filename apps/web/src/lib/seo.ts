import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export type SeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  slug?: string; // for canonical
  image?: string; // path relative to public
};

export function buildMetadata({ title, description, keywords = [], slug = '', image = '/image/logo.png' }: SeoInput): Metadata {
  const canonical = slug.startsWith('http') ? slug : `${siteUrl}${slug ? (slug.startsWith('/') ? slug : `/${slug}`) : ''}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'KARGANOT',
      images: [{ url: image.startsWith('http') ? image : `${siteUrl}${image}`, width: 1200, height: 630 }],
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${siteUrl}${image}`],
    },
  };
}
