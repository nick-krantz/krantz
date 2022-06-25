import { json, Link, LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix'
import { Button } from '~/components/button'
import { PageDetails } from '~/components/header'
import { RecipeList } from '~/components/recipe-list'
import { Recipe } from '~/types'
import { getToken } from '~/utils/supabase/get-token'
import { supabase } from '~/utils/supabase/index.server'

type LoaderData = {
  recipes: Recipe[] | null
  pageDetails: PageDetails
}

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz - Recipes',
    description: 'Recipes worth making',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const { data: recipes } = await supabase.from<Recipe>('full_recipes').select()
  return json<LoaderData>({ recipes, pageDetails: { header: 'Recipes' } })
}

/**
 * Recipe page
 */
export default function Recipes() {
  const { recipes } = useLoaderData<LoaderData>()

  return (
    <>
      <div className="max-w-screen-xl mx-auto text-center">
        <Link to="./fetch">
          <Button>Add Recipe</Button>
        </Link>
      </div>
      {!!recipes && <RecipeList recipes={recipes} />}
      <Outlet />
    </>
  )
}
