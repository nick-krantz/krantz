import { createScraper, Scraper } from './_base'
import { tastyIngredients } from './tasty/tasty.ingredients'
import { tastyInstructions } from './tasty/tasty.instructions'

export const cookiesAndCupsScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: tastyIngredients('.tasty-recipes-ingredients-detail', $),
    instructions: tastyInstructions('.tasty-recipes-instructions li', $),
  }
}
