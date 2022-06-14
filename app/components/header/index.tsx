import { useMemo } from 'react'
import { useMatches } from 'remix'
import { Menu } from '../menu'

type Props = {
  authorized: boolean
}

const pageTitles: { [key: string]: string } = {
  '/': '',
  '/about': 'About',
  '/burgers': "The Best Burgers I've Ever Had",
  '/color': 'Convert Colors',
  '/recipes': 'Recipes',
  '/recipes/add': 'Add Recipe',
  '/bookmarks': 'Bookmarks',
  '/sign-in': 'Sign In',
  '/sign-up': 'Sign Up',
}

export const Header: React.FC<Props> = ({ authorized }) => {
  const matches = useMatches()

  const title = useMemo(() => {
    if (matches.length >= 3) {
      // Skip root & layout __app matchers
      const { pathname } = matches[2]
      return pageTitles[pathname]
    }
    return ''
  }, [matches])

  return (
    <div className="flex py-5">
      <div className="flex-1"></div>
      <div className="flex-[4_2_0%] w-full capitalize">{title && <h1 className="text-center mb-0">{title}</h1>}</div>
      <div className=" flex-1 w-full">
        <div className="flex justify-end items-center gap-8 h-full">
          <Menu authorized={authorized} />
        </div>
      </div>
    </div>
  )
}
