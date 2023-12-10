import { ScraperRecipeWithIds } from '~/types/utility-types'
import { Form } from '@remix-run/react'
import { Button } from '~/components/button'
import { Field } from '~/components/field'
import { IngredientList } from './ingredient-list'
import { InstructionList } from './instruction-list'

interface RecipeForm {
  recipe?: ScraperRecipeWithIds | null
  recipeId?: string
  type: 'add' | 'edit'
}

export const RecipeForm: React.FC<RecipeForm> = ({ recipe, type, recipeId }) => (
  <>
    <Form
      id={`${type}-recipe-form`}
      className="flex gap-12 w-full max-w-screen-xl mx-auto flex-wrap justify-center"
      method="post"
    >
      <input name="type" type="text" defaultValue={type} hidden />
      {recipeId && <input name="recipeId" type="text" defaultValue={recipeId} hidden />}
      <div className="w-full md:w-5/12 md:min-w-[420px]">
        <Field
          labelProps={{ htmlFor: 'title-input', className: 'text-xl' }}
          inputProps={{
            type: 'text',
            name: 'title',
            id: 'title-input',
            required: true,
            defaultValue: recipe?.title,
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
            defaultValue: recipe?.url,
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
            defaultValue: recipe?.image_url ?? '',
          }}
        >
          Image URL
        </Field>
        <IngredientList initialIngredients={recipe?.ingredients} />
      </div>
      <div className="w-full md:w-5/12 md:min-w-[420px]">
        <InstructionList initialInstructions={recipe?.instructions} />
      </div>
    </Form>
    <div className="mt-8 text-center">
      <Button type="submit" form={`${type}-recipe-form`}>
        {type === 'edit' ? 'Save Recipe' : 'Add Recipe'}
      </Button>
    </div>
  </>
)
