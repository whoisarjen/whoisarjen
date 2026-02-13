import { getGitHubProjects, type GitHubProject } from '@/lib/github'

export type Project = {
  title: string
  description: string
  href: string
  imgSrc: string
  repoUrl?: string
  topics?: string[]
}

// Display order for GitHub projects. Projects not listed here appear after these.
const displayOrder: string[] = [
  'Parallax',
  'Juicify Open Source',
  'Digital Nomad',
  'Titanizo',
]

// Overrides keyed by formatted repo name (after formatRepoName in lib/github.ts).
// Use this to customize how a specific GitHub repo appears.
const overrides: Record<string, Partial<Project>> = {
  'Juicify Open Source': {
    title: 'Juicify',
  },
  Parallax: {
    href: 'https://parallax.whoisarjen.com',
  },
}

// Extra projects that are NOT on GitHub (cooperations, sold, abandoned, etc.)
const extraProjects: Project[] = [
  {
    title: 'Deante',
    description:
      'A collaborative project developed with Deante, a leading Polish manufacturer of kitchen and bathroom fittings.',
    imgSrc: '/static/images/projects/project-deante.png',
    href: 'https://deante.pl',
  },
  {
    title: 'Arjenworld',
    description:
      'My blog documenting my life journey and being my SEO strategies experiment place, which was successfully sold.',
    imgSrc: '/static/images/projects/project-arjenworld.png',
    href: 'https://arjenworld.pl',
  },
  {
    title: 'Game Boosting Service',
    description:
      'A professional game boosting service platform designed to help gamers enhance their gaming experience and achieve their in-game goals.',
    imgSrc: '/static/images/projects/project-boosteria.jpg',
    href: '/static/images/projects/project-boosteria.jpg',
  },
  {
    title: 'Personal Trainer',
    description:
      'A dynamic and user-centric personal trainer platform designed to help clients achieve their fitness goals.',
    imgSrc: '/static/images/projects/project-personal-trainer.jpg',
    href: '/static/images/projects/project-personal-trainer.jpg',
  },
  {
    title: 'Football Club News',
    description:
      'A comprehensive football club news platform designed to keep fans informed and engaged.',
    imgSrc: '/static/images/projects/project-liverpool.png',
    href: '/static/images/projects/project-liverpool.png',
  },
  {
    title: 'Virtual Private Network',
    description:
      'A secure and user-friendly VPN service platform designed to protect users\' online privacy and enhance their internet experience.',
    imgSrc: '/static/images/projects/project-vpn.png',
    href: '/static/images/projects/project-vpn.png',
  },
]

export async function getProjects(): Promise<Project[]> {
  const githubProjects = await getGitHubProjects()

  const projects: Project[] = githubProjects.map((ghProject: GitHubProject) => {
    const override = overrides[ghProject.title]
    return {
      ...ghProject,
      ...override,
    }
  })

  // Sort GitHub projects by displayOrder, then the rest alphabetically
  projects.sort((a, b) => {
    const aIdx = displayOrder.indexOf(a.title)
    const bIdx = displayOrder.indexOf(b.title)
    // Check against original title too (before override renames)
    const aOrigIdx = aIdx === -1 ? displayOrder.findIndex((name) => overrides[name]?.title === a.title) : aIdx
    const bOrigIdx = bIdx === -1 ? displayOrder.findIndex((name) => overrides[name]?.title === b.title) : bIdx
    const aOrder = aOrigIdx !== -1 ? aOrigIdx : displayOrder.length
    const bOrder = bOrigIdx !== -1 ? bOrigIdx : displayOrder.length
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.title.localeCompare(b.title)
  })

  return [...projects, ...extraProjects]
}
