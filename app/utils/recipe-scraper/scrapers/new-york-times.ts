import { cleanText } from '~/utils/clean-text'
import { createScraper, Scraper } from './_base'

export const newYorkTimesScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredients = $('.recipe-ingredients')
    .first()
    .children('li')
    .map((_, element) => cleanText($(element).text()))
    .toArray()

  const instructions = $('.recipe-steps li')
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
