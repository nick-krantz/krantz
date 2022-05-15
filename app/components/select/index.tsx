type Props = {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
  selectProps: React.InputHTMLAttributes<HTMLSelectElement>
  options: string[]
}

export const Select: React.FC<Props> = ({ children, labelProps, selectProps, options }) => (
  <div className="flex flex-col items-start w-inherit">
    <label className="mb-2 font-semibold" {...labelProps}>
      {children}
    </label>
    <select {...selectProps} className="w-full rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200">
      {options.map((o) => (
        <option key={o} value={o} className="text-gray-800">
          {o}
        </option>
      ))}
    </select>
  </div>
)
