import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'

const MAX_POSTS_DISPLAY = 6
const MAX_PROJECTS_DISPLAY = 9

const metrics = [
  { value: '-60%', label: 'API response size', detail: 'Smart object mapping' },
  { value: '6x', label: 'Cache capacity', detail: 'gzip on 1GB servers' },
  { value: '+80%', label: 'Faster search', detail: 'PostgreSQL CTE tuning' },
  { value: '11', label: 'Languages served', detail: 'Multi-market e-commerce' },
]

const techStack = [
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Nuxt',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'Prisma',
  'Tailwind CSS',
]

export default function Home({ posts, projects }) {
  return (
    <div className="space-y-0">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pb-16 pt-8 sm:pb-20 sm:pt-12">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 -mx-4 sm:-mx-6 xl:-mx-[calc((100vw-64rem)/2)]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950" />
        </div>

        <div className="relative">
          {/* Status badge */}
          <div className="mb-8 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium tracking-wide text-emerald-400">
              Available for opportunities
            </span>
          </div>

          {/* Headline block */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            I build high-performance
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
              systems that scale
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            Senior Full-Stack Engineer specializing in multi-market e-commerce, performance
            optimization, and scalable architecture. Proven track record shipping high-traffic
            platforms across international markets.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#work"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              View my work
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href={`mailto:${siteMetadata.email}`}
              className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800"
            >
              Get in touch
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>

            {/* Social icons */}
            <div className="flex items-center gap-1 border-l border-gray-800 pl-4">
              <Link
                href={siteMetadata.github || '#'}
                className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link
                href={siteMetadata.linkedin || '#'}
                className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Metrics strip ─────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-800 bg-gray-800 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 bg-gray-950 p-5 sm:p-6">
              <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {m.value}
              </span>
              <span className="text-sm font-semibold text-gray-200">{m.label}</span>
              <span className="text-sm text-gray-300">{m.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────────── */}
      <section className="border-y border-gray-800">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────────────────── */}
      <section id="work" className="py-16 sm:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-2 text-gray-400">
            Production systems serving real users - from multi-market e-commerce to open-source
            developer tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length === 0 && <p className="text-gray-400">No projects found.</p>}
          {projects.slice(0, MAX_PROJECTS_DISPLAY).map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-800 transition-colors hover:border-gray-700"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.imgSrc}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  width={544}
                  height={306}
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-white group-hover:text-sky-400">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {projects.length > MAX_PROJECTS_DISPLAY && (
          <div className="mt-8 flex items-center justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-600 hover:bg-gray-800 hover:text-white"
            >
              View all {projects.length} projects
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* ── Engineering Blog ─────────────────────────────────────── */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineering Blog
            </h2>
            <p className="mt-2 text-gray-400">
              Deep-dives into performance, architecture, and real production challenges.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm font-semibold text-sky-500 hover:text-sky-400 sm:block"
          >
            All posts &rarr;
          </Link>
        </div>

        <div className="divide-y divide-gray-800">
          {!posts.length && <p>No posts found.</p>}
          {posts.slice(0, MAX_POSTS_DISPLAY).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <article key={slug} className="group py-6 first:pt-0 last:pb-0">
                <Link href={`/blog/${slug}`} className="block">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    <time dateTime={date} className="shrink-0 text-sm tabular-nums text-gray-400">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-100 group-hover:text-sky-400">
                        {title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-gray-400">{summary}</p>
                    </div>
                    <svg
                      className="hidden h-4 w-4 shrink-0 text-gray-700 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500 sm:block"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/blog" className="text-sm font-semibold text-sky-500 hover:text-sky-400">
            All posts &rarr;
          </Link>
        </div>
      </section>

      {/* ── CTA + Newsletter ────────────────────────────────────── */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Let's build something together
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-400">
            I'm open to full-time roles, contract work, and interesting collaborations. Let's talk
            about what I can bring to your team.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`mailto:${siteMetadata.email}`}
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email me
            </Link>
            <Link
              href={siteMetadata.linkedin || '#'}
              className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800"
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
