import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPostsByLocale } from '@/lib/posts'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string[] }
}): Promise<Metadata | undefined> {
  const { locale } = params
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug && p.locale === locale)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults =
      allAuthors.find((p) => p.slug === author && p.locale === locale) ||
      allAuthors.find((p) => p.slug === author && p.locale === 'en')
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const enUrl = `${siteMetadata.siteUrl}/blog/${slug}`
  const plUrl = `${siteMetadata.siteUrl}/pl/blog/${slug}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    alternates: {
      canonical: locale === 'pl' ? plUrl : enUrl,
      languages: { en: enUrl, pl: plUrl, 'x-default': enUrl },
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async ({ params }: { params: { locale: string } }) => {
  return allBlogs
    .filter((p) => p.locale === params.locale)
    .map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Page({ params }: { params: { locale: string; slug: string[] } }) {
  const { locale } = params
  setRequestLocale(locale)
  const slug = decodeURI(params.slug.join('/'))
  const sortedCoreContents = getPostsByLocale(locale)
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug && p.locale === locale) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults =
      allAuthors.find((p) => p.slug === author && p.locale === locale) ||
      allAuthors.find((p) => p.slug === author && p.locale === 'en')
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
