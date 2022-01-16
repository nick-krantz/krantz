import { Menu } from '../menu'

type Props = {
  title?: string
  authorized: boolean
}

export const Header: React.FC<Props> = ({ title, children, authorized }) => {
  return (
    <div className="grid grid-cols-3 p-5">
      <div></div>
      <div className="w-full">{title && <h1 className="text-center text-3xl font-semibold">{title}</h1>}</div>
      <div className="w-full">
        <div className="flex justify-end items-center gap-8 h-full">
          {children}
          <Menu authorized={authorized} />
        </div>
      </div>
    </div>
  )
}
