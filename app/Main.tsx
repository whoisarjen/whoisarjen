import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'

const MAX_POSTS_DISPLAY = 10
const MAX_PROJECTS_DISPLAY = 9

export default function Home({ posts, projects }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <div className="my-6 flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
            <div className="mr-8 pt-6 text-center xl:text-left">
              <h1 className="pb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl">
                Hi, I’m {siteMetadata.author}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{siteMetadata.description}</p>
            </div>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Recent Projects
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.length === 0 && <p>No projects found.</p>}
            {projects.slice(0, MAX_PROJECTS_DISPLAY).map((project) => (
              <li
                key={project.slug}
                className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
              >
                <Link href={project.href} className="block h-full">
                  <Image
                    src={project.imgSrc}
                    alt={project.title}
                    className="h-48 w-full object-cover object-top"
                    width={500}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                  </div>
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
