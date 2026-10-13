import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { routing } from 'i18n/routing'
import { ThemeProviders } from '../theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'

const sans = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const feedPath = locale === 'pl' ? '/pl/feed.xml' : '/feed.xml'
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: siteMetadata.title,
      template: `%s | ${siteMetadata.title}`,
    },
    description: t('description'),
    openGraph: {
      title: siteMetadata.title,
      description: t('description'),
      url: './',
      siteName: siteMetadata.title,
      images: [siteMetadata.socialBanner],
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}${feedPath}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: siteMetadata.title,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }
  setRequestLocale(locale)
  const messages = await getMessages()
  const searchConfig = {
    ...siteMetadata.search,
    kbarConfig: {
      searchDocumentsPath: locale === 'pl' ? 'search-pl.json' : 'search.json',
    },
  } as SearchConfig
  const feedPath = locale === 'pl' ? '/pl/feed.xml' : '/feed.xml'

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${mono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#0a0d10" />
      <link rel="alternate" type="application/rss+xml" href={feedPath} />
      <Script src={`https://cdn-cookieyes.com/client_data/${siteMetadata.cookieyes}/script.js`} />
      <body className="overflow-x-clip bg-ink font-sans text-gray-100 antialiased">
        <ThemeProviders>
          <NextIntlClientProvider messages={messages}>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <div className="flex min-h-screen flex-col">
              <SearchProvider searchConfig={searchConfig}>
                <Header />
                <main className="flex-1">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
