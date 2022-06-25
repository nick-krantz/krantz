import { createScraper, Scraper } from './_base'
import { wordpressIngredients } from './wordpress/wordpress.ingredients'
import { wordpressFlatInstructions } from './wordpress/wordpress.instructions'

export const halfBakedHarvestScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: wordpressIngredients($),
    instructions: wordpressFlatInstructions($),
  }
}
