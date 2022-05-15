import { User } from '@supabase/supabase-js'
import { ACCESS_TOKEN } from '~/constants/access-token'
import { getSession } from './get-session.server'
import { supabase } from './index.server'

export const getUser = async (request: Request): Promise<User | null> => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get(ACCESS_TOKEN)

  const { user, error } = await supabase.auth.api.getUser(token)

  if (error) console.error(error)

  return user
}
