/**
 * Recipe Object where ingredients & instructions have unique ids
 */
export interface RecipeWithId {
  id: string
  title: string
  url: string
  image: string | null
  instructions: { instruction: string; id: string }[]
  ingredientSections: { title: string; id: string; ingredients: { id: string; ingredient: string }[] }[]
}

export type IngredientSections = {
  title?: string
  ingredients: string[]
}
