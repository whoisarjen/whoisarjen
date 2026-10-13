import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getPostsByLocale } from '@/lib/posts'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const generateStaticParams = async ({ params }: { params: { locale: string } }) => {
  const localePosts = allBlogs.filter((p) => p.locale === params.locale)
  const totalPages = Math.max(1, Math.ceil(localePosts.length / siteMetadata.postsPerPage))
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default async function Page({ params }: { params: { locale: string; page: string } }) {
  setRequestLocale(params.locale)
  const t = await getTranslations('blog')
  const posts = getPostsByLocale(params.locale)
  const pageNumber = parseInt(params.page as string)
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
