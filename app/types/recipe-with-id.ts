/**
 * Recipe Object where ingredients & instructions have unique ids
 */
export interface RecipeWithId {
  title: string
  url: string
  image: string | null
  instructions: { instruction: string; id: string }[]
  ingredients: { ingredient: string; id: string }[]
}
