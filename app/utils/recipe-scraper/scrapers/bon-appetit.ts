import { cleanText } from '~/utils/clean-text'
import { createScraper, Scraper } from './_base'

export const bonAppetitScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredientUnits = $('[data-testid="IngredientList"] div p')
  const ingredientNames = $('[data-testid="IngredientList"] div div')
  const ingredients = ingredientUnits
    .map((i, element) => {
      return cleanText(`${$(element).text()} ${$(ingredientNames[i]).text()}`)
    })
    .toArray()

  const instructions = $('[data-testid="InstructionsWrapper"] p')
    .map((_, element) => cleanText($(element).text()))
    .toArray()

  return {
    ...baseRecipe,
    ingredients: [
      {
        ingredients,
      },
    ],
    instructions,
  }
}
