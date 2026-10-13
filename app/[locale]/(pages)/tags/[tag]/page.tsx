import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { locale: string; tag: string }
}): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  const t = await getTranslations({ locale: params.locale, namespace: 'tags' })
  return genPageMetadata({
    title: tag,
    description: t('tagDescription', { title: siteMetadata.title, tag }),
    locale: params.locale,
    path: `/tags/${tag}`,
    alternates: {
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}${params.locale === 'pl' ? '/pl' : ''}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default function TagPage({ params }: { params: { locale: string; tag: string } }) {
  setRequestLocale(params.locale)
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.locale === params.locale && post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  )
  return <ListLayout posts={filteredPosts} title={title} />
}
