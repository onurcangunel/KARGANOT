import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import MDXContent from '@/content/pages/yasal.mdx'

const fm = (MDXContent as unknown as { frontmatter?: { title?: string; description?: string } }).frontmatter || {}

export const metadata: Metadata = buildMetadata({
  title: `${fm?.title || 'Yasal Bilgilendirme'} | KARGANOT`,
  description: fm?.description || 'KARGANOT yasal yükümlülükler ve kullanım hakları hakkında bilgilendirme.',
  keywords: ['karganot', 'yasal', 'hukuk', 'bilgilendirme'],
  slug: '/yasal',
})

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 py-12 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">{fm?.title || 'Yasal Bilgilendirme'}</h1>
      <MDXContent />
    </main>
  )
}
