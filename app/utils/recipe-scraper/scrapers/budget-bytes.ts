import { createScraper, Scraper } from './_base'
import { wordpressIngredients } from './wordpress/wordpress.ingredients'
import { wordpressStructuredInstructions } from './wordpress/wordpress.instructions'

export const budgetByteScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  return {
    ...baseRecipe,
    ingredients: wordpressIngredients($).map((section) => {
      return {
        ...section,
        ingredients: section.ingredients.map((ingredient) => ingredient.replace(/\(\$.*\)/g, '')),
      }
    }),
    instructions: wordpressStructuredInstructions($),
  }
}
