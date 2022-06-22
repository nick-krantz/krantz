import { Recipe, SupabaseRecipe } from '~/types'

/**
 * Instructions & ingredients are objects but stored as text, converts them to json objects
 */
export const parseRecipe = (recipe: SupabaseRecipe): Recipe => ({
  ...recipe,
  ingredients: JSON.parse(recipe.ingredients),
  instructions: JSON.parse(recipe.instructions),
})
