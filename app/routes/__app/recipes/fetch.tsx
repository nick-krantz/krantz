import { FiX } from 'react-icons/fi'
import { ActionFunction, Form, redirect, useActionData, useNavigate } from 'remix'
import { Button } from '~/components/button'
import { ErrorMessage } from '~/components/error-message'
import { Field } from '~/components/field'
import { Modal } from '~/components/modal'
import { badRequest } from '~/utils/network'

type ActionData = {
  error?: {
    message: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const url = form.get('url')

  if (typeof url !== 'string' || !url) {
    return badRequest({
      error: { message: 'Please enter a URL' },
    })
  }

  return redirect(`recipes/add?url=${encodeURIComponent(url)}`)
}

export default function FetchRecipe() {
  const navigation = useNavigate()
  const actionData = useActionData<ActionData>()

  const close = () => {
    navigation(-1)
  }

  return (
    <Modal>
      <h2
        className="flex justify-between items-center text-lg leading-6 font-medium text-gray-800 dark:text-gray-200"
        id="modal-title"
      >
        Add Recipe
        <button
          className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
          onClick={close}
        >
          <FiX />
        </button>
      </h2>
      <Form
        method="post"
        id="fetch-recipe-form"
        aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
      >
        <div className="flex flex-col gap-5">
          <Field
            labelProps={{ htmlFor: 'url-input' }}
            inputProps={{
              type: 'url',
              name: 'url',
              id: 'url-input',
            }}
          >
            Recipe URL
          </Field>

          <ErrorMessage id="form-error-message">{actionData?.error?.message}</ErrorMessage>

          <div className="flex justify-end gap-2 w-full">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" form="fetch-recipe-form">
              Fetch Recipe
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
