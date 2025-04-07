import { Scraper, createScraper } from "./_base";
import { wordpressIngredients } from "./wordpress/wordpress.ingredients";
import { wordpressInstructions } from "./wordpress/wordpress.instructions";

export const halfBakedHarvestScraper: Scraper = async (url) => {
	const { baseRecipe, $ } = await createScraper(url);

	return {
		...baseRecipe,
		ingredients: wordpressIngredients($),
		instructions: wordpressInstructions($),
	};
};
