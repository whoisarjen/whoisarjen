/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Kamil Owczarek | Senior Full-Stack Engineer',
  author: 'Kamil Owczarek',
  postsPerPage: 40,
  avatar: '/static/images/avatar.png',
  headerTitle: 'Kamil Owczarek',
  description:
    'Senior Full-Stack Engineer specializing in high-performance e-commerce, scalable architecture, and performance optimization. TypeScript, React, Next.js, Vue, Nuxt, PostgreSQL, Redis.',
  language: 'en-us',
  theme: 'dark',
  siteUrl: 'https://whoisarjen.com',
  siteRepo: 'https://github.com/whoisarjen/whoisarjen.com',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'kamilow97@gmail.com',
  github: 'https://github.com/whoisarjen',
  linkedin: 'https://www.linkedin.com/in/kamil-owczarek-240ab6233',
  locale: 'en-US',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
    googleAnalytics: {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    },
  },
  cookieyes: process.env.NEXT_PUBLIC_COOKIEYES,
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'transparent_dark',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
}

module.exports = siteMetadata
