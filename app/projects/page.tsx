import { getProjects } from '@/data/projectsData'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <div>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
        <p className="text-gray-400">
          Production systems, open-source tools, and side projects I've built.
        </p>
      </div>
      <div className="border-t border-gray-800 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-800 transition-colors hover:border-gray-700"
            >
              {project.imgSrc && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.imgSrc}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    width={544}
                    height={306}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-white group-hover:text-sky-400">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
                {project.techStack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
