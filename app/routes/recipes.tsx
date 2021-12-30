import { LoaderFunction, MetaFunction } from 'remix'
import { authenticated } from '~/utils/supabase/authenticated'

export const meta: MetaFunction = () => {
  return {
    title: 'Krantz Recipes',
    description: 'Stored recipes',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, () => {
    return Promise.resolve(null)
  })
}

/**
 * Recipe page
 */
export default function Recipes() {
  return <div className="container">Recipes</div>
}
