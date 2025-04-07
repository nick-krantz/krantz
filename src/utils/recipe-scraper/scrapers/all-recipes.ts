import { IngredientsWithSections } from "~/types";
import { cleanText } from "~/utils/clean-text";
import { Scraper, createScraper } from "./_base";

export const allRecipesScraper: Scraper = async (url) => {
	const { baseRecipe, $ } = await createScraper(url);

	const ingredients: IngredientsWithSections[] = [];
	const instructions: string[] = [];

	const ingredientListsAndSections = $("ul.ingredients-section");

	// Nicely formatted sections
	if (ingredientListsAndSections.length) {
		ingredientListsAndSections.each((_, element) => {
			ingredients.push({
				title: "", // haven't seen a title for these types yet
				ingredients: $(element)
					.children("li")
					.map((_, listItem) => {
						return $(listItem)
							.children(".checkbox-list")
							.children(".checkbox-list-checkmark")
							.children(".ingredients-item-name");
					})
					.map((_, child) => cleanText($(child).text()))
					.toArray(),
			});
		});

		$("ul.instructions-section .section-body").each((_, element) => {
			instructions.push(cleanText($(element).text()));
		});
	} else {
		let currentIndex = -1;
		$(".checklist").each((_, ele) => {
			const ingredientLines = $(ele).children();
			ingredientLines.each((_, ele) => {
				const label = $(ele).children("label");
				// parse labels by their angular class which is hacky AF
				if (label.attr()["ng-class"] === "{true: 'checkList__item'}[false]") {
					ingredients.push({
						title: cleanText(label.text().replace(":", "")),
						ingredients: [],
					});
					currentIndex = currentIndex + 1;
				} else if (
					label.attr()["ng-class"] === "{true: 'checkList__item'}[true]"
				) {
					ingredients[currentIndex]?.ingredients.push(cleanText(label.text()));
				}
			});
		});

		$(".recipe-directions__list .step").each((_, element) => {
			instructions.push(cleanText($(element).text()));
		});
	}

	return {
		...baseRecipe,
		ingredients: ingredients,
		instructions,
	};
};
