import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-[clamp(32px,4.4vw,60px)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
      {children}
    </h1>
  )
}
