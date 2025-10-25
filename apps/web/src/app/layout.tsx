import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KARGA NOT - Üniversite Not Paylaşım Platformu',
  description: 'Türkiye\'nin en güvenilir ders notu paylaşım platformu. Notlarını paylaş, para kazan!',
  keywords: 'ders notu, üniversite, not paylaşımı, öğrenci, karga not',
  authors: [{ name: 'KARGA NOT' }],
  openGraph: {
    title: 'KARGA NOT - Üniversite Not Paylaşım Platformu',
    description: 'Notlarını paylaş, para kazan!',
    url: 'https://karganot.com',
    siteName: 'KARGA NOT',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARGA NOT',
    description: 'Notlarını paylaş, para kazan!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
