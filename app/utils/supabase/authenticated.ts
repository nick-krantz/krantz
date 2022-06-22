import { User } from '@supabase/supabase-js'
import { redirect, Session } from 'remix'
import { ACCESS_TOKEN } from '~/constants/access-token'
import { getSession } from './get-session.server'
import { supabase } from './index.server'

const guardedRoutes = ['/recipes', '/bookmarks']

const isGuardedRoute = (path: string): boolean => Boolean(guardedRoutes.find((route) => path.startsWith(route)))

/**
 * Checks if the user has an ACCESS_TOKEN cookie to verify that they are authorized
 */
export async function authenticated<T>(
  request: Request,
  callback: (params: { user: User | null; authorized: boolean }) => Promise<T | Response>,
) {
  const session = await getSession(request.headers.get('Cookie'))
  try {
    const token = session.get(ACCESS_TOKEN)

    const { user, error } = await supabase.auth.api.getUser(token)

    if (!isGuardedRoute(new URL(request.url).pathname) && user === null) {
      return await callback({ user, authorized: false })
    }

    if (!error) {
      return await callback({ user, authorized: true })
    }

    return unAuthorizedResponse(session)
  } catch {
    return unAuthorizedResponse(session)
  }
}

/**
 * Reset the ACCESS_TOKEN cookie if the user in authorized
 */
async function unAuthorizedResponse(session: Session): Promise<Response> {
  session.unset(ACCESS_TOKEN)
  return redirect('/sign-in')
}
