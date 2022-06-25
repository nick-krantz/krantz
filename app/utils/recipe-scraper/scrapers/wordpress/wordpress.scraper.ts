import { createScraper, Scraper } from '../_base'
import { wordpressIngredients } from './wordpress.ingredients'
import { wordpressStructuredInstructions } from './wordpress.instructions'

export const wordPressDefaultScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: wordpressIngredients($),
    instructions: wordpressStructuredInstructions($),
  }
}
