'use client'

import { useEffect } from 'react'

export default function RiseObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll<HTMLElement>('.rise').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return null
}
