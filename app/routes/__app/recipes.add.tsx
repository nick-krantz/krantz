import { ActionFunction, Form, json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/button'
import { Field } from '~/components/field'
import { RecipeWithId } from '~/types'
import { getRecipe } from '~/utils/recipe-scraper'
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
  const ingredients = formData.getAll('ingredients')
  console.log({ title, url, imageUrl, instructions, ingredients })

  return null
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
        ingredients: baseRecipe.ingredients.map((i) => ({ ingredient: i, id: uuidv4() })),
        instructions: baseRecipe.instructions.map((i) => ({ instruction: i, id: uuidv4() })),
      },
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
      <Form id="add-recipe-form" className="flex gap-12 w-full max-w-screen-xl mx-auto" method="post">
        <div className="w-5/12">
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
          <IngredientList initialIngredients={data?.recipe?.ingredients} />
        </div>
        <div className="w-5/12">
          <InstructionList initialInstructions={data?.recipe?.instructions} />
        </div>
      </Form>
      <Button type="submit" form="add-recipe-form" className="w-fit self-center mt-8">
        Add Recipe
      </Button>
    </>
  )
}
