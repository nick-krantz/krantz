type Props = {
  title?: string
}

export const Header: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="grid grid-cols-3 p-5">
      <div></div>
      <div className="w-full">{title && <h1 className="text-center">{title}</h1>}</div>
      <div className="w-full">
        <div className="flex justify-end align-center gap-4 h-full">{children}</div>
      </div>
    </div>
  )
}
