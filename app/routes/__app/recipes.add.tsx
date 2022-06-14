import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ActionFunction, Form, MetaFunction } from 'remix'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/button'
import { Field } from '~/components/field'
import { Icon } from '~/components/icon'
import { TextAreaField } from '~/components/text-area-field'

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

/**
 * Recipe page
 */
export default function Recipes() {
  const [ingredients, setIngredients] = useState<{ id: string; ingredient: string }[]>([])

  const addIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), ingredient: '' }])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id))
  }

  const [instructions, setInstructions] = useState<{ id: string; instruction: string }[]>([])

  const addInstruction = () => {
    setInstructions([...instructions, { id: uuidv4(), instruction: '' }])
  }

  const removeInstruction = (id: string) => {
    setInstructions(instructions.filter((i) => i.id !== id))
  }

  return (
    <>
      <Form id="add-recipe-form" className="flex gap-12 w-full max-w-screen-xl mx-auto" method="post">
        <div className="w-5/12">
          <Field
            labelProps={{ htmlFor: 'title-input', className: 'text-lg' }}
            inputProps={{
              type: 'text',
              name: 'title',
              id: 'title-input',
              required: true,
            }}
          >
            Title
          </Field>
          <Field
            labelProps={{ htmlFor: 'url-input', className: 'text-lg' }}
            inputProps={{
              type: 'url',
              name: 'url',
              id: 'url-input',
            }}
          >
            URL
          </Field>
          <Field
            labelProps={{ htmlFor: 'image-url-input', className: 'text-lg' }}
            inputProps={{
              type: 'url',
              name: 'image-url',
              id: 'image-url-input',
            }}
          >
            Image URL
          </Field>
        </div>
        <div className="w-5/12">
          <fieldset className="flex flex-col">
            <legend className="mb-2 text-lg font-semibold">Ingredients</legend>
            <ul className="list mb-2 list-[square] list-outside ml-6">
              {ingredients.map(({ id, ingredient }, i) => (
                <li className="list-item mb-2" key={`ingredient-${id}`}>
                  <div className="flex gap-4 items-center ">
                    <Field
                      className="flex-1"
                      labelProps={{ htmlFor: id, className: 'text-lg' }}
                      inputProps={{
                        type: 'text',
                        name: `ingredients`,
                        id: id,
                        required: true,
                        defaultValue: ingredient,
                      }}
                      hiddenLabel
                    >
                      Ingredient {i}
                    </Field>
                    <Button
                      type="button"
                      variant="secondary"
                      className="p-1"
                      aria-label="Remove ingredient"
                      onClick={() => removeIngredient(id)}
                    >
                      <Icon Icon={FiX} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button className="self-end" type="button" onClick={addIngredient}>
              Add Ingredient
            </Button>
          </fieldset>
          <fieldset className="flex flex-col">
            <legend className="mb-2 text-lg font-semibold">Instructions</legend>
            <ol className="list mb-2 list-[decimal] list-outside ml-6 marker:text-xl">
              {instructions.map(({ id, instruction }, i) => (
                <li className="list-item mb-2" key={`instruction-${id}`}>
                  <div className="flex gap-4 items-center ">
                    <TextAreaField
                      className="flex-1"
                      labelProps={{ htmlFor: id, className: 'text-lg' }}
                      textAreaProps={{
                        name: `instructions`,
                        id: id,
                        required: true,
                        defaultValue: instruction,
                        rows: 3,
                      }}
                      hiddenLabel
                    >
                      Instruction {i}
                    </TextAreaField>
                    <Button
                      type="button"
                      variant="secondary"
                      className="p-1"
                      aria-label="Remove instruction"
                      onClick={() => removeInstruction(id)}
                    >
                      <Icon Icon={FiX} />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
            <Button className="self-end" type="button" onClick={addInstruction}>
              Add Instruction
            </Button>
          </fieldset>
        </div>
      </Form>
      <Button type="submit" form="add-recipe-form" className="w-fit self-center mt-8">
        Add Recipe
      </Button>
    </>
  )
}
