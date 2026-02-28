import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children }: Props) {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            {siteMetadata.avatar && (
              <Image
                src={siteMetadata.avatar}
                alt={siteMetadata.author}
                width={256}
                height={256}
                className="h-64 w-64 rounded-full"
              />
            )}
            <h3 className="pb-1 pt-6 text-3xl font-bold leading-8 tracking-tight text-white">
              {siteMetadata.author}
            </h3>
            <p className="pb-2 pt-1 text-sm font-medium text-gray-400">
              Senior Full-Stack Engineer
            </p>
            <div className="flex space-x-3 pt-4">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            </div>
          </div>
          <div className="prose prose-invert max-w-none pb-8 pt-8 text-gray-300 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
