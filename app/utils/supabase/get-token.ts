import { ACCESS_TOKEN } from '~/constants/access-token'
import { getSession } from './get-session.server'

/**
 * Retrieves the token of the user from a request
 */
export const getToken = async (request: Request): Promise<string> => {
  const session = await getSession(request.headers.get('Cookie'))
  return session.get(ACCESS_TOKEN)
}
