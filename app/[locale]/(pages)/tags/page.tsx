import Link from '@/components/Link'
import PageHeader from '@/components/PageHeader'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'tags' })
  return genPageMetadata({
    title: t('title'),
    description: t('description'),
    locale: params.locale,
    path: '/tags',
  })
}

export default async function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const t = await getTranslations('tags')
  const tBlog = await getTranslations('blog')
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <PageHeader eyebrow="Blog" title={t('title')} />
      <ul className="flex flex-wrap gap-2.5">
        {tagKeys.length === 0 && <li>{t('noTags')}</li>}
        {sortedTags.map((t2) => (
          <li key={t2}>
            <Link
              href={`/tags/${slug(t2)}`}
              aria-label={tBlog('viewPostsTagged', { tag: t2 })}
              className="inline-flex items-center gap-2 rounded-full bg-ink-3 px-3.5 py-2 font-mono text-xs uppercase tracking-[0.06em] text-gray-200 transition-colors hover:bg-sky-300 hover:text-ink"
            >
              {t2.split(' ').join('-')}
              <span className="text-gray-500">{tagCounts[t2]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
