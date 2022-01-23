import { ErrorMessage } from '../error-message'
import { Field } from '../field'

type Props = {
  email?: string
  errorMessage?: string
}

export const EmailInput: React.FC<Props> = ({ email, errorMessage }) => {
  const hasError = Boolean(errorMessage)
  return (
    <>
      <Field
        labelProps={{ htmlFor: 'email-input' }}
        inputProps={{
          type: 'email',
          name: 'email',
          id: 'email-input',
          defaultValue: email,
          'aria-invalid': hasError,
          'aria-describedby': hasError ? 'email-error' : undefined,
        }}
      >
        Email
      </Field>
      <ErrorMessage id="email-error">{errorMessage}</ErrorMessage>
    </>
  )
}
