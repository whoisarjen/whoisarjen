import { getProjects } from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <>
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
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                techStack={d.techStack}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
