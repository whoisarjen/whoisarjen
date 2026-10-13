import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'hire' })
  return genPageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale: params.locale,
    path: '/hire',
  })
}

export default function HirePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const t = useTranslations('hire')

  const skills = [
    { title: t('skill1Title'), description: t('skill1Desc') },
    { title: t('skill2Title'), description: t('skill2Desc') },
    { title: t('skill3Title'), description: t('skill3Desc') },
    { title: t('skill4Title'), description: t('skill4Desc') },
  ]

  const metrics = [
    { value: '-60%', label: t('metric1') },
    { value: '6x', label: t('metric2') },
    { value: '+80%', label: t('metric3') },
    { value: '13', label: t('metric4') },
    { value: '15+', label: t('metric5') },
    { value: '35', label: t('metric6') },
  ]

  const idealRoles = [t('role1'), t('role2'), t('role3'), t('role4'), t('role5')]

  return (
    <div>
      <section className="border-b border-white/10 pb-14">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-sky-300 px-3.5 py-2 text-[13px] font-semibold text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-900" aria-hidden="true" />
          {t('badge')}
        </div>
        <h1 className="display text-[clamp(44px,7.4vw,120px)] leading-[0.88] tracking-[-0.05em] text-white">
          {t('heroTitle1')} <span className="text-sky-300">{t('heroTitle2')}</span>
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-gray-300">{t('heroSubtitle')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`mailto:${siteMetadata.email}`} className="btn btn-accent">
            {t('emailMe')}
          </Link>
          <Link href={siteMetadata.linkedin || '#'} className="btn btn-ghost">
            LinkedIn
          </Link>
          <Link href={siteMetadata.github || '#'} className="btn btn-ghost">
            GitHub
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="eyebrow">01</div>
        <h2 className="display mb-10 mt-3 text-[clamp(32px,4.4vw,64px)] text-white">
          {t('whatIBring')}
        </h2>
        <ol className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <li
              key={skill.title}
              className="bg-ink px-6 pb-8 pt-7 sm:first:pl-0 sm:[&:nth-child(3)]:pl-0"
            >
              <span className="font-mono text-xs text-sky-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 mt-3 text-[22px] font-semibold tracking-[-0.015em] text-white">
                {skill.title}
              </h3>
              <p className="text-[15px] text-gray-400">{skill.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="-mx-4 bg-bone px-4 py-16 text-ink sm:-mx-6 sm:px-6 sm:py-20 lg:-mx-8 lg:rounded-[22px] lg:px-10">
        <div className="eyebrow !text-sky-800">02</div>
        <h2 className="display mb-10 mt-3 text-[clamp(32px,4.4vw,64px)]">{t('byTheNumbers')}</h2>
        <div className="grid grid-cols-2 gap-px border-y border-ink/15 bg-ink/15 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="bg-bone px-5 py-7">
              <b className="block text-[clamp(44px,6vw,88px)] font-bold leading-[0.9] tracking-[-0.06em]">
                {m.value}
              </b>
              <span className="mt-3 block font-semibold">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="eyebrow">03</div>
        <h2 className="display mb-8 mt-3 text-[clamp(32px,4.4vw,64px)] text-white">
          {t('idealRoles')}
        </h2>
        <ul className="border-t border-white/10">
          {idealRoles.map((role) => (
            <li key={role} className="border-b border-white/10 py-4 text-lg text-gray-100">
              {role}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10 pt-16 sm:pt-20">
        <h2 className="display text-[clamp(40px,6vw,96px)] leading-[0.9] tracking-[-0.045em] text-white">
          {t('readyTitle')}
        </h2>
        <p className="mt-4 max-w-[46ch] text-[17px] text-gray-300">{t('readySubtitle')}</p>
        <Link href={`mailto:${siteMetadata.email}`} className="btn btn-accent mt-8">
          {t('emailMe')}
        </Link>
      </section>
    </div>
  )
}
