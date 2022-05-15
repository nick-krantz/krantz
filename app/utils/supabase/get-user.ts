import { User } from '@supabase/supabase-js'
import { getToken } from './get-token'
import { supabase } from './index.server'

export const getUser = async (request: Request): Promise<User | null> => {
  const token = await getToken(request)

  const { user, error } = await supabase.auth.api.getUser(token)

  if (error) console.error(error)

  return user
}
