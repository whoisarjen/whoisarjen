import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Hire Me',
  description:
    'Senior Full-Stack Engineer available for hire. Deep expertise in performance optimization, scalable architecture, and shipping production systems.',
})

const skills = [
  {
    title: 'Performance Engineering',
    description:
      'I optimize at every layer. Database queries, API payloads, frontend bundles, caching strategies.',
  },
  {
    title: 'Scalable Architecture',
    description:
      'I design systems that handle growth. Multi-market platforms, internationalization, microservices.',
  },
  {
    title: 'Full-Stack Delivery',
    description:
      'I ship end-to-end. From database schema to pixel-perfect UI. TypeScript, React, Vue, Node.js, PostgreSQL.',
  },
  {
    title: 'Production Mindset',
    description:
      'I build for real users. Monitoring, error handling, graceful degradation, zero-downtime deployments.',
  },
]

const metrics = [
  { value: '-60%', label: 'API response size' },
  { value: '6x', label: 'Cache capacity' },
  { value: '+80%', label: 'Faster search' },
  { value: '11', label: 'Languages served' },
  { value: '15+', label: 'Projects shipped' },
  { value: '26', label: 'Technical articles' },
]

const idealRoles = [
  'Senior/Staff Full-Stack Engineer',
  'Performance Engineer',
  'Technical Lead',
  'Engineering roles at product companies building at scale',
  'Open to full-time, contract, and consulting',
]

export default function HirePage() {
  return (
    <div className="space-y-0">
      {/* -- Header -- */}
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

          {/* Headline */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let's work{' '}
            <span className="bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
              together
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            I'm a Senior Full-Stack Engineer looking for my next challenge. I bring deep expertise
            in performance optimization, scalable architecture, and shipping production systems.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
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

      {/* -- What I Bring -- */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What I Bring
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-gray-800 bg-gray-800 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.title} className="flex flex-col gap-3 bg-gray-950 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white">{skill.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- By the Numbers -- */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            By the Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-800 bg-gray-800 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 bg-gray-950 p-5 sm:p-6">
              <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {m.value}
              </span>
              <span className="text-sm font-semibold text-gray-200">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -- Ideal Roles -- */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ideal Roles
          </h2>
        </div>

        <ul className="space-y-4">
          {idealRoles.map((role) => (
            <li key={role} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 shrink-0 text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-lg text-gray-300">{role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* -- Bottom CTA -- */}
      <section className="border-t border-gray-800 py-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-400">
            Let's discuss how I can contribute to your team and help build something great.
          </p>
          <div className="mt-8">
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
          </div>
        </div>
      </section>
    </div>
  )
}
