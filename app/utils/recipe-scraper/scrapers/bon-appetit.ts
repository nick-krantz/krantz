import { createScraper, Scraper } from './_base'

export const bonAppetitScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredientUnits = $('[data-testid="IngredientList"] div p')
  const ingredientNames = $('[data-testid="IngredientList"] div div')
  const ingredients = ingredientUnits
    .map((i, element) => {
      return `${$(element).text()} ${$(ingredientNames[i]).text()}`.trim()
    })
    .toArray()

  const instructions = $('[data-testid="InstructionsWrapper"] p')
    .map((_, element) => `${$(element).text()}`)
    .toArray()

  return {
    ...baseRecipe,
    ingredients,
    instructions,
  }
}
