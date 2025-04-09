import { Scraper, createScraper } from "../_base";
import { tastyIngredients } from "./tasty.ingredients";
import { tastyInstructions } from "./tasty.instructions";

export const tastyDefaultScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url);

  return {
    ...baseRecipe,
    ingredients: tastyIngredients($),
    instructions: tastyInstructions($),
  };
};
