import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-4 py-10 text-sm text-gray-400 sm:px-6 lg:px-16">
      <span>
        © {new Date().getFullYear()} {siteMetadata.author} · whoisarjen.com
      </span>
      <nav aria-label="Social" className="flex flex-wrap gap-6">
        <Link href={`mailto:${siteMetadata.email}`} className="hover:text-sky-300">
          {siteMetadata.email}
        </Link>
        <Link href={siteMetadata.github || '#'} className="hover:text-sky-300">
          GitHub
        </Link>
        <Link href={siteMetadata.linkedin || '#'} className="hover:text-sky-300">
          LinkedIn
        </Link>
      </nav>
    </footer>
  )
}
