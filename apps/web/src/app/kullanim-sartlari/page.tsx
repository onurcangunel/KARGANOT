import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Kullanım Şartları | KARGANOT',
  description: 'KARGANOT kullanım şartları ve koşulları.',
  slug: '/kullanim-sartlari',
});

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Kullanım Şartları</h1>
      <p className="text-muted-foreground">Bu sayfa yakında güncellenecek.</p>
    </main>
  );
}
