import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import MDXContent from '@/content/pages/kullanim.mdx'

const fm = (MDXContent as unknown as { frontmatter?: { title?: string; description?: string } }).frontmatter || {}

export const metadata: Metadata = buildMetadata({
  title: `${fm?.title || 'Kullanım Şartları'} | KARGANOT`,
  description: fm?.description || 'KARGANOT hizmet koşulları ve kullanıcı yükümlülükleri.',
  keywords: ['karganot', 'kullanım şartları', 'hukuk', 'kurallar', 'şartlar', 'politikalar'],
  slug: '/kullanim',
})

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 py-12 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">{fm?.title || 'Kullanım Şartları'}</h1>
      <MDXContent />
    </main>
  )
}
