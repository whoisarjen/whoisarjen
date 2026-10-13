import { getProjects } from '@/data/projectsData'
import Link from '@/components/Link'
import Image from '@/components/Image'
import PageHeader from '@/components/PageHeader'
import { genPageMetadata } from 'app/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'projects' })
  return genPageMetadata({ title: t('title'), locale: params.locale, path: '/projects' })
}

export default async function Projects({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const t = await getTranslations('projects')
  const tNav = await getTranslations('nav')
  const projectsData = await getProjects(params.locale)

  return (
    <div>
      <PageHeader eyebrow={tNav('projects')} title={t('title')} subtitle={t('subtitle')} />
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <Link key={project.title} href={project.href} className="group flex flex-col">
            {project.imgSrc && (
              <div className="mb-4 overflow-hidden rounded-[14px] bg-[#0e1215] shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
                <div className="flex items-center gap-1.5 bg-[#1a2026] px-3 py-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#3a434b]" />
                  <i className="h-1.5 w-1.5 rounded-full bg-[#3a434b]" />
                  <i className="h-1.5 w-1.5 rounded-full bg-[#3a434b]" />
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.imgSrc}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-strong group-hover:scale-[1.04]"
                    width={544}
                    height={306}
                  />
                </div>
              </div>
            )}
            <h2 className="text-[21px] font-bold tracking-[-0.015em] text-white group-hover:text-sky-300">
              {project.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-gray-400">
              {project.description}
            </p>
            {project.techStack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-ink-3 px-2.5 py-1 font-mono text-[11px] text-sky-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
