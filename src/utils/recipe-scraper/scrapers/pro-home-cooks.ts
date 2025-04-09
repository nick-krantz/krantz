import { cleanText } from "~/utils/clean-text";
import { Scraper, createScraper } from "./_base";

export const proHomeCooksScraper: Scraper = async (url) => {
  const { baseRecipe, $ } = await createScraper(url);

  const ingredients = $(".vd-ingredient-item .item-ingredient-wrap label")
    .map((_, element) => cleanText($(element).text()))
    .toArray();

  const instructions = $(".vd-instruction-step p")
    .map((_, element) => cleanText($(element).text()))
    .toArray();

  return {
    ...baseRecipe,
    ingredients: [
      {
        ingredients,
      },
    ],
    instructions,
  };
};
