import { createScraper, Scraper } from './_base'
import { tastyIngredients } from './tasty/tasty.ingredients'
import { tastyInstructions } from './tasty/tasty.instructions'

export const theModernProperScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: tastyIngredients('.recipe-ingredients', $),
    instructions: tastyInstructions('.recipe-method__text-wrapper ol li', $),
  }
}
