const GITHUB_USERNAME = 'whoisarjen'
const PORTFOLIO_REPO = 'whoisarjen' // exclude the portfolio repo itself

export type GitHubProject = {
  title: string
  description: string
  href: string
  imgSrc: string
  repoUrl: string
  topics: string[]
}

export async function getGitHubProjects(): Promise<GitHubProject[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    console.error('Failed to fetch GitHub repos:', res.statusText)
    return []
  }

  const repos: Array<{
    name: string
    description: string | null
    homepage: string | null
    html_url: string
    topics: string[]
    private: boolean
    archived: boolean
    fork: boolean
  }> = await res.json()

  return repos
    .filter((repo) => !repo.private && !repo.archived && !repo.fork && repo.name !== PORTFOLIO_REPO)
    .map((repo) => {
      const title = formatRepoName(repo.name)
      const description = repo.description || ''
      const hasLiveSite = repo.homepage && !repo.homepage.includes('github.com')

      return {
        title,
        description,
        href: repo.homepage || repo.html_url,
        imgSrc: hasLiveSite
          ? getScreenshotUrl(repo.homepage!)
          : `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        repoUrl: repo.html_url,
        topics: repo.topics || [],
      }
    })
}

function getScreenshotUrl(url: string): string {
  // Weekly cache key — screenshots refresh once per week
  const now = new Date()
  const weekKey = `${now.getFullYear()}-W${Math.ceil(((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7)}`

  const params = new URLSearchParams({
    url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    waitUntil: 'networkidle0',
    waitForTimeout: '10000',
    type: 'png',
    'viewport.width': '1280',
    'viewport.height': '720',
    _cache: weekKey,
  })
  return `https://api.microlink.io?${params.toString()}`
}

function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
