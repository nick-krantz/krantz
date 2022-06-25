import { useMemo } from 'react'
import { FiArrowLeft, FiUser } from 'react-icons/fi'
import { Link, useMatches } from 'remix'
import { Icon } from '../icon'

type Props = {
  authorized: boolean
}

export type PageDetails = {
  header?: string
  backLink?: string
}

export const Header: React.FC<Props> = ({ authorized }) => {
  const matches = useMatches()

  const [title, pathname, backLink] = useMemo(() => {
    const reverseMatches = [...matches].reverse()

    const header = reverseMatches.find((m) => m?.data?.pageDetails?.header)?.data.pageDetails.header
    const backLink = reverseMatches.find((m) => m?.data?.pageDetails?.backLink)?.data.pageDetails.backLink
    const pathname = matches[matches.length - 1].pathname
    return [header ?? '', pathname, backLink]
  }, [matches])

  return (
    <div className="flex py-5">
      <div className="flex flex-1 items-center">
        {pathname !== '/' && (
          <Link to={backLink ?? '/'} aria-label="go back">
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
