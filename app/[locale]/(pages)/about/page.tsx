import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' })
  return genPageMetadata({ title: t('title'), locale: params.locale, path: '/about' })
}

export default async function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const author = (allAuthors.find((p) => p.slug === 'default' && p.locale === params.locale) ||
    allAuthors.find((p) => p.slug === 'default' && p.locale === 'en')) as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
