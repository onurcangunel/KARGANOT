import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import UniversitiesClient from './_client';

export const metadata: Metadata = buildMetadata({
  title: 'Üniversiteler',
  description: '208 üniversiteyi kapsayan paylaşım ağı: üniversiteni bul, topluluğa katıl.',
  keywords: ['karganot', 'üniversiteler', 'ağ', 'paylaşım', 'arama'],
  slug: '/universiteler',
});

export default function Page() { return <UniversitiesClient />; }
