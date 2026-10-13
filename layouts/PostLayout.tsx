import { ReactNode } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SocialIcon from '@/components/social-icons'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const { filePath, path, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <div className="mx-auto max-w-5xl">
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-white/10">
          <header className="pb-8 pt-4 xl:pb-10">
            <div className="space-y-4">
              <dl>
                <div>
                  <dt className="sr-only">{t('publishedOn')}</dt>
                  <dd className="font-mono text-xs uppercase tracking-[0.08em] text-sky-300">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        locale === 'pl' ? 'pl-PL' : 'en-US',
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-white/10 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-white/10 xl:pt-11">
              <dt className="sr-only">{t('authors')}</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2" key={siteMetadata.author}>
                    {siteMetadata.avatar && (
                      <Image
                        src={siteMetadata.avatar}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">{t('name')}</dt>
                        <dd className="text-gray-100">{siteMetadata.author}</dd>
                      </dl>
                      <div className="flex space-x-2">
                        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
                        <SocialIcon kind="github" href={siteMetadata.github} size={5} />
                        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-white/10 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-lg prose-invert max-w-none pb-8 pt-10 prose-headings:tracking-tight prose-pre:rounded-xl">
                {children}
              </div>
              <div className="pb-6 pt-6 text-sm text-gray-300">
                <Link href={editUrl(filePath)}>{t('viewOnGitHub')}</Link>
              </div>
            </div>
            <footer>
              <div className="divide-white/10 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400">
                      {t('tags')}
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400">
                          {t('previousArticle')}
                        </h2>
                        <div className="text-sky-300 hover:text-sky-200">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400">
                          {t('nextArticle')}
                        </h2>
                        <div className="text-sky-300 hover:text-sky-200">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-sky-300 hover:text-sky-200"
                  aria-label={t('backToBlog')}
                >
                  &larr; {t('backToBlog')}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
