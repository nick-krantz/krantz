import { Link, LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix'
import { Button } from '~/components/button'
import { Header } from '~/components/header'
import { RecipeList } from '~/components/recipe-list'
import { Recipe } from '~/types'
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
    const { data: recipes } = await supabase.from<Recipe>('recipes').select()
    return recipes
  })
}

/**
 * Recipe page
 */
export default function Recipes() {
  const recipes = useLoaderData<Recipe[] | null>()
  return (
    <div className="text-center">
      <Header title="Recipes">
        <Link to="./fetch-recipe">
          <Button>Add Recipe</Button>
        </Link>
      </Header>
      {!!recipes && <RecipeList recipes={recipes} />}
      <Outlet />
    </div>
  )
}
