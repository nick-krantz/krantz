import { PostgrestError } from '@supabase/supabase-js'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData, useNavigate } from 'remix'
import { Button } from '~/components/button'
import { ErrorMessage } from '~/components/error-message'
import { Field } from '~/components/field'
import { Modal } from '~/components/modal'
import { RecipeCard } from '~/components/recipe-card'
import { Recipe } from '~/types'
import { badRequest } from '~/utils/network'
import { supabase } from '~/utils/supabase/index.server'

type LoaderData = {
  recipes: Recipe[]
}

type ActionData = {
  error: PostgrestError
  data: LoaderData
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const paths = url.pathname.split('/')
  const recipeId = paths[paths.length - 1]
  console.log(recipeId)
  const { data: recipes } = await supabase.from<Recipe>('recipes').select().eq('id', recipeId)

  return { recipes }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name')
  const id = form.get('id')

  console.log({ name, id })
  if (typeof name !== 'string' || !name || !id) {
    return badRequest({
      error: { message: 'Please enter a recipe name' },
    })
  }
  const { error } = await supabase.from('recipes').update({ name }).eq('id', id.toString())
  if (error) {
    return badRequest({ error, data: { name } })
  }

  return redirect('/recipes')
}

export default function SubmitRecipe() {
  const navigation = useNavigate()
  const recipe = useLoaderData<LoaderData>().recipes[0]
  const actionData = useActionData<ActionData>()

  const [name, setRecipeName] = useState<string>(recipe.name)

  const close = () => {
    navigation('/recipes')
  }

  return (
    <Modal>
      <h2
        className="flex justify-between items-center text-lg leading-6 font-medium text-gray-800 dark:text-gray-200"
        id="modal-title"
      >
        Edit Recipe
        <button
          className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
          onClick={close}
        >
          <FiX />
        </button>
      </h2>
      <div className="flex justify-center">
        <RecipeCard recipe={{ ...recipe, name: name }} preview />
      </div>
      <Form
        id="submit-recipe-form"
        method="post"
        aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
      >
        <input type="hidden" name="id" defaultValue={recipe.id} />
        <div className="flex flex-col gap-5">
          <Field
            labelProps={{ htmlFor: 'name-input' }}
            inputProps={{
              type: 'text',
              name: 'name',
              id: 'name-input',
              defaultValue: name,
              onChange: (e) => {
                setRecipeName(e.target.value)
              },
            }}
          >
            Name
          </Field>

          <ErrorMessage id="form-error-message">{actionData?.error?.message}</ErrorMessage>

          <div className="flex justify-end gap-2 w-full">
            <Button variant="secondary" onClick={close} type="button">
              Cancel
            </Button>
            <Button type="submit" form="submit-recipe-form">
              Save Recipe
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
