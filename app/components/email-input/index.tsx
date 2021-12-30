import { ErrorMessage } from '../error-message'

type Props = {
  email?: string
  errorMessage?: string
}

export const EmailInput: React.FC<Props> = ({ email, errorMessage }) => {
  return (
    <>
      <label htmlFor="email-input">Email</label>
      <input
        type="email"
        id="email-input"
        name="email"
        defaultValue={email}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? 'email-error' : undefined}
      />
      <ErrorMessage condition={errorMessage} id="email-error">
        {errorMessage}
      </ErrorMessage>
    </>
  )
}
