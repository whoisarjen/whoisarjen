import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { useTranslations, useLocale } from 'next-intl'
import HeroZoom from '@/components/home/HeroZoom'
import ProjectCarousel from '@/components/home/ProjectCarousel'
import RiseObserver from '@/components/home/RiseObserver'

const MAX_POSTS_DISPLAY = 6
const FEATURED_PROJECTS = [
  'Fuoco e Paura',
  'Pradawne Dary',
  'Deante',
  'Deante Flow',
  'Deante Design Studio',
  'Comscore',
  'Digital Nomad',
  'Juicify',
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
  'Turborepo',
  'Vercel',
]

export default function Home({ posts, postCount, projects }) {
  const t = useTranslations('home')
  const tHire = useTranslations('hire')
  const locale = useLocale()

  const metrics = [
    { value: '-60%', label: t('metricApiLabel'), detail: t('metricApiDetail') },
    { value: '6x', label: t('metricCacheLabel'), detail: t('metricCacheDetail') },
    { value: '+80%', label: t('metricSearchLabel'), detail: t('metricSearchDetail') },
    { value: '-92%', label: t('metricBundleLabel'), detail: t('metricBundleDetail') },
    { value: '-70%', label: t('metricBandwidthLabel'), detail: t('metricBandwidthDetail') },
    { value: '13', label: t('metricLangsLabel'), detail: t('metricLangsDetail') },
  ]

  const skills = [1, 2, 3, 4].map((i) => ({
    title: tHire(`skill${i}Title`),
    description: tHire(`skill${i}Desc`),
  }))

  const featured = FEATURED_PROJECTS.map((title) => projects.find((p) => p.title === title))
    .filter(Boolean)
    .map(({ title, description, href, imgSrc, techStack }) => ({
      title,
      description,
      href,
      imgSrc,
      techStack,
    }))

  const roles = [
    { label: tHire('role1'), kind: t('hireRole') },
    { label: tHire('role2'), kind: t('hireRole') },
    { label: tHire('role3'), kind: t('hireRole') },
    { label: tHire('role5'), kind: t('hireTerms') },
  ]

  return (
    <div>
      <RiseObserver />
      <HeroZoom
        scrollLabel={t('scroll')}
        intro={
          <>
            <div>
              <div className="hidden justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 min-[861px]:flex">
                <span>Senior Full-Stack Engineer</span>
                <span>{t('heroTag')}</span>
              </div>
              <h1
                id="hero-title"
                className="display text-[clamp(32px,10vw,48px)] text-sky-300 min-[861px]:mt-[22px] min-[861px]:text-[clamp(38px,5.2vw,88px)]"
              >
                {siteMetadata.author}
                <small className="mt-[0.45em] block text-[max(15px,0.36em)] font-medium normal-case leading-[1.15] tracking-[-0.01em] text-gray-100">
                  {t('heroTagline')}
                </small>
              </h1>
              <p className="mt-4 max-w-[44ch] text-sm text-gray-300 min-[861px]:text-[15.5px]">
                {t('heroSubtitle')}
              </p>
              <dl className="mt-[22px] hidden grid-cols-[repeat(3,auto)] justify-start gap-x-[30px] gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 min-[861px]:grid">
                <dt>{t('metricLangsLabel')}</dt>
                <dt>{t('specProjects')}</dt>
                <dt>{t('specArticles')}</dt>
                <dd className="row-start-2 font-sans text-[22px] font-semibold normal-case tracking-[-0.02em] text-gray-100">
                  13
                </dd>
                <dd className="row-start-2 font-sans text-[22px] font-semibold normal-case tracking-[-0.02em] text-gray-100">
                  15+
                </dd>
                <dd className="row-start-2 font-sans text-[22px] font-semibold normal-case tracking-[-0.02em] text-gray-100">
                  {postCount}
                </dd>
              </dl>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`mailto:${siteMetadata.email}`} className="btn btn-accent">
                {t('emailMe')}
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                {t('readBlog')}
              </Link>
            </div>
          </>
        }
        reveal={
          <>
            <div className="eyebrow">{t('revealEyebrow')}</div>
            <h2 className="display mt-3.5 text-[clamp(42px,6.4vw,108px)] text-white">
              {t('revealTitle')}
            </h2>
            <p className="mt-5 max-w-[42ch] text-[17px] text-gray-200">{t('revealBody')}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {[
                'TypeScript',
                'Vue',
                'Nuxt',
                'React',
                'Next.js',
                'PostgreSQL',
                'Prisma',
                'Vercel',
              ].map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-white/[0.08] px-3 py-1.5 font-mono text-[11.5px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </>
        }
      />

      <section
        aria-label="Tech stack"
        className="border-b border-white/10 px-4 py-5 sm:px-6 lg:px-16"
      >
        <ul className="flex flex-wrap justify-between gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.06em] text-gray-400">
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>

      <section
        id="numbers"
        aria-labelledby="numbers-title"
        className="bg-bone px-4 py-20 text-ink sm:px-6 sm:py-28 lg:px-16 lg:py-36"
      >
        <SectionHead
          eyebrow={`01 · ${t('numbersEyebrow')}`}
          title={t('numbersTitle')}
          id="numbers-title"
          body={t('numbersBody')}
          light
        />
        <div className="grid grid-cols-2 gap-px border-y border-ink/15 bg-ink/15 lg:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="rise bg-bone px-5 py-7 sm:px-7">
              <b className="block text-[clamp(48px,7vw,108px)] font-bold leading-[0.9] tracking-[-0.06em]">
                {m.value}
              </b>
              <span className="mt-3 block font-semibold">{m.label}</span>
              <small className="mt-1 block text-sm text-[#4f5752]">{m.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="bring-title"
        className="bg-ink-2 px-4 py-20 sm:px-6 sm:py-28 lg:px-16 lg:py-36"
      >
        <SectionHead
          eyebrow={`02 · ${tHire('whatIBring')}`}
          title={t('bringTitle')}
          id="bring-title"
          body={t('bringBody')}
        />
        <ol className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <li key={s.title} className="rise bg-ink-2 px-6 pb-8 pt-7">
              <span className="font-mono text-xs text-sky-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 mt-3.5 text-[22px] font-semibold tracking-[-0.015em] text-white">
                {s.title}
              </h3>
              <p className="text-[15px] text-gray-400">{s.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured.length > 0 && (
        <section
          id="work"
          aria-labelledby="work-title"
          className="overflow-clip px-4 py-20 sm:px-6 sm:py-28 lg:px-16 lg:py-36"
        >
          <SectionHead
            eyebrow={`03 · ${t('featuredTitle')}`}
            title={t('workTitle')}
            id="work-title"
            body={t('featuredSubtitle')}
          />
          <ProjectCarousel
            projects={featured}
            labels={{
              region: t('projectsCarousel'),
              previous: t('previousProject'),
              next: t('nextProject'),
              visit: t('visitSite'),
            }}
          />
          <Link href="/projects" className="btn btn-ghost mt-10">
            {t('viewAllProjects', { count: projects.length })}
          </Link>
        </section>
      )}

      <section
        id="writing"
        aria-labelledby="writing-title"
        className="bg-bone px-4 py-20 text-ink sm:px-6 sm:py-28 lg:px-16 lg:py-36"
      >
        <SectionHead
          eyebrow={`04 · ${t('blogTitle')}`}
          title={t('writingTitle')}
          id="writing-title"
          body={t('blogSubtitle')}
          light
        />
        {!posts.length && <p>{t('noPosts')}</p>}
        <ul className="border-t border-ink/15">
          {posts.slice(0, MAX_POSTS_DISPLAY).map(({ slug, date, title, summary }) => (
            <li key={slug} className="rise">
              <Link
                href={`/blog/${slug}`}
                className="group grid gap-1.5 border-b border-ink/15 py-6 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <time
                  dateTime={date}
                  className="font-mono text-xs tracking-[0.04em] text-[#4f5752]"
                >
                  {formatDate(date, 'en-US')}
                </time>
                <div>
                  <h3 className="mb-1.5 text-[clamp(20px,2vw,26px)] font-bold leading-[1.15] tracking-[-0.02em] decoration-1 underline-offset-[5px] group-hover:underline">
                    {title}
                  </h3>
                  <p className="line-clamp-2 max-w-[80ch] text-[15px] text-[#4f5752]">{summary}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden text-xl transition-transform duration-200 group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="btn btn-ink mt-8">
          {t('allArticles', { count: postCount })}
        </Link>
      </section>

      <section
        id="hire"
        aria-labelledby="hire-title"
        className="bg-ink-2 px-4 py-20 sm:px-6 sm:py-28 lg:px-16 lg:py-36"
      >
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="rise relative aspect-[4/3.4] overflow-hidden rounded-[22px] md:aspect-[4/5]">
            <Image
              src={siteMetadata.avatar}
              alt={siteMetadata.author}
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-sky-300">
              {t('badge')}
            </span>
          </div>
          <div className="rise">
            <div className="eyebrow">05 · {tHire('metaTitle')}</div>
            <h2
              id="hire-title"
              className="display mb-4 mt-3 text-[clamp(44px,6.4vw,104px)] leading-[0.88] tracking-[-0.05em] text-white"
            >
              {t('ctaTitle')}
            </h2>
            <p className="max-w-[46ch] text-[17px] text-gray-300">{t('ctaSubtitle')}</p>
            <ul className="my-7 border-t border-white/10">
              {roles.map((r) => (
                <li
                  key={r.label}
                  className="flex justify-between gap-4 border-b border-white/10 py-3.5 text-gray-100"
                >
                  {r.label}
                  <span className="shrink-0 font-mono text-[11px] uppercase text-gray-500">
                    {r.kind}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href={`mailto:${siteMetadata.email}`} className="btn btn-accent">
                {t('emailMe')}
              </Link>
              <Link href={siteMetadata.linkedin || '#'} className="btn btn-ghost">
                LinkedIn
              </Link>
              <Link href={siteMetadata.github || '#'} className="btn btn-ghost">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  id,
  body,
  light = false,
}: {
  eyebrow: string
  title: string
  id: string
  body: string
  light?: boolean
}) {
  return (
    <div className="rise mb-10 grid items-end gap-8 sm:mb-16 md:grid-cols-[1.1fr_1fr]">
      <div>
        <div className={`eyebrow ${light ? '!text-sky-800' : ''}`}>{eyebrow}</div>
        <h2
          id={id}
          className={`display mt-3 text-[clamp(34px,5vw,76px)] leading-[0.95] ${light ? 'text-ink' : 'text-white'}`}
        >
          {title}
        </h2>
      </div>
      <p
        className={`max-w-[46ch] text-[17px] md:justify-self-end ${light ? 'text-[#4f5752]' : 'text-gray-400'}`}
      >
        {body}
      </p>
    </div>
  )
}
