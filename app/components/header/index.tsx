import { Menu } from '../menu'

type Props = {
  title?: string
  authorized: boolean
}

export const Header: React.FC<Props> = ({ title, authorized }) => {
  return (
    <div className="flex py-5">
      <div className="flex-1"></div>
      <div className="flex-1 w-full">{title && <h1 className="text-center mb-0">{title}</h1>}</div>
      <div className=" flex-1 w-full">
        <div className="flex justify-end items-center gap-8 h-full">
          <Menu authorized={authorized} />
        </div>
      </div>
    </div>
  )
}
