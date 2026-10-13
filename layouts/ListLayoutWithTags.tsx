/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from 'app/tag-data.json'
import PageHeader from '@/components/PageHeader'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const t = useTranslations('blog')
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-10">
      <nav className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em] text-gray-400 [&_a:hover]:text-sky-300 [&_a]:text-gray-100">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('previous')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('previous')}
          </Link>
        )}
        <span>{t('pageOf', { current: currentPage, total: totalPages })}</span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('next')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('next')}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const t = useTranslations('blog')
  const locale = useLocale()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <PageHeader eyebrow="Blog" title={title} />
      <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-auto pr-2">
            {pathname.startsWith('/blog') ? (
              <h3 className="eyebrow">{t('allPosts')}</h3>
            ) : (
              <Link
                href={`/blog`}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-300 hover:text-sky-300"
              >
                {t('allPosts')}
              </Link>
            )}
            <ul className="mt-4 border-l border-white/10">
              {sortedTags.map((t2) => {
                const isActive = pathname.split('/tags/')[1] === slug(t2)
                return (
                  <li key={t2}>
                    {isActive ? (
                      <h3 className="-ml-px border-l-2 border-sky-300 py-1.5 pl-3.5 font-mono text-xs uppercase tracking-[0.04em] text-sky-300">
                        {`${t2} (${tagCounts[t2]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${slug(t2)}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-3.5 font-mono text-xs uppercase tracking-[0.04em] text-gray-400 transition-colors hover:text-gray-100"
                        aria-label={t('viewPostsTagged', { tag: t2 })}
                      >
                        {`${t2} (${tagCounts[t2]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
        <div className="min-w-0">
          <ul className="border-t border-white/10">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path} className="border-b border-white/10 py-7">
                  <article className="grid gap-2 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6">
                    <dl>
                      <dt className="sr-only">{t('publishedOn')}</dt>
                      <dd className="font-mono text-xs tracking-[0.04em] text-gray-400 sm:pt-2">
                        <time dateTime={date}>
                          {formatDate(date, locale === 'pl' ? 'pl-PL' : 'en-US')}
                        </time>
                      </dd>
                    </dl>
                    <div>
                      <h2 className="text-[clamp(20px,2vw,26px)] font-bold leading-[1.15] tracking-[-0.02em]">
                        <Link
                          href={`/${path}`}
                          className="text-white decoration-1 underline-offset-[5px] hover:underline"
                        >
                          {title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-[15px] text-gray-400">{summary}</p>
                      {tags && tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-y-1">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
