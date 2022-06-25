import { ScraperRecipeWithIds } from '~/types/utility-types'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { PageDetails } from '~/components/header'
import { addIdToIngredients, addIdToInstructions } from '~/utils/add-ids-to-recipe'
import { getRecipe } from '~/utils/recipe-scraper'
import { RecipeForm } from './_recipe.components/recipe-form'

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz - Add Recipe',
    description: 'Add Recipe',
  }
}

interface LoaderData {
  recipe: ScraperRecipeWithIds | null
  pageDetails: PageDetails
}

const pageDetails: PageDetails = { header: 'Add Recipe', backLink: '/recipes' }

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const url = decodeURIComponent(searchParams.get('url') ?? '')
  if (!url) {
    return json<LoaderData>({ recipe: null, pageDetails })
  }
  const baseRecipe = await getRecipe(url)
  if (baseRecipe) {
    return json<LoaderData>({
      recipe: {
        ...baseRecipe,
        ingredients: addIdToIngredients(baseRecipe.ingredients),
        instructions: addIdToInstructions(baseRecipe.instructions),
      },
      pageDetails,
    })
  } else {
    return json<LoaderData>({ recipe: null, pageDetails })
  }
}

/**
 * Recipe page
 */
export default function Recipes() {
  const { recipe } = useLoaderData<LoaderData>()

  return <RecipeForm type="add" recipe={recipe} />
}
