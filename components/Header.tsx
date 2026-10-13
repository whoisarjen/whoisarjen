import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import LocaleSwitcher from './LocaleSwitcher'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('nav')
  const tHome = useTranslations('home')
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 border-b border-white/10 px-4 py-3.5 sm:px-6 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-ink/75 backdrop-blur-xl" aria-hidden="true" />
      <Link href="/" className="text-sm font-extrabold tracking-[0.28em] text-gray-100">
        WHOISARJE<span className="text-sky-300">N</span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <nav aria-label="Main" className="hidden items-center gap-6 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-gray-300 transition-colors hover:text-sky-300"
              >
                {t(link.key)}
              </Link>
            ))}
        </nav>
        <LocaleSwitcher />
        <SearchButton />
        <Link
          href="/hire"
          className="hidden items-center gap-2 rounded-full bg-sky-300 px-3.5 py-2 text-[13px] font-semibold text-ink transition-transform active:scale-[0.97] lg:inline-flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-900" aria-hidden="true" />
          {tHome('badge')}
        </Link>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
