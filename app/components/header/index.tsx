import { useMemo } from 'react'
import { FiArrowLeft, FiUser } from 'react-icons/fi'
import { Link, useMatches } from 'remix'
import { Icon } from '../icon'

type Props = {
  authorized: boolean
}

const pageTitles: { [key: string]: string } = {
  '/': '',
  '/burgers': "The Best Burgers I've Ever Had",
  '/color': 'Convert Colors',
  '/recipes': 'Recipes',
  '/bookmarks': 'Bookmarks',
  '/sign-in': 'Sign In',
  '/sign-up': 'Sign Up',
}

export const Header: React.FC<Props> = ({ authorized }) => {
  const matches = useMatches()

  const [title, pathname] = useMemo(() => {
    if (matches.length >= 3) {
      // Skip root & layout __app matchers
      const { pathname } = matches[2]
      return [pageTitles[pathname], pathname]
    }
    return ''
  }, [matches])

  return (
    <div className="flex py-5">
      <div className="flex flex-1 items-center">
        {pathname !== '/' && (
          <Link to=".." aria-label="go back">
            <Icon Icon={FiArrowLeft} />
          </Link>
        )}
      </div>
      <div className="flex-[4_2_0%] w-full capitalize">{title && <h1 className="text-center mb-0">{title}</h1>}</div>
      <div className=" flex-1 w-full">
        <div className="flex justify-end items-center gap-8 h-full">
          {!!authorized ||
            (title !== 'Sign In' && title !== 'Sign Up' && (
              <Link
                to="/sign-in"
                className={`
                py-2 px-2 md:px-4 border rounded-md
                border-gray-800/50 hover:border-gray-800 hover:bg-gray-800/[.2] focus:bg-gray-800[.02]
                dark:border-white/50 dark:hover:border-white dark:hover:bg-white/[.2] dark:focus:bg-white/[.2]
              `}
              >
                <span className="hidden md:block">Sign In</span>
                <span className="md:hidden">
                  <FiUser />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
