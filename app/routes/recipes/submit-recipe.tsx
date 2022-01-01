import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import { PostgrestError } from '@supabase/supabase-js'
import { useState } from 'react'
import { ActionFunction, Form, LoaderFunction, redirect, useActionData, useLoaderData, useNavigate } from 'remix'
import { RecipeCard } from '~/components/recipe-card'
import { badRequest } from '~/utils/network'
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

  if (typeof name !== 'string' || !name) {
    return badRequest({
      error: { message: 'Please enter a recipe name' },
      data: { name, image, url },
    })
  }
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
  const image = loaderData?.name || actionData?.data?.name || ''
  const url = loaderData?.recipeURL || actionData?.data.recipeURL || ''
  const [name, setRecipeName] = useState<string>(loaderData?.name || actionData?.data?.name || '')

  const close = () => {
    navigation('/recipes')
  }

  return (
    <Modal isOpen={true} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Recipe</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RecipeCard name={name} image={image} url={url} preview />
          <Form
            id="submit-recipe-form"
            method="post"
            aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
          >
            <input type="hidden" name="url" defaultValue={url} />
            <input type="hidden" name="image" defaultValue={image} />
            <FormControl isInvalid={!name} mt="24px">
              <FormLabel>Title</FormLabel>
              <Textarea
                type="text"
                name="name"
                defaultValue={name}
                onChange={(e) => {
                  setRecipeName(e.target.value)
                }}
              />
            </FormControl>
          </Form>
          {!!actionData?.error?.message && (
            <Alert status="error" id="form-error-message" mt="24px">
              <AlertIcon />
              <AlertDescription>{actionData.error.message}.</AlertDescription>
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={close}>Cancel</Button>
          <Button colorScheme="green" ml="10px" type="submit" form="submit-recipe-form">
            Submit Recipe
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
