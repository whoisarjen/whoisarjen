import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Main from './Main'
import { getProjects } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import { getPostsByLocale } from '@/lib/posts'
import { BeambackWidget } from '@/components/BeambackWidget'

export const revalidate = 86400 // 1 day

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: siteMetadata.siteUrl,
      types: { 'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml` },
    },
  }
}

export default async function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const allPosts = getPostsByLocale(params.locale)
  const posts = allPosts.slice(0, siteMetadata.postsPerPage)
  const projects = await getProjects()
  return (
    <>
      <Main posts={posts} postCount={allPosts.length} projects={projects} />
      <BeambackWidget />
    </>
  )
}
