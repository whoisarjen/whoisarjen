'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Image from '@/components/Image'

interface Props {
  intro: ReactNode
  reveal: ReactNode
  scrollLabel: string
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function HeroZoom({ intro, reveal, scrollLabel }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 860px)')
    const els = [
      heroRef.current,
      stageRef.current,
      browserRef.current,
      ghostRef.current,
      scrimRef.current,
      introRef.current,
      revealRef.current,
      hintRef.current,
      cornersRef.current,
    ]
    if (els.some((el) => !el)) return
    const [hero, stage, browser, ghost, scrim, introEl, revealEl, hint, corners] =
      els as HTMLElement[]
    const show = (el: HTMLElement, v: number) => {
      el.style.opacity = String(v)
      el.style.visibility = v < 0.01 ? 'hidden' : 'visible'
    }

    let ticking = false
    const frame = () => {
      ticking = false
      const w = innerWidth
      const h = innerHeight
      const p = clamp(-hero.getBoundingClientRect().top / (hero.offsetHeight - h))
      const still = reduce.matches
      const e = still ? (p > 0.45 ? 1 : 0) : easeInOut(clamp(p / 0.6))
      const k = 1 - e
      const g = mobile.matches
        ? { t: 0.13 * h, r: 0.05 * w, b: 0.5 * h, l: 0.05 * w }
        : { t: 0.15 * h, r: 0.44 * w, b: 0.1 * h, l: 0.05 * w }
      stage.style.clipPath = `inset(${g.t * k}px ${g.r * k}px ${g.b * k}px ${g.l * k}px round ${18 * k}px)`

      const cx = lerp(g.l + (w - g.l - g.r) / 2, mobile.matches ? w * 0.5 : w * 0.68, e)
      const cy = lerp(g.t + (h - g.t - g.b) / 2, mobile.matches ? h * 0.32 : h * 0.52, e)
      const s = lerp(1, mobile.matches ? 1.05 : 1.45, e)
      browser.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${s}) rotate(${lerp(-2, 0, e)}deg)`
      ghost.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${lerp(1, 1.4, e)})`
      ghost.style.opacity = String(lerp(1, 0.35, e))

      const o = still ? k : 1 - clamp(p / 0.2)
      show(introEl, o)
      introEl.style.transform = still ? 'none' : `translateY(${-p * 60}px)`
      hint.style.opacity = String(o)

      const r = still ? e : clamp((p - 0.55) / 0.25)
      show(revealEl, r)
      revealEl.style.transform = still ? 'none' : `translateY(${(1 - r) * 28}px)`
      scrim.style.opacity = String(r)
      corners.style.opacity = String(r)
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(frame)
      }
    }
    addEventListener('scroll', request, { passive: true })
    addEventListener('resize', request)
    reduce.addEventListener('change', request)
    frame()
    return () => {
      removeEventListener('scroll', request)
      removeEventListener('resize', request)
      reduce.removeEventListener('change', request)
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-[320vh]" aria-labelledby="hero-title">
      <div className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-[100svh]">
        <div
          ref={stageRef}
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_40%,#26303a_0%,#141a20_60%,#0a0d10_100%)] [clip-path:inset(13vh_5vw_50vh_5vw_round_16px)] min-[861px]:[clip-path:inset(15vh_44vw_10vh_5vw_round_18px)]"
        >
          <div
            ref={ghostRef}
            className="absolute left-0 top-0 select-none whitespace-nowrap text-[min(46vh,30vw)] font-extrabold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:2px_rgb(125_211_252/0.28)] [transform:translate(50vw,31.5vh)_translate(-50%,-50%)] min-[861px]:[transform:translate(30.5vw,52.5vh)_translate(-50%,-50%)]"
          >
            -92%
          </div>
          <div
            ref={scrimRef}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(8_10_12/0.92)_0%,rgb(8_10_12/0.6)_50%,rgb(8_10_12/0.2)_100%)] opacity-0 min-[861px]:bg-[linear-gradient(90deg,rgb(8_10_12/0.9)_0%,rgb(8_10_12/0.65)_40%,rgb(8_10_12/0.1)_75%)]"
          />
        </div>

        <figure
          ref={browserRef}
          aria-hidden="true"
          className="absolute left-0 top-0 m-0 w-[78vw] overflow-hidden rounded-xl bg-[#0e1215] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.08)] [transform:translate(50vw,31.5vh)_translate(-50%,-50%)] min-[861px]:w-[min(36vw,620px)] min-[861px]:[transform:translate(30.5vw,52.5vh)_translate(-50%,-50%)_rotate(-2deg)]"
        >
          <div className="flex items-center gap-1.5 bg-[#1a2026] px-3 py-2.5">
            <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
            <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
            <i className="h-2 w-2 rounded-full bg-[#3a434b]" />
            <span className="ml-2.5 rounded-md bg-[#0e1215] px-2.5 py-0.5 font-mono text-[10px] text-gray-400">
              deante.pl
            </span>
          </div>
          <Image
            src="/static/images/hero-deante.jpg"
            alt=""
            width={1920}
            height={1080}
            priority
            sizes="(min-width: 860px) 52vw, 82vw"
            className="aspect-video w-full object-cover object-top"
          />
        </figure>

        <div ref={cornersRef} className="opacity-0" aria-hidden="true">
          <span className="absolute left-6 top-[88px] h-[22px] w-[22px] border-l border-t border-white/50" />
          <span className="absolute bottom-6 right-6 h-[22px] w-[22px] border-b border-r border-white/50" />
        </div>

        <div
          ref={introRef}
          className="absolute inset-x-[5vw] bottom-[5vh] flex h-[42vh] flex-col justify-between min-[861px]:inset-x-auto min-[861px]:bottom-[10vh] min-[861px]:right-[5vw] min-[861px]:top-[15vh] min-[861px]:h-auto min-[861px]:w-[35vw]"
        >
          {intro}
        </div>

        <div
          ref={revealRef}
          className="invisible absolute inset-x-5 bottom-[8vh] opacity-0 min-[861px]:inset-x-auto min-[861px]:bottom-auto min-[861px]:left-[clamp(20px,6vw,96px)] min-[861px]:top-1/2 min-[861px]:max-w-[min(560px,46vw)] min-[861px]:[translate:0_-50%]"
        >
          {reveal}
        </div>

        <div
          ref={hintRef}
          aria-hidden="true"
          className="absolute bottom-[3vh] left-1/2 hidden -translate-x-1/2 items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 min-[861px]:flex"
        >
          <i className="h-[26px] w-px bg-gradient-to-b from-sky-300 to-transparent" />
          {scrollLabel}
        </div>
      </div>
    </section>
  )
}
