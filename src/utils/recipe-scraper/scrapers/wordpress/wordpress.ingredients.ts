import { CheerioAPI } from "cheerio";
import { IngredientsWithSections } from "~/types";
import { cleanText } from "~/utils/clean-text";

export const wordpressIngredients = (
  $: CheerioAPI,
): IngredientsWithSections[] => {
  return $(".wprm-recipe-ingredient-group")
    .map((_, ele) => ({
      title: cleanText(
        $(ele).children(".wprm-recipe-ingredient-group-name").text(),
      ),
      ingredients: $(ele)
        .children(".wprm-recipe-ingredients")
        .children(".wprm-recipe-ingredient")
        .map((_, ele) => cleanText($(ele).text()))
        .toArray(),
    }))
    .toArray();
};
