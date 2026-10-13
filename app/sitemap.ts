import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft && post.locale === 'en')
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.lastmod || post.date,
    }))

  const staticRoutes = ['', 'blog', 'projects', 'tags', 'hire', 'about'].map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticRoutes, ...blogRoutes]
}
