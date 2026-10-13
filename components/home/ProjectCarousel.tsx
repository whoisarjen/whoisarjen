'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/components/Image'

export type CarouselProject = {
  title: string
  description: string
  href: string
  imgSrc: string
  techStack: string[]
}

interface Props {
  projects: CarouselProject[]
  labels: { region: string; previous: string; next: string; visit: string }
}

export default function ProjectCarousel({ projects, labels }: Props) {
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(false)
  const startX = useRef<number | null>(null)
  const swiped = useRef(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const n = projects.length

  useEffect(() => {
    const mq = matchMedia('(max-width: 860px)')
    const sync = () => setMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = regionRef.current
    if (!el || !n) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowRight') setActive((a) => (a + 1) % n)
      if (ev.key === 'ArrowLeft') setActive((a) => (a - 1 + n) % n)
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [n])

  if (!n) return null

  const offset = (i: number) => {
    let d = (i - active + n) % n
    if (d > n / 2) d -= n
    return d
  }
  const go = (dir: number) => setActive((a) => (a + dir + n) % n)
  const current = projects[active]

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region} ref={regionRef}>
      <div
        className="relative h-[min(calc((100vw-32px)*0.6),clamp(240px,36vw,470px))] touch-pan-y select-none"
        onPointerDown={(ev) => {
          startX.current = ev.clientX
        }}
        onPointerUp={(ev) => {
          if (startX.current === null) return
          const dx = ev.clientX - startX.current
          startX.current = null
          swiped.current = Math.abs(dx) > 40
          if (swiped.current) go(dx < 0 ? 1 : -1)
        }}
      >
        {projects.map((p, i) => {
          const d = offset(i)
          const abs = Math.abs(d)
          return (
            <div
              key={p.title}
              aria-hidden={d !== 0}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false
                  return
                }
                if (d !== 0) go(d)
              }}
              className={`absolute left-1/2 top-0 aspect-[16/9.6] h-full transition-[transform,opacity,filter] duration-[600ms] ease-in-out-strong [translate:-50%_0] motion-reduce:transition-opacity motion-reduce:duration-300 ${d === 0 ? 'cursor-default' : 'cursor-pointer'}`}
              style={{
                transform: `translateX(${d * (mobile ? 100 : 104)}%) scale(${d === 0 ? 1 : 0.78})`,
                opacity: abs === 0 ? 1 : abs === 1 ? 0.3 : 0,
                filter: abs === 0 ? 'none' : 'grayscale(.6) blur(1px)',
                zIndex: 10 - abs,
                pointerEvents: abs > 1 ? 'none' : 'auto',
              }}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-[#0e1215] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.08)]">
                <div className="flex flex-none items-center gap-1.5 bg-[#1a2026] px-3 py-2.5">
                  <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
                  <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
                  <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
                  <span className="ml-2.5 rounded-md bg-[#0e1215] px-2.5 py-0.5 font-mono text-[10px] text-gray-400">
                    {p.href.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={p.imgSrc}
                    alt=""
                    fill
                    sizes="(min-width: 860px) 60vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 grid items-end gap-6 sm:grid-cols-[1fr_auto]">
        <div aria-live="polite">
          <div className="eyebrow">
            {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </div>
          <h3 className="mb-1.5 mt-2 text-[clamp(26px,3vw,42px)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            {current.title}
          </h3>
          <p className="max-w-[58ch] text-gray-400">{current.description}</p>
          {current.techStack.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {current.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ink-3 px-2.5 py-1 font-mono text-[11px] text-sky-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-300 underline-offset-4 hover:underline"
          >
            {labels.visit} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="flex gap-2.5">
          {[
            { dir: -1, label: labels.previous, d: 'M15 18l-6-6 6-6' },
            { dir: 1, label: labels.next, d: 'M9 18l6-6-6-6' },
          ].map((b) => (
            <button
              key={b.dir}
              type="button"
              aria-label={b.label}
              onClick={() => go(b.dir)}
              className="grid h-[52px] w-[52px] place-items-center rounded-full text-gray-100 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)] transition-[transform,box-shadow] duration-200 hover:shadow-[inset_0_0_0_1px_theme(colors.sky.300)] active:scale-[0.94]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d={b.d} />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 flex gap-1.5" aria-hidden="true">
        {projects.map((p, i) => (
          <span
            key={p.title}
            className={`h-[3px] w-[22px] rounded-sm transition-colors duration-300 ${i === active ? 'bg-sky-300' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  )
}
