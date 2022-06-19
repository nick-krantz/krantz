import { useMemo } from 'react'
import { useMatches } from 'remix'
import { Menu } from '../menu'

type Props = {
  authorized: boolean
}

export const Header: React.FC<Props> = ({ authorized }) => {
  const matches = useMatches()

  const title = useMemo(() => {
    const header = [...matches].reverse().find((m) => m?.data?.header)?.data.header

    return header ?? ''
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
