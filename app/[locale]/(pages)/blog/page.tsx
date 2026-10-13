import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import { getPostsByLocale } from '@/lib/posts'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return genPageMetadata({ title: 'Blog', locale: params.locale, path: '/blog' })
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const t = await getTranslations('blog')
  const posts = getPostsByLocale(params.locale)
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    siteMetadata.postsPerPage * (pageNumber - 1),
    siteMetadata.postsPerPage * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / siteMetadata.postsPerPage),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('allPosts')}
    />
  )
}
