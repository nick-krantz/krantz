/**
 * Utility functions to read local JSON data files
 * Drop-in replacement for Supabase queries
 */

import recipesData from "../data/recipes.json";
import burgersData from "../data/burgers.json";
import bookmarksData from "../data/bookmarks.json";
import bookmarkCategoriesData from "../data/bookmark-categories.json";

/**
 * Get all recipes
 */
export function getRecipes() {
  return recipesData;
}

/**
 * Get a single recipe by ID
 */
export function getRecipeById(id: number) {
  const recipe = recipesData.find((r) => r.id === id);
  return recipe || null;
}

/**
 * Get all burgers
 */
export function getBurgers() {
  return burgersData;
}

/**
 * Get all bookmarks
 */
export function getBookmarks() {
  return bookmarksData;
}

/**
 * Get all bookmark categories
 */
export function getBookmarkCategories() {
  return bookmarkCategoriesData;
}
