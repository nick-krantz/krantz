import { ErrorMessage } from '../error-message'

type Props = {
  password?: string
  errorMessage?: string
}

export const PasswordInput: React.FC<Props> = ({ password, errorMessage }) => {
  return (
    <>
      <label htmlFor="password-input">Password</label>
      <input
        type="password"
        id="password-input"
        name="password"
        defaultValue={password}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? 'password-error' : undefined}
      />
      <ErrorMessage condition={errorMessage} id="password-error">
        {errorMessage}
      </ErrorMessage>
    </>
  )
}
