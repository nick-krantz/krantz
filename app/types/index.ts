/** Types should be exported from this file, not supabase.ts */
import { definitions } from './supabase'

export type Recipe = definitions['recipes']
export type Burger = definitions['burgers']
export type Bookmark = definitions['bookmarks']
export type BookmarkCategories = definitions['bookmark-categories']
