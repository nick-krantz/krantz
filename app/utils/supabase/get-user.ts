import { User } from '@supabase/supabase-js'
import { getSession } from './get-session.server'
import { supabase } from './index.server'

export const getUser = async (request: Request): Promise<User | null> => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('access_token')
  const { user, error } = await supabase.auth.api.getUser(token)
  console.error(error)
  return user
}
