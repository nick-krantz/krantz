import { IngredientsWithSections } from '~/types'
import { cleanText } from '~/utils/clean-text'
import { createScraper, Scraper } from './_base'

export const simplyRecipesScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url)

  const ingredients: IngredientsWithSections[] = []

  const ingredientSections = $('.structured-ingredients__list-heading')
  const ingredientLists = $('.structured-ingredients__list')

  if (ingredientSections.length) {
    ingredientLists.each((index, ele) => {
      ingredients.push({
        title: cleanText($(ingredientSections.get(index)).text()),
        ingredients: $(ele)
          .children('li')
          .map((_, child) => cleanText($(child).text()))
          .toArray(),
      })
    })
  } else {
    ingredients.push({
      title: '',
      ingredients: $('ul.ingredient-list li.ingredient')
        .map((_, element) => cleanText($(element).text()))
        .toArray(),
    })
  }

  const instructions = $('ol li p.mntl-sc-block')
    .map((_, element) => cleanText($(element).text()))
    .toArray()

  return {
    ...baseRecipe,
    ingredients: ingredients,
    instructions,
  }
}
