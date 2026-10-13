import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Main from './Main'
import { getProjects } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import { getPostsByLocale } from '@/lib/posts'
import { BeambackWidget } from '@/components/BeambackWidget'

export const revalidate = 86400 // 1 day

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const enUrl = siteMetadata.siteUrl
  const plUrl = `${siteMetadata.siteUrl}/pl`
  const feedPath = params.locale === 'pl' ? '/pl/feed.xml' : '/feed.xml'
  return {
    alternates: {
      canonical: params.locale === 'pl' ? plUrl : enUrl,
      languages: { en: enUrl, pl: plUrl, 'x-default': enUrl },
      types: { 'application/rss+xml': `${siteMetadata.siteUrl}${feedPath}` },
    },
  }
}

export default async function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const allPosts = getPostsByLocale(params.locale)
  const posts = allPosts.slice(0, siteMetadata.postsPerPage)
  const projects = await getProjects(params.locale)
  return (
    <>
      <Main posts={posts} postCount={allPosts.length} projects={projects} />
      <BeambackWidget />
    </>
  )
}
