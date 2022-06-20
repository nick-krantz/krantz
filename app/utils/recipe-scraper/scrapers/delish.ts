import { cleanText } from '~/utils/clean-text'
import { createScraper, Scraper } from './_base'

export const delishScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredients = $('.ingredient-lists .ingredient-item')
    .map((_, element) => cleanText($(element).text()))
    .toArray()

  const instructions = $('.direction-lists ol li')
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
