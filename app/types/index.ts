/** Types should be exported from this file, not supabase.ts */
import { definitions } from './supabase'
import { IngredientsWithSections } from './utility-types'
export type { IngredientsWithSections } from './utility-types'

export type Burger = definitions['burgers']
export type Bookmark = definitions['bookmarks']
export type BookmarkCategories = definitions['bookmark-categories']

export type SupabaseRecipe = {
  ingredients: string
  instructions: string
} & Omit<definitions['full_recipes'], 'ingredients' | 'instructions'>

export type Recipe = {
  ingredients: IngredientsWithSections[]
  instructions: string[]
} & Omit<definitions['full_recipes'], 'ingredients' | 'instructions'>
