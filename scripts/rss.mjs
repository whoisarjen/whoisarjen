import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const generateRssItem = (config, post, localePrefix) => `
  <item>
    <guid>${config.siteUrl}${localePrefix}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}${localePrefix}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page, localePrefix, language, description) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}${localePrefix}/blog</link>
      <description>${escape(description)}</description>
      <language>${language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post, localePrefix)).join('')}
    </channel>
  </rss>
`

async function generateRSSForLocale(config, posts) {
  const localePrefix = ''
  const { language, description } = config
  const publishPosts = posts.filter((post) => post.draft !== true)
  if (publishPosts.length === 0) return

  const feedPath = 'feed.xml'
  writeFileSync(
    path.join('public', feedPath),
    generateRss(config, sortPosts(publishPosts), feedPath, localePrefix, language, description)
  )

  for (const tag of Object.keys(tagData)) {
    const filteredPosts = publishPosts.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
    if (filteredPosts.length === 0) continue
    const tagFeedPath = path.join('tags', tag, 'feed.xml')
    mkdirSync(path.dirname(path.join('public', tagFeedPath)), { recursive: true })
    writeFileSync(
      path.join('public', tagFeedPath),
      generateRss(config, filteredPosts, tagFeedPath, localePrefix, language, description)
    )
  }
}

const rss = () => {
  generateRSSForLocale(
    siteMetadata,
    allBlogs.filter((p) => p.locale === 'en')
  )
  console.log('RSS feeds generated...')
}
export default rss
