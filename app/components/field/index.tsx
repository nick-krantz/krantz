type Props = {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export const Field: React.FC<Props> = ({ children, labelProps, inputProps }) => (
  <div className="flex flex-col items-start">
    <label className="mb-2 font-semibold" {...labelProps}>
      {children}
    </label>
    <input {...inputProps} className="rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200" />
  </div>
)
