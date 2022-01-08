import { ErrorMessage } from '../error-message'

type Props = {
  password?: string
  errorMessage?: string
}

export const PasswordInput: React.FC<Props> = ({ password, errorMessage }) => {
  const hasError = Boolean(errorMessage)
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold" htmlFor="password-input">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password-input"
        defaultValue={password}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'password-error' : undefined}
        className="rounded-md bg-inherit border-1 border-gray-800 dark:border-gray-200"
      />
      <ErrorMessage id="email-error">{errorMessage}</ErrorMessage>
    </div>
  )
}
