import { cleanText } from '~/utils/clean-text'
import { createScraper, Scraper } from './_base'

export const foodNetworkScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredients = $(
    '.o-Ingredients__m-Body .o-Ingredients__a-Ingredient:not(.o-Ingredients__a-Ingredient--SelectAll)',
  )
    .map((_, element) => cleanText($(element).text()))
    .toArray()

  const instructions = $('.bodyRight ol li')
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
