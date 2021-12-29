import { User } from '@supabase/supabase-js'
import { ActionFunction, MetaFunction, redirect, useActionData } from 'remix'
import { ErrorMessage } from '~/components/error-message'
import { badRequest } from '~/utils/network'
import { supabase } from '~/utils/supabase/index.server'
import { validateEmail, validatePassword } from '~/utils/validation'

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string | undefined
    password: string | undefined
  }
  fields?: {
    email: string
    password: string
  }
  user?: User
}

export const meta: MetaFunction = () => {
  return {
    title: 'Krantz - Sign Up',
    description: 'Sign up using an email and password',
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const redirectTo = form.get('redirectTo')

  if (typeof email !== 'string' || typeof password !== 'string' || typeof redirectTo !== 'string') {
    return badRequest({
      formError: `Form not submitted correctly.`,
    })
  }

  const fields = { email, password }
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  // Note: supabase hashes passwords for us, no need to do that client side
  const { user, session, error } = await supabase.auth.signUp({ email, password }, { redirectTo })

  // Sign up failed
  if (error) {
    return badRequest({ fields, formError: error.message }, error.status)
  }

  // User does not need to confirm email, take them to the recipe page
  if (session !== null) {
    redirect('recipes')
  }

  // Return the user & session to the page
  return {
    fields: {
      email,
    },
    user,
  }
}

/**
 * SignUp form
 */
export default function SignUp() {
  const actionData = useActionData<ActionData>()

  // When user is returned, session was null so email needs to be confirmed
  if (actionData?.user) {
    return (
      <div className="container">
        <div className="content">
          <h2>Confirm Email</h2>
          <p>A confirmation email was sent to {actionData.fields?.email}.</p>
          <p>Please confirm your email to continue.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Sign Up</h1>
        <form method="post" aria-describedby={actionData?.formError ? 'form-error-message' : undefined}>
          <input type="hidden" name="redirectTo" value="http://localhost:3000/recipes" />
          <div>
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              name="email"
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-describedby={actionData?.fieldErrors?.email ? 'email-error' : undefined}
            />
            <ErrorMessage condition={actionData?.fieldErrors?.email} id="email-error">
              {actionData?.fieldErrors?.email}
            </ErrorMessage>
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              name="password"
              type="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
              aria-describedby={actionData?.fieldErrors?.password ? 'password-error' : undefined}
            />
            <ErrorMessage condition={actionData?.fieldErrors?.password} id="password-error">
              {actionData?.fieldErrors?.password}
            </ErrorMessage>
          </div>
          <ErrorMessage condition={actionData?.formError} id="form-error-message">
            {actionData?.formError}
          </ErrorMessage>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
