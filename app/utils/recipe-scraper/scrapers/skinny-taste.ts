import { createScraper, Scraper } from './_base'
import { wordpressIngredients } from './wordpress/wordpress.ingredients'
import { wordpressStructuredInstructions } from './wordpress/wordpress.instructions'

export const skinnyTasteScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: wordpressIngredients($),
    instructions: wordpressStructuredInstructions($),
  }
}
