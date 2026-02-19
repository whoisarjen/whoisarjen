import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'

const MAX_POSTS_DISPLAY = 10
const MAX_PROJECTS_DISPLAY = 17

export default function Home({ posts, projects }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <div className="my-6 flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
            <div className="mr-8 pt-6 text-center xl:text-left">
              <h1 className="pb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl">
                Hi, I'm {siteMetadata.author}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{siteMetadata.description}</p>
            </div>
          </div>
        </div>

        {/* Recent Projects — Bento Grid */}
        <div className="space-y-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Recent Projects
          </h2>
          <ul className="grid auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[180px] sm:gap-3 lg:grid-cols-4">
            {projects.length === 0 && <p>No projects found.</p>}
            {projects.slice(0, MAX_PROJECTS_DISPLAY).map((project, i) => (
              <li
                key={project.title}
                className={`group relative overflow-hidden rounded-xl ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <Link href={project.href} className="block h-full">
                  <Image
                    src={project.imgSrc}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    width={i === 0 ? 800 : 400}
                    height={i === 0 ? 600 : 300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <h3
                      className={`font-bold text-white ${
                        i === 0 ? 'text-lg sm:text-2xl' : 'text-xs sm:text-sm'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mt-1 text-gray-200 ${
                        i === 0
                          ? 'line-clamp-2 text-xs sm:text-sm'
                          : 'line-clamp-2 max-h-0 overflow-hidden text-xs opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-primary-400/50" />
                </Link>
              </li>
            ))}
          </ul>
          {projects.length > MAX_PROJECTS_DISPLAY && (
            <div className="flex pt-4 text-base font-medium leading-6">
              <Link
                href="/projects"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                See more &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Latest Posts Section */}
        <div className="space-y-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Latest
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && <p>No posts found.</p>}
            {posts.slice(0, MAX_POSTS_DISPLAY).map((post) => {
              const { slug, date, title, summary } = post
              return (
                <li key={slug} className="py-8">
                  <article>
                    <div className="space-y-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-4 xl:col-span-3">
                        <h3 className="text-2xl font-bold">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 hover:underline dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">{summary}</p>
                        <div>
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {posts.length > MAX_POSTS_DISPLAY && (
            <div className="flex justify-end pt-4 text-base font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All Posts &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
