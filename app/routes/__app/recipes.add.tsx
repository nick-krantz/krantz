import { ActionFunction, Form, json, LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/button'
import { Field } from '~/components/field'
import { RecipeWithId } from '~/types'
import { badRequest } from '~/utils/network'
import { getRecipe } from '~/utils/recipe-scraper'
import { getToken } from '~/utils/supabase/get-token'
import { getUser } from '~/utils/supabase/get-user'
import { supabase } from '~/utils/supabase/index.server'
import { IngredientList } from './_recipe.components/ingredient-list'
import { InstructionList } from './_recipe.components/instruction-list'

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz - Add Recipe',
    description: 'Add Recipe',
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
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
    if (/ingredients\[[0-9]\]/.test(key)) {
      ingredientKeys.push(key)
    }
  }

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

  const created_by = (await getUser(request))?.id

  const { error, data } = await supabase
    .from('detailed-recipes')
    .insert([{ title, url, image_url: imageUrl, instructions, ingredients: ingredientSections, created_by }])
  if (error) {
    return badRequest({
      error,
      data: { title, url, 'image-url': imageUrl, instructions, ingredients: ingredientSections },
    })
  }

  return redirect(`/recipes/${data[0].id}`)
}

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const url = decodeURIComponent(searchParams.get('url') ?? '')
  if (!url) {
    return null
  }
  const baseRecipe = await getRecipe(url)
  if (baseRecipe) {
    return json({
      recipe: {
        ...baseRecipe,
        ingredientSections: baseRecipe.ingredients.map((section) => ({
          title: section.title,
          id: uuidv4(),
          ingredients: section.ingredients.map((i) => ({ ingredient: i, id: uuidv4() })),
        })),
        instructions: baseRecipe.instructions.map((i) => ({ instruction: i, id: uuidv4() })),
      },
      header: 'Add Recipe',
    })
  } else {
    return json({ recipe: null })
  }
}

/**
 * Recipe page
 */
export default function Recipes() {
  const data = useLoaderData<{ recipe: RecipeWithId } | null>()

  return (
    <>
      <Form
        id="add-recipe-form"
        className="flex gap-12 w-full max-w-screen-xl mx-auto flex-wrap justify-center"
        method="post"
      >
        <div className="w-full md:w-5/12 md:min-w-[420px]">
          <Field
            labelProps={{ htmlFor: 'title-input', className: 'text-xl' }}
            inputProps={{
              type: 'text',
              name: 'title',
              id: 'title-input',
              required: true,
              defaultValue: data?.recipe?.title,
            }}
          >
            Title
          </Field>
          <Field
            className="mt-4"
            labelProps={{ htmlFor: 'url-input', className: 'text-xl' }}
            inputProps={{
              type: 'url',
              name: 'url',
              id: 'url-input',
              defaultValue: data?.recipe?.url,
            }}
          >
            URL
          </Field>
          <Field
            className="mt-4"
            labelProps={{ htmlFor: 'image-url-input', className: 'text-xl' }}
            inputProps={{
              type: 'url',
              name: 'image-url',
              id: 'image-url-input',
              defaultValue: data?.recipe?.image ?? '',
            }}
          >
            Image URL
          </Field>
          <IngredientList initialIngredients={data?.recipe?.ingredientSections} />
        </div>
        <div className="w-full md:w-5/12 md:min-w-[420px]">
          <InstructionList initialInstructions={data?.recipe?.instructions} />
        </div>
      </Form>
      <Button type="submit" form="add-recipe-form" className="mt-8 md:w-[50%] md:self-center">
        Add Recipe
      </Button>
    </>
  )
}
