import { ScraperRecipeWithIds } from '~/types/utility-types'
import { useLoaderData, MetaFunction } from '@remix-run/react'
import { json, LoaderFunction, ActionFunction, redirect } from '@remix-run/server-runtime'
import { PageDetails } from '~/components/header'
import { addIdToIngredients, addIdToInstructions } from '~/utils/add-ids-to-recipe'
import { badRequest } from '~/utils/network'
import { getRecipe } from '~/utils/recipe-scraper'
import { getToken } from '~/utils/supabase/get-token'
import { getUser } from '~/utils/supabase/get-user'
import { supabase } from '~/utils/supabase/index.server'
import { RecipeForm } from './_recipe.components/recipe-form'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Nick Krantz - Add Recipe',
      description: 'Add Recipe',
    },
  ]
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const type = formData.get('type')
  const recipeId = formData.get('recipeId')
  const title = formData.get('title')
  const url = formData.get('url')
  const imageUrl = formData.get('image-url')
  const instructions = formData.getAll('instructions')
  const sectionKeys: string[] = []
  const ingredientKeys: string[] = []

  for (const key of formData.keys()) {
    if (/ingredient-section\[[0-9]\]/.test(key)) {
      sectionKeys.push(key)
    }
    if (/ingredients\[[0-9]\]/.test(key) && ingredientKeys.includes(key) === false) {
      ingredientKeys.push(key)
    }
  }

  if (!type || (type !== 'add' && type !== 'edit')) {
    return badRequest({
      error: { message: `Invalid type: ${type}` },
    })
  }

  if (type === 'edit' && !recipeId) {
    return badRequest({
      error: { message: `Missing recipeId: ${recipeId}` },
    })
  }
  console.log({ sectionKeys, ingredientKeys })
  if (sectionKeys.length !== ingredientKeys.length) {
    return badRequest({
      error: { message: 'Ingredients found and number of sections are not the same' },
    })
  }

  const ingredientSections = sectionKeys.map((sectionKey, i) => {
    const sectionTitle = formData.get(sectionKey)
    const ingredients = formData.getAll(ingredientKeys[i])

    return {
      title: sectionTitle || '',
      ingredients,
    }
  })

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  if (type === 'add') {
    const created_by = (await getUser(request))?.id

    const { error, data } = await supabase
      .from('full_recipes')
      .insert([{ title, url, image_url: imageUrl, instructions, ingredients: ingredientSections, created_by }])

    if (error) {
      return badRequest({
        error,
        data: { title, url, 'image-url': imageUrl, instructions, ingredients: ingredientSections },
      })
    }

    return redirect(`../../recipes/${data?.[0]?.id}`)
  } else {
    const { error } = await supabase
      .from('full_recipes')
      .update(
        { title, url, image_url: imageUrl, instructions, ingredients: ingredientSections },
        { returning: 'minimal' },
      )
      .eq('id', recipeId)

    if (error) {
      return badRequest({
        error: error,
        data: { title, url, image_url: imageUrl, instructions, ingredients: ingredientSections },
      })
    }

    return redirect(`../../recipes/${recipeId}`)
  }
}

/**
 * Recipe page
 */
export default function Recipes() {
  const { recipe } = useLoaderData<LoaderData>()

  return <RecipeForm type="add" recipe={recipe} />
}
