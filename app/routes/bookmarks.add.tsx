import { Form, useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { LoaderFunction, redirect, ActionFunction } from '@remix-run/server-runtime'
import { PostgrestError } from '@supabase/supabase-js'
import { FiX } from 'react-icons/fi'
import { Button } from '~/components/button'
import { ErrorMessage } from '~/components/error-message'
import { Field } from '~/components/field'
import { Modal } from '~/components/modal'
import { Select } from '~/components/select'
import { BookmarkCategories } from '~/types'
import { badRequest } from '~/utils/network'
import { getToken } from '~/utils/supabase/get-token'
import { supabase } from '~/utils/supabase/index.server'

type ActionData = {
  error: PostgrestError
}

type LoaderData = {
  bookmarkCategories: BookmarkCategories[]
}

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from<BookmarkCategories>('bookmark-categories').select()

  return { bookmarkCategories: data }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const url = form.get('url')
  const category = form.get('category')

  if (typeof title !== 'string' || !title) {
    return badRequest({
      error: { message: 'Please enter a bookmark title' },
      data: { title, url, category },
    })
  }

  if (typeof url !== 'string' || !url) {
    return badRequest({
      error: { message: 'Please enter a bookmark URL' },
      data: { title, url, category },
    })
  }

  if (typeof category !== 'string' || !category) {
    return badRequest({
      error: { message: 'Please enter a bookmark category' },
      data: { title, url, category },
    })
  }

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const { error } = await supabase.from('bookmarks').insert([{ title, url, category }], { returning: 'minimal' })
  if (error) {
    return badRequest({ error, data: { title, url, category } })
  }

  return redirect('/bookmarks')
}

export default function AddBookmark() {
  const navigation = useNavigate()
  const actionData = useActionData<ActionData>()
  const { bookmarkCategories } = useLoaderData<LoaderData>()

  const close = () => {
    navigation('/bookmarks')
  }

  return (
    <Modal>
      <h2
        className="flex justify-between items-center text-lg leading-6 font-medium text-gray-800 dark:text-gray-200"
        id="modal-title"
      >
        Add Bookmark
        <button
          className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
          onClick={close}
        >
          <FiX />
        </button>
      </h2>
      <Form
        id="submit-bookmark-form"
        method="POST"
        aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
      >
        <div className="flex flex-col gap-5">
          <Field
            labelProps={{ htmlFor: 'title-input' }}
            inputProps={{
              type: 'text',
              name: 'title',
              id: 'title-input',
            }}
          >
            Title
          </Field>
          <Field
            labelProps={{ htmlFor: 'url-input' }}
            inputProps={{
              type: 'text',
              name: 'url',
              id: 'url-input',
            }}
          >
            URL
          </Field>
          <Select
            labelProps={{ htmlFor: 'category-select' }}
            selectProps={{
              name: 'category',
              id: 'category-select',
            }}
            options={bookmarkCategories.map((c) => c.category)}
          >
            Category
          </Select>

          <ErrorMessage id="form-error-message">{actionData?.error?.message}</ErrorMessage>

          <div className="flex justify-end gap-2 w-full">
            <Button variant="secondary" onClick={close} type="button">
              Cancel
            </Button>
            <Button type="submit" form="submit-bookmark-form">
              Submit Bookmark
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
