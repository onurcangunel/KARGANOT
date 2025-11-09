import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import NasilCalisirClient from './_client';

export const metadata: Metadata = buildMetadata({
  title: 'KARGANOT Nasıl Çalışır?',
  description: '3 adımda: Not yükle, onaylanma, satıştan pay kazan. Basit ve şeffaf.',
  keywords: ['karganot', 'nasıl çalışır', 'rehber', 'not yükleme', 'kazanç'],
  slug: '/nasil-calisir',
});

export default function Page() { return <NasilCalisirClient />; }
