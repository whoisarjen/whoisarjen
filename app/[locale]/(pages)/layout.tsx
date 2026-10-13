import { ReactNode } from 'react'

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">{children}</div>
}
