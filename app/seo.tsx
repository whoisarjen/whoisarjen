import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  path?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  path = '',
  ...rest
}: PageSEOProps): Metadata {
  const url = `${siteMetadata.siteUrl}${path}`
  const { alternates: extraAlternates, ...restProps } = rest
  return {
    title,
    // Omit the key entirely when the caller has none, so the layout
    // description is inherited instead of overridden.
    ...(description ? { description } : {}),
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      ...(description ? { description } : {}),
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: url,
      ...(extraAlternates ?? {}),
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...restProps,
  }
}
