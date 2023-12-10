import { v4 as uuidv4 } from "uuid";
import { IngredientsWithSections } from "~/types";
import { ScraperRecipeWithIds } from "~/types/utility-types";

/**
 * Adds unique ids to each section and individual ingredient
 */
export const addIdToIngredients = (
	ingredients: IngredientsWithSections[],
): ScraperRecipeWithIds["ingredients"] => {
	return ingredients.map((section) => ({
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
	instructions: string[],
): ScraperRecipeWithIds["instructions"] => {
	return instructions.map((i) => ({ instruction: i, id: uuidv4() }));
};
