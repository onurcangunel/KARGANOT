import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import MainLayout from '@/components/layouts/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KargaNot | Öğrenciden Öğrenciye Bilgi Platformu',
  description: 'Türkiye\'nin en güvenilir ders notu paylaşım platformu. Notlarını paylaş, para kazan!',
  keywords: 'ders notu, üniversite, not paylaşımı, öğrenci, karganot',
  authors: [{ name: 'Onur' }],
  openGraph: {
    title: 'KargaNot - Üniversite Not Paylaşım Platformu',
    description: 'Notlarını paylaş, para kazan!',
    url: 'https://karganot.com',
    siteName: 'KargaNot',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KargaNot',
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
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
