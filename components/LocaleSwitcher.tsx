'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from 'i18n/navigation'

const locales = ['en', 'pl'] as const

export default function LocaleSwitcher() {
  const currentLocale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      {locales.map((locale) =>
        locale === currentLocale ? (
          <span key={locale} className="uppercase text-sky-300">
            {locale}
          </span>
        ) : (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className="uppercase text-gray-400 transition-colors hover:text-gray-100"
          >
            {locale}
          </Link>
        )
      )}
    </div>
  )
}
