import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/button'
import { Field } from '~/components/field'
import { Icon } from '~/components/icon'
import { RecipeWithId } from '~/types'

interface IngredientListProps {
  initialIngredients?: RecipeWithId['ingredients']
}

/**
 * Ingredient list
 */
export const IngredientList: React.FC<IngredientListProps> = ({ initialIngredients }) => {
  const [ingredients, setIngredients] = useState<RecipeWithId['ingredients']>(initialIngredients ?? [])

  const addIngredient = () => {
    setIngredients([...ingredients, { id: uuidv4(), ingredient: '' }])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id))
  }

  return (
    <fieldset className="flex flex-col mt-8">
      <legend className="mb-2 text-xl font-semibold">Ingredients</legend>
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
  )
}
