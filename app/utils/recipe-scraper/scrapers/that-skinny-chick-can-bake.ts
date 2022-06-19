import { createScraper, Scraper } from './_base'
import { tastyIngredients } from './tasty/tasty.ingredients'
import { tastyInstructions } from './tasty/tasty.instructions'

export const thatSkinnyChickCanBakeScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: tastyIngredients('.mv-create-ingredients', $),
    instructions: tastyInstructions('.mv-create-instructions li', $),
  }
}
