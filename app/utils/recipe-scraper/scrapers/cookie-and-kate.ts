import { createScraper, Scraper } from './_base'
import { tastyIngredients } from './tasty/tasty.ingredients'
import { tastyInstructions } from './tasty/tasty.instructions'

export const cookieAndKateScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: tastyIngredients('.tasty-recipe-ingredients', $),
    instructions: tastyInstructions('.tasty-recipe-instructions li', $),
  }
}
