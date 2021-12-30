import { LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix'
import { definitions } from 'types/supabase'
import { RecipeList } from '~/components/recipe-list'
import { authenticated } from '~/utils/supabase/authenticated'
import { supabase } from '~/utils/supabase/index.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Krantz Recipes',
    description: 'Stored recipes',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, async () => {
    const { data: recipes } = await supabase.from<definitions['recipes']>('recipes').select()
    return recipes
  })
}

/**
 * Recipe page
 */
export default function Recipes() {
  const recipes = useLoaderData<definitions['recipes'][] | null>()
  return (
    <div className="container">
      Recipes
      {!!recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}
