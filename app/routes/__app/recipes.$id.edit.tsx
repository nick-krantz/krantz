import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Recipe } from '~/types'

import { addIdToIngredients, addIdToInstructions } from '~/utils/add-ids-to-recipe'
import { getToken } from '~/utils/supabase/get-token'
import { supabase } from '~/utils/supabase/index.server'

import { RecipeForm } from './_recipe.components/recipe-form'

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `Nick Krantz - Edit ${data?.recipe?.title}`,
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const paths = url.pathname.split('/')
  const recipeId = paths[paths.length - 2]

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const { data: recipes } = await supabase.from<Recipe>('full_recipes').select().eq('id', recipeId)

  if (recipes === null || recipes.length === 0) {
    throw new Response('Recipe Not Found', {
      status: 404,
    })
  }

  const recipe = recipes[0]

  return json({
    pageDetails: { header: 'Edit Recipe', backLink: `/recipes/${recipe.id}` },
    recipe: {
      ...recipe,
      ingredients: addIdToIngredients(recipe.ingredients),
      instructions: addIdToInstructions(recipe.instructions),
    },
  })
}

/**
 * Edit Recipe page
 */
export default function EditRecipes() {
  const { recipe } = useLoaderData()

  return <RecipeForm type="edit" recipe={recipe} recipeId={recipe.id} />
}
