import { Link } from 'i18n/navigation'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 font-mono text-xs uppercase tracking-[0.06em] text-sky-300 hover:text-sky-200"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
