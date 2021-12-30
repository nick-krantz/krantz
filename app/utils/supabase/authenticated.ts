import { redirect, Session } from 'remix'
import { commitSession, getSession } from './get-session.server'

/**
 * Checks if the user has an access_token cookie to verify that they are authorized
 */
export async function authenticated<T>(request: Request, callback: (token: string) => Promise<T>) {
  const session = await getSession(request.headers.get('Cookie'))
  try {
    const token = session.get('access_token')
    if (token) {
      return await callback(token)
    }
    return unAuthorizedResponse(session)
  } catch {
    return unAuthorizedResponse(session)
  }
}

/**
 * Reset the access_token cookie if the user in authorized
 */
async function unAuthorizedResponse(session: Session): Promise<Response> {
  session.unset('access_token')
  const cookie = await commitSession(session)
  return redirect('/login', { headers: { 'Set-Cookie': cookie } })
}
