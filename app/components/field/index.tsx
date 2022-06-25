type Props = {
  hiddenLabel?: boolean
  className?: string
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export const Field: React.FC<Props> = ({ children, hiddenLabel, className, labelProps, inputProps }) => {
  return (
    <div className={`flex flex-col items-start w-inherit ${className || ''}`}>
      <label
        {...labelProps}
        className={`mb-2 font-semibold ${hiddenLabel ? 'overflow-hidden max-h-0 absolute mb-0' : ''} ${
          labelProps.className ?? ''
        }`}
      >
        {children}
      </label>
      <input {...inputProps} className="w-full rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200" />
    </div>
  )
}
