import { Cheerio, CheerioAPI, Element } from 'cheerio'
import { IngredientsWithSections } from '~/types'
import { cleanText } from '~/utils/clean-text'

const ingredientContainerClasses = [
  '.tasty-recipe-ingredients',
  '.tasty-recipes-ingredients-detail',
  '.mv-create-ingredients',
  '.recipe-ingredients',
  '.tasty-recipes-ingredients-body',
]

const getContainerClass = ($: CheerioAPI): string | undefined => {
  return ingredientContainerClasses.find((className) => $(className).length > 0)
}

const getIngredientArray = (ele: Cheerio<Element>, $: CheerioAPI): string[] => {
  return ele
    .children('li')
    .toArray()
    .map((c) => cleanText($(c).text()))
}

export const tastyIngredients = ($: CheerioAPI): IngredientsWithSections[] => {
  const ingredients: IngredientsWithSections[] = []
  let addToPrevious = false

  const containerClass = getContainerClass($)

  // When a container for ingredients isn't found return empty ingredients
  if (!containerClass) {
    return [
      {
        ingredients: [],
      },
    ]
  }

  const ingredientContainer = $(containerClass)
  const containerChildren = ingredientContainer.children().toArray()

  containerChildren.forEach((c) => {
    const child = $(c)
    const tagName = child.get(0).tagName
    if (tagName === 'ul' && !addToPrevious) {
      // ingredient section without a title, add without one
      ingredients.push({
        title: '',
        ingredients: getIngredientArray(child, $),
      })
    } else if (tagName === 'ul' && addToPrevious) {
      // The previous sibling was a lone H4, add these ingredients to that section
      const lastEntryIndex = ingredients.length - 1
      ingredients[lastEntryIndex].ingredients = getIngredientArray(child, $)
      addToPrevious = false
    } else if (tagName === 'h4') {
      // H4 are section titles, text encountered ul should be its ingredient list
      addToPrevious = true
      ingredients.push({
        title: cleanText(child.text()),
        ingredients: [],
      })
    }
  })

  return ingredients
}
