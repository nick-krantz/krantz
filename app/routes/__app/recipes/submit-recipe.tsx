import { PostgrestError } from '@supabase/supabase-js'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData, useNavigate } from 'remix'
import { Button } from '~/components/button'
import { ErrorMessage } from '~/components/error-message'
import { Field } from '~/components/field'
import { Modal } from '~/components/modal'
import { RecipeCard } from '~/components/recipe-card'
import { badRequest } from '~/utils/network'
import { getToken } from '~/utils/supabase/get-token'
import { getUser } from '~/utils/supabase/get-user'
import { supabase } from '~/utils/supabase/index.server'

type LoaderData = {
  name: string
  image: string
  recipeURL: string
}

type ActionData = {
  error: PostgrestError
  data: LoaderData
}

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const name = decodeURIComponent(url.searchParams.get('name') || '')
  const image = decodeURIComponent(url.searchParams.get('image') || '')
  const recipeURL = decodeURIComponent(url.searchParams.get('url') || '')

  return {
    name,
    image,
    recipeURL,
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name')
  const image = form.get('image')
  const url = form.get('url')

  if (typeof name !== 'string' || !name || !image || !url) {
    return badRequest({
      error: { message: 'Please enter all details: recipe name, image & url' },
      data: { name, image, url },
    })
  }

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const created_by = (await getUser(request))?.id

  const { error } = await supabase.from('recipes').insert([{ name, image, url, created_by }], { returning: 'minimal' })
  if (error) {
    return badRequest({ error, data: { name, image, url } })
  }

  return redirect('/recipes')
}

export default function SubmitRecipe() {
  const navigation = useNavigate()
  const loaderData = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()

  // loaderData should take precedence over actionData
  const image = loaderData?.image || actionData?.data?.image || ''
  const url = loaderData?.recipeURL || actionData?.data.recipeURL || ''
  const [name, setRecipeName] = useState<string>(loaderData?.name || actionData?.data?.name || '')

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
        <RecipeCard recipe={{ id: -1, name, url, image }} preview />
      </div>
      <Form
        id="submit-recipe-form"
        method="post"
        aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
      >
        <input type="hidden" name="url" defaultValue={url} />
        <input type="hidden" name="image" defaultValue={image} />
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
              Submit Recipe
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}