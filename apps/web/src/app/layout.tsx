import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import DefaultLayout from '@/layouts/DefaultLayout';
import GoogleTagManager from '@/components/GoogleTagManager';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { GTMHead, GTMNoScript } from '@/lib/analytics/gtmClient';
import DarkModeBackground from '@/components/ui/DarkModeBackground';
import CornerGif from '@/components/ui/CornerGif';

const inter = Inter({ subsets: ['latin'] });

// Disable static pre-rendering globally to avoid CSR hooks/Suspense build errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'KARGANOT – Bilgini Paylaş, Kazancını Artır',
    template: '%s | KARGANOT',
  },
  description: 'Öğrenciden öğrenciye not paylaşım ve kazanç platformu.',
  keywords: ['karganot', 'ders notu', 'üniversite', 'öğrenci', 'not paylaşımı', 'kazanç'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Onur' }],
  openGraph: {
    title: 'KARGANOT – Bilgini Paylaş, Kazancını Artır',
    description: 'Öğrenciden öğrenciye not paylaşım ve kazanç platformu.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'KARGANOT',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/image/logo.png', width: 1200, height: 630, alt: 'KARGANOT' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARGANOT – Bilgini Paylaş, Kazancını Artır',
    description: 'Öğrenciden öğrenciye not paylaşım ve kazanç platformu.',
    images: ['/image/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="tr" suppressHydrationWarning>
      <body
        className={
          inter.className +
          ' min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-black'
        }
      >
    <GTMHead />
        <GTMNoScript />
        <GoogleTagManager />
        <Providers>
          <AnalyticsProvider>
            <DefaultLayout>
              <DarkModeBackground />
              {children}
              <CornerGif />
            </DefaultLayout>
          </AnalyticsProvider>
        </Providers>
      </body>
    </html>
  );
}
