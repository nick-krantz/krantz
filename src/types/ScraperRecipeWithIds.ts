import type { ScraperRecipe } from "../utils/recipe-scraper/scrapers/_base";
import type { Modify } from "./Modify";

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
