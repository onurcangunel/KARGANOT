import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Image from 'next/image';
import { motion } from 'framer-motion';
import sssData from '@/content/faq/sss.mdx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const metadata: Metadata = buildMetadata({
	title: 'KARGANOT | SSS',
	description: 'KARGANOT hakkında sık sorulan sorular ve yanıtları.',
	keywords: ['karganot', 'sss', 'sorular', 'yardım', 'destek'],
	slug: '/sss',
});

type SSSItem = { q: string; a: string };
type MDXFrontmatter = { readonly items?: SSSItem[] };
const frontmatter = (sssData as unknown as { readonly frontmatter?: MDXFrontmatter }).frontmatter || { items: [] };

export default function Page() {
	return (
		<div className="relative min-h-screen bg-background text-foreground">
			{/* Hero */}
			<section className="relative overflow-hidden" aria-labelledby="sss-title">
				<div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-8 py-14 md:py-20 text-center">
					<motion.h1 id="sss-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Sık Sorulan Sorular</motion.h1>
					<motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="text-base md:text-lg text-muted-foreground">KARGANOT ekibinden en çok yanıtlanan soruları burada bul.</motion.p>
				</div>
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/90" />
				</div>
			</section>

			{/* Content */}
			<div className="container mx-auto max-w-3xl px-6 md:px-8 pb-20">
				<Accordion className="divide-y rounded-xl border">
					{(frontmatter.items || []).map((f, idx) => (
						<AccordionItem key={idx} value={`faq-${idx}`}>
							<AccordionTrigger value={`faq-${idx}`}>{f.q}</AccordionTrigger>
							<AccordionContent value={`faq-${idx}`}>{f.a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>

			{/* Dark mode fixed images */}
			<div className="hidden dark:block fixed bottom-6 right-6 z-[5] pointer-events-none select-none">
				<Image src="/image/darkmode_karga.png" alt="Dark mode karga" width={260} height={260} className="drop-shadow-lg w-[200px] md:w-[260px] h-auto" />
			</div>
			<div className="fixed bottom-6 left-6 z-[6] pointer-events-none select-none">
				<picture>
					<source srcSet="/images/karganot_logo.gif" type="image/gif" />
					<img src="/image/logo.png" alt="KARGANOT köşe logosu" className="w-[64px] md:w-[80px] h-auto" />
				</picture>
			</div>
		</div>
	);
}