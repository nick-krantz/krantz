import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { fetch } from '@remix-run/node'
import * as cheerio from 'cheerio'
import { ActionFunction, Form, redirect, useActionData, useNavigate } from 'remix'
import { badRequest, createQueryParams } from '~/utils/network'

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

  try {
    const response = await fetch(url)
    const webHTML = await response.text()
    const $ = cheerio.load(webHTML)

    const queryParamString = createQueryParams({
      name: $('head title').text(),
      image: $('head meta[property="og:image"]').attr('content') || '',
      url,
    })

    return redirect(`recipes/submit-recipe${queryParamString}`)
  } catch (error) {
    return badRequest({ error })
  }
}

export default function FetchRecipe() {
  const navigation = useNavigate()
  const actionData = useActionData<ActionData>()

  const close = () => {
    navigation(-1)
  }

  return (
    <Modal isOpen={true} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Recipe</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            method="post"
            id="fetch-recipe-form"
            aria-describedby={actionData?.error?.message ? 'form-error-message' : undefined}
          >
            <VStack spacing="24px" align="stretch">
              <FormControl>
                <FormLabel>Recipe URL</FormLabel>
                <Input name="url" type="url"></Input>
              </FormControl>
              {!!actionData?.error?.message && (
                <Alert status="error" id="form-error-message">
                  <AlertIcon />
                  <AlertDescription>{actionData.error.message}.</AlertDescription>
                </Alert>
              )}
            </VStack>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={close}>Cancel</Button>
          <Button colorScheme="green" ml="10px" type="submit" form="fetch-recipe-form">
            Fetch Recipe
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
