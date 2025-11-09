import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = buildMetadata({
  title: 'Hakkımızda | KARGANOT',
  description: 'Öğrenciden öğrenciye bilgi paylaşımı ve adil kazanç ekosistemi. KARGANOT ile bilgini paylaş, kazancını artır.',
  keywords: ['karganot', 'hakkımızda', 'öğrenci platformu', 'ders notu', 'üniversite', 'paylaşım', 'kazanç'],
  slug: '/hakkimizda',
  image: '/image/logo.png',
});

export default function AboutPage() {
  return <AboutClient />;
}
