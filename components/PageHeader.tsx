import { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
}

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-12 grid items-end gap-6 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_1fr] md:gap-8">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="display mt-3 text-[clamp(40px,6.4vw,96px)] leading-[0.9] tracking-[-0.045em] text-white">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="max-w-[48ch] text-[17px] text-gray-400 md:justify-self-end">{subtitle}</p>
      )}
    </div>
  )
}
