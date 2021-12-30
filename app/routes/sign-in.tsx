import { User } from '@supabase/supabase-js'
import { ActionFunction, MetaFunction, redirect, useActionData } from 'remix'
import { EmailInput } from '~/components/email-input'
import { ErrorMessage } from '~/components/error-message'
import { PasswordInput } from '~/components/password-input'
import { badRequest } from '~/utils/network'
import { commitSession, getSession } from '~/utils/supabase/get-session.server'
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
    title: 'Krantz - Sign In',
    description: 'Sign in using an email and password',
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
    email: validateEmail(email, false),
    password: validatePassword(password, false),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  const { user, session: supabaseSession, error } = await supabase.auth.signIn({ email, password })
  // Sign in failed
  if (error) {
    return badRequest({ fields, formError: error.message }, error.status)
  }

  // Take user to the recipe page
  if (user !== null && supabaseSession !== null) {
    const session = await getSession(request.headers.get('Cookie'))
    session.set('access_token', supabaseSession.access_token)
    return redirect('recipes', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  // TODO: Can this happen? User/session are null without an error?
  return null
}

/**
 * Sign In form
 */
export default function SignIn() {
  const actionData = useActionData<ActionData>()

  return (
    <div className="container">
      <div className="content">
        <h1>Sign In</h1>
        <form method="post" aria-describedby={actionData?.formError ? 'form-error-message' : undefined}>
          <input type="hidden" name="redirectTo" value="http://localhost:3000/recipes" />
          <div>
            <EmailInput email={actionData?.fields?.email} errorMessage={actionData?.fieldErrors?.email} />
          </div>
          <div>
            <PasswordInput password={actionData?.fields?.password} errorMessage={actionData?.fieldErrors?.password} />
          </div>
          <ErrorMessage condition={actionData?.formError} id="form-error-message">
            {actionData?.formError}
          </ErrorMessage>
          <button type="submit" className="button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
