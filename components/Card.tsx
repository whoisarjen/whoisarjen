import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, status = null, techStack = [] as string[] }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      }  flex flex-col overflow-hidden rounded-md border-2 border-gray-800 border-opacity-60`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`} target="_blank">
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-top md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-top md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col justify-between">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-white">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`} rel="nofollow">
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-400">{description}</p>
        </div>
        {techStack && techStack.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-1 items-end justify-between">
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-sky-500 hover:text-sky-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
          {status && <div className="text-red-500">{status}</div>}
        </div>
      </div>
    </div>
  </div>
)

export default Card
