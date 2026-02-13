import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { getProjects } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts).slice(0, siteMetadata.postsPerPage)
  const projects = await getProjects()
  return <Main posts={posts} projects={projects} />
}
