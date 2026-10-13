import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import PageHeader from '@/components/PageHeader'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children }: Props) {
  const t = useTranslations('about')
  return (
    <>
      <PageHeader eyebrow={siteMetadata.author} title={t('title')} />
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="lg:sticky lg:top-28">
          {siteMetadata.avatar && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
              <Image
                src={siteMetadata.avatar}
                alt={siteMetadata.author}
                fill
                sizes="(min-width: 1024px) 33vw, 92vw"
                className="object-cover"
              />
            </div>
          )}
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            {siteMetadata.author}
          </h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-sky-300">
            Senior Full-Stack Engineer
          </p>
          <div className="flex space-x-3 pt-5">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          </div>
        </div>
        <div className="prose prose-lg prose-invert max-w-none text-gray-300 prose-headings:tracking-tight prose-h2:uppercase">
          {children}
        </div>
      </div>
    </>
  )
}
