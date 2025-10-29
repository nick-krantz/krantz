import { v4 as uuidv4 } from "uuid";
import type { IngredientsWithSections } from "../types/IngredientsWithSections";
import type { ScraperRecipeWithIds } from "../types/ScraperRecipeWithIds";

/**
 * Adds unique ids to each section and individual ingredient
 */
export const addIdToIngredients = (
  ingredients: IngredientsWithSections[] | null
): ScraperRecipeWithIds["ingredients"] => {
  return (ingredients ?? []).map((section) => ({
    title: section.title || "",
    id: uuidv4(),
    ingredients: section.ingredients.map((i) => ({
      ingredient: i,
      id: uuidv4(),
    })),
  }));
};

/**
 * Adds unique ids to each instruction
 */
export const addIdToInstructions = (
  instructions: string[] | null
): ScraperRecipeWithIds["instructions"] => {
  return (instructions ?? []).map((i) => ({ instruction: i, id: uuidv4() }));
};
