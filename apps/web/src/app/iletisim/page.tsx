import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import MDXContent from '@/content/pages/iletisim.mdx'

const fm = (MDXContent as unknown as { frontmatter?: { title?: string; description?: string } }).frontmatter || {}

export const metadata: Metadata = buildMetadata({
	title: `${fm?.title || 'İletişim'} | KARGANOT`,
	description: fm?.description || 'Sorularınız için bize ulaşın: destek@karganot.com',
	keywords: ['karganot', 'iletişim', 'destek', 'email', 'yardım'],
	slug: '/iletisim',
})

export default function Page() {
	return (
		<main className="max-w-3xl mx-auto p-6 py-12 prose prose-neutral dark:prose-invert">
			<h1 className="text-3xl font-bold mb-6">{fm?.title || 'İletişim'}</h1>
			<MDXContent />
		</main>
	)
}