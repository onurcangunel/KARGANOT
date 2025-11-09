/**
 * KARGANOT Next-SEO config
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** @type {import('next-seo').DefaultSeoProps} */
const SEO = {
  titleTemplate: '%s | KARGANOT',
  defaultTitle: 'KARGANOT - Ders Notları Paylaşım Platformu',
  description:
    'KARGANOT, üniversite öğrencileri için ders notu paylaşım, sınav arşivi ve AI destekli öğrenme platformudur.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: 'KARGANOT',
    images: [
      {
        url: `${siteUrl}/image/logo.png`,
        width: 1200,
        height: 630,
        alt: 'KARGANOT',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@karganot',
    site: '@karganot',
  },
  additionalMetaTags: [
    { name: 'robots', content: 'index, follow' },
  ],
};

module.exports = SEO;
