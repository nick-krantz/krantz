import { useMemo } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useMatches } from 'remix'
import { Icon } from '../icon'

type Props = {
  authorized: boolean
}

export const Header: React.FC<Props> = ({ authorized }) => {
  const matches = useMatches()

  const [title, pathname] = useMemo(() => {
    const header = [...matches].reverse().find((m) => m?.data?.header)?.data.header
    const pathname = matches[matches.length - 1].pathname
    return [header ?? '', pathname]
  }, [matches])

  return (
    <div className="flex py-5">
      <div className="flex-1">
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
                py-2 px-4 border rounded-md
                border-gray-800/50 hover:border-gray-800 hover:bg-gray-800/[.2] focus:bg-gray-800[.02]
                dark:border-white/50 dark:hover:border-white dark:hover:bg-white/[.2] dark:focus:bg-white/[.2]
              `}
              >
                Sign In
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
