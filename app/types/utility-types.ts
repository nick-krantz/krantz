import { ScraperRecipe } from "~/utils/recipe-scraper/scrapers/_base";

export type IngredientsWithSections = {
	title?: string;
	ingredients: string[];
};

export type ScraperRecipeWithIds = Modify<
	ScraperRecipe,
	{
		instructions: { id: string; instruction: string }[];
		ingredients: {
			title: string;
			id: string;
			ingredients: { id: string; ingredient: string }[];
		}[];
	}
>;

export type Modify<T, R> = Omit<T, keyof R> & R;
