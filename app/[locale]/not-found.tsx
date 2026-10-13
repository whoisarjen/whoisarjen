import Link from '@/components/Link'
import { useTranslations } from 'next-intl'

// notFound() calls anywhere under app/[locale] are rendered by Next.js inside
// its bare `__next_error__` fallback shell, NOT inside app/[locale]/layout.tsx.
// That shell ships no <link rel="stylesheet">, so Tailwind classes silently
// no-op here (verified via production build + curl). Inline styles below are
// load-bearing, not decoration — they're what actually paints the page.
// The Tailwind classes are kept alongside as a harmless enhancement in case a
// future Next.js version wraps this in the real layout.
export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '1.5rem',
        textAlign: 'center',
        backgroundColor: '#0a0d10',
        color: '#f3f4f6',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6"
    >
      <div style={{ paddingBottom: '0.5rem' }} className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1
          style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.025em',
            color: '#f3f4f6',
            margin: 0,
          }}
          className="text-6xl font-extrabold leading-9 tracking-tight text-gray-100 md:border-r-2 md:border-gray-700 md:px-6 md:text-8xl md:leading-14"
        >
          404
        </h1>
      </div>
      <div style={{ maxWidth: '28rem' }} className="max-w-md">
        <p
          style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 700, color: '#f3f4f6' }}
          className="mb-4 text-xl font-bold leading-normal text-gray-100 md:text-2xl"
        >
          {t('heading')}
        </p>
        <p style={{ marginBottom: '2rem', color: '#9ca3af' }} className="mb-8 text-gray-400">
          {t('body')}
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            borderRadius: '0.5rem',
            backgroundColor: '#7dd3fc',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: '1.25rem',
            color: '#0a0d10',
            textDecoration: 'none',
          }}
          className="inline rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-sky-600 focus:outline-none"
        >
          {t('back')}
        </Link>
      </div>
    </div>
  )
}
