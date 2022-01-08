import { ErrorMessage } from '../error-message'

type Props = {
  email?: string
  errorMessage?: string
}

export const EmailInput: React.FC<Props> = ({ email, errorMessage }) => {
  const hasError = Boolean(errorMessage)
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold" htmlFor="email-input">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email-input"
        defaultValue={email}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'email-error' : undefined}
        className="rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200"
      />
      <ErrorMessage id="email-error">{errorMessage}</ErrorMessage>
    </div>
  )
}
