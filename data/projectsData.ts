import fs from 'fs'
import path from 'path'
import { getGitHubProjects, type GitHubProject } from '@/lib/github'

export type Project = {
  title: string
  description: string
  descriptionPl?: string
  href: string
  imgSrc: string
  repoUrl?: string
  topics?: string[]
  highlighted?: boolean
  techStack: string[]
}

// Highlighted projects shown first, in this exact order.
// Remaining projects follow sorted freshest-to-oldest (GitHub API updated order).
const highlightedProjects: string[] = [
  'Comscore',
  'Deante',
  'Deante Design Studio',
  'Juicify Open Source',
  'Digital Nomad',
  'Logify',
  'Ratio',
]

// Overrides keyed by formatted repo name (after formatRepoName in lib/github.ts).
// Use this to customize how a specific GitHub repo appears.
const overrides: Record<string, Partial<Project>> = {
  Mypress: {
    title: 'MyPress',
    descriptionPl:
      'MyPress — otwartoźródłowa platforma do samodzielnej publikacji dla pisarzy. Publikuj, sprzedawaj i dystrybuuj swoje książki przy prowizji zaledwie 2%.',
    href: 'https://mypress.whoisarjen.com',
    imgSrc: '/static/images/projects/project-mypress.png',
    techStack: ['Nuxt 3', 'TypeScript', 'PostgreSQL'],
  },
  Investo: {
    title: 'Investo',
    descriptionPl:
      'Otwartoźródłowy tracker inwestycji w ETF-y. Śledź swoje portfolio lokalnie w przeglądarce — bez konieczności zakładania konta.',
    href: 'https://investo.whoisarjen.com',
    imgSrc: '/static/images/projects/project-investo.png',
    techStack: ['Next.js', 'TypeScript'],
  },
  'Juicify Open Source': {
    title: 'Juicify',
    descriptionPl:
      'Otwartoźródłowa platforma fitness oparta na AI — liczenie kalorii, plany treningowe i coaching dietetyczny w czasie rzeczywistym.',
    href: 'https://juicify.whoisarjen.com',
    imgSrc: '/static/images/projects/project-juicify.png',
    techStack: ['React', 'Next.js', 'TypeScript', 'Prisma'],
  },
  Riftlens: {
    title: 'RiftLens',
    descriptionPl:
      'Otwartoźródłowa platforma analityczna League of Legends — głęboki wgląd w Rift.',
    href: 'https://riftlens.whoisarjen.com',
    imgSrc: '/static/images/projects/project-riftlens.png',
    techStack: ['Next.js', 'TypeScript'],
  },
  Parallax: {
    title: 'Parallax',
    descriptionPl:
      'Wysoce precyzyjny silnik estymacji nowej generacji dla Jiry. Synchronizuje konsensus zespołu poprzez wieloperspektywiczną analizę trajektorii, aby z naukową dokładnością określić złożoność backlogu.',
    href: 'https://parallax.whoisarjen.com',
    imgSrc: '/static/images/projects/project-parallax.png',
    techStack: ['Next.js', 'TypeScript'],
  },
  Logify: {
    title: 'Logify',
    descriptionPl:
      'Otwartoźródłowa platforma do zarządzania logami. Zbieraj, przeszukuj i wizualizuj logi swojej aplikacji w czasie rzeczywistym. Zbudowana z Nuxt 4, Prisma i Neon PostgreSQL.',
    href: 'https://logify.whoisarjen.com',
    imgSrc: '/static/images/projects/project-logify.png',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  Beamback: {
    title: 'Beamback',
    descriptionPl:
      'Otwartoźródłowe narzędzie do zbierania opinii dla Twojego MVP. Jeden tag skryptu daje Ci widget, tablicę głosowań i roadmapę.',
    href: 'https://beamback.whoisarjen.com',
    imgSrc: '/static/images/projects/project-beamback.png',
    techStack: ['Next.js', 'TypeScript'],
  },
  Splito: {
    title: 'Splito',
    description:
      'Open-source expense sharing app. Split bills with friends, track group expenses, and settle up in any currency.',
    descriptionPl:
      "Open-source'owa aplikacja do dzielenia wydatków. Rozliczaj rachunki ze znajomymi, śledź wydatki grupowe i rozliczaj się w dowolnej walucie.",
    href: 'https://splito.whoisarjen.com',
    imgSrc: '/static/images/projects/project-splito.png',
    techStack: ['Nuxt 4', 'TypeScript', 'PostgreSQL', 'Prisma'],
  },
  Callout: {
    title: 'Callout',
    description:
      'Open-source call-to-action component library. Drop-in banners, modals, and notification bars for any website.',
    descriptionPl:
      "Open-source'owa biblioteka komponentów call-to-action. Gotowe banery, modale i paski powiadomień dla dowolnej strony.",
    href: 'https://callout.whoisarjen.com',
    imgSrc: '/static/images/projects/project-callout.png',
    techStack: ['Next.js', 'TypeScript'],
  },
}

// Extra projects that are NOT on GitHub.
// Projects with a live href get dynamic Microlink screenshots.
// Projects without a live site use hardcoded images.
const extraProjects: Project[] = [
  {
    title: 'Deante',
    description:
      'A collaborative project developed with Deante, a leading Polish manufacturer of kitchen and bathroom fittings.',
    descriptionPl:
      'Projekt realizowany we współpracy z Deante — wiodącym polskim producentem armatury kuchennej i łazienkowej.',
    imgSrc: '/static/images/projects/project-deante.png',
    href: 'https://deante.pl',
    techStack: ['Vue', 'Nuxt 3', 'PostgreSQL', 'Redis', 'TypeScript'],
  },
  {
    title: 'Deante Design Studio',
    description:
      'A platform for architects and designers featuring 3D models, bathroom and kitchen collections, and design resources from Deante.',
    descriptionPl:
      'Platforma dla architektów i projektantów: modele 3D, kolekcje łazienkowe i kuchenne oraz materiały projektowe Deante.',
    imgSrc: '/static/images/projects/project-deante-design-studio.png',
    href: 'https://deantedesign.studio',
    techStack: ['Vue', 'Nuxt 3', 'TypeScript'],
  },
  {
    title: 'Comscore',
    description:
      'A trusted media measurement platform providing cross-platform audience analytics and advertising evaluation services.',
    descriptionPl:
      'Zaufana platforma pomiaru mediów dostarczająca międzyplatformową analitykę oglądalności i ocenę skuteczności reklam.',
    imgSrc: '/static/images/projects/project-comscore.png',
    href: 'https://www.comscore.com',
    techStack: ['React', 'TypeScript'],
  },
  {
    title: 'Digital Nomad',
    description:
      'Compare 500+ cities by cost of living, weather, internet speed, safety and more, filtered to what matters most to you. Built for digital nomads, remote workers and expats.',
    descriptionPl:
      'Porównaj ponad 500 miast pod kątem kosztów życia, pogody, szybkości internetu i bezpieczeństwa, z filtrami dopasowanymi do tego, co dla Ciebie ważne.',
    imgSrc: '/static/images/projects/project-digital-nomad.png',
    href: 'https://nomad.whoisarjen.com',
    techStack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
  {
    title: 'Arjenworld',
    description:
      'My blog documenting my life journey and being my SEO strategies experiment place, which was successfully sold.',
    descriptionPl:
      'Mój blog dokumentujący życiową podróż i poligon doświadczalny strategii SEO — z sukcesem sprzedany.',
    imgSrc: '/static/images/projects/project-arjenworld.png',
    href: 'https://arjenworld.pl',
    techStack: ['WordPress', 'SEO'],
  },
  {
    title: 'Game Boosting Service',
    description:
      'A professional game boosting service platform designed to help gamers enhance their gaming experience and achieve their in-game goals.',
    descriptionPl:
      'Profesjonalna platforma boostingu w grach, pomagająca graczom osiągać cele w ulubionych tytułach.',
    imgSrc: '/static/images/projects/project-boosteria.jpg',
    href: '/static/images/projects/project-boosteria.jpg',
    techStack: ['WordPress', 'PHP'],
  },
  {
    title: 'Personal Trainer',
    description:
      'A dynamic and user-centric personal trainer platform designed to help clients achieve their fitness goals.',
    descriptionPl: 'Platforma trenera personalnego pomagająca klientom osiągać cele fitness.',
    imgSrc: '/static/images/projects/project-personal-trainer.jpg',
    href: '/static/images/projects/project-personal-trainer.jpg',
    techStack: ['WordPress', 'PHP'],
  },
  {
    title: 'Football Club News',
    description:
      'A comprehensive football club news platform designed to keep fans informed and engaged.',
    descriptionPl: 'Serwis informacyjny klubu piłkarskiego, utrzymujący kibiców na bieżąco.',
    imgSrc: '/static/images/projects/project-liverpool.png',
    href: '/static/images/projects/project-liverpool.png',
    techStack: ['WordPress', 'PHP'],
  },
  {
    title: 'Virtual Private Network',
    description:
      "A secure and user-friendly VPN service platform designed to protect users' online privacy and enhance their internet experience.",
    descriptionPl:
      'Bezpieczna i przyjazna platforma VPN chroniąca prywatność użytkowników w sieci.',
    imgSrc: '/static/images/projects/project-vpn.png',
    href: '/static/images/projects/project-vpn.png',
    techStack: ['WordPress', 'PHP'],
  },
]

const topicMap: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  react: 'React',
  nextjs: 'Next.js',
  nuxt: 'Nuxt',
  nuxtjs: 'Nuxt',
  vue: 'Vue',
  vuejs: 'Vue',
  nodejs: 'Node.js',
  postgresql: 'PostgreSQL',
  postgres: 'PostgreSQL',
  redis: 'Redis',
  prisma: 'Prisma',
  tailwindcss: 'Tailwind CSS',
  tailwind: 'Tailwind CSS',
  docker: 'Docker',
  graphql: 'GraphQL',
  python: 'Python',
  go: 'Go',
  rust: 'Rust',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  php: 'PHP',
  wordpress: 'WordPress',
}

function topicsToTechStack(topics: string[]): string[] {
  const seen = new Set<string>()
  const stack: string[] = []
  for (const topic of topics) {
    const label = topicMap[topic.toLowerCase()]
    if (label && !seen.has(label)) {
      seen.add(label)
      stack.push(label)
    }
  }
  return stack
}

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  const githubProjects = await getGitHubProjects()

  const projects: Project[] = githubProjects.map((ghProject: GitHubProject) => {
    const override = overrides[ghProject.title]
    const project = {
      ...ghProject,
      techStack: override?.techStack ?? topicsToTechStack(ghProject.topics),
      ...override,
    }

    // Prefer local static screenshots over Microlink API URLs.
    // If no imgSrc override was set, check if a local file exists at the
    // conventional path: /static/images/projects/project-<repoName>.png
    if (!override?.imgSrc) {
      const localPath = `/static/images/projects/project-${ghProject.repoName.toLowerCase()}.png`
      if (fs.existsSync(path.join(process.cwd(), 'public', localPath))) {
        project.imgSrc = localPath
      }
    }

    return project
  })

  // Combine all projects for highlight lookup
  const allProjects = [...projects, ...extraProjects]

  // Mark highlighted projects
  for (const project of allProjects) {
    const hlIdx = highlightedProjects.indexOf(project.title)
    const hlOrigIdx =
      hlIdx === -1
        ? highlightedProjects.findIndex((name) => overrides[name]?.title === project.title)
        : hlIdx
    if (hlOrigIdx !== -1) {
      project.highlighted = true
    }
  }

  // Sort: highlighted first (in specified order), then rest in API order (freshest to oldest), then extra
  const highlighted: Project[] = []
  for (const name of highlightedProjects) {
    const override = overrides[name]
    const match = allProjects.find(
      (p) => p.title === name || (override?.title && p.title === override.title)
    )
    if (match) highlighted.push(match)
  }
  const restGithub = projects.filter((p) => !p.highlighted)
  const restExtra = extraProjects.filter((p) => !p.highlighted)

  const ordered = [...highlighted, ...restGithub, ...restExtra]
  if (locale === 'pl') {
    return ordered.map((p) => (p.descriptionPl ? { ...p, description: p.descriptionPl } : p))
  }
  return ordered
}
