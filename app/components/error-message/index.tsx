type Props = {
  id: string
}

export const ErrorMessage: React.FC<Props> = ({ id, children }) => {
  if (children) {
    return (
      <div id={id} className="rounded-md mt-2 dark:bg-red-400">
        <p className="p-3 mb-0" aria-live="polite">
          {children}
        </p>
      </div>
    )
  }
  return null
}
