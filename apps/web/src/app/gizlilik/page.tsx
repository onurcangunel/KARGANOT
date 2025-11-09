import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import MDXContent from '@/content/pages/gizlilik.mdx'

const fm = (MDXContent as unknown as { frontmatter?: { title?: string; description?: string } }).frontmatter || {}

export const metadata: Metadata = buildMetadata({
  title: `${fm.title || 'Gizlilik Politikası'} | KARGANOT`,
  description: fm.description || 'KARGANOT gizlilik politikası ve kullanıcı verilerinin korunması.',
  keywords: ['karganot', 'gizlilik', 'politika', 'veri koruma'],
  slug: '/gizlilik',
})

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 py-12 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">{fm.title || 'Gizlilik Politikası'}</h1>
      <MDXContent />
    </main>
  )
}
