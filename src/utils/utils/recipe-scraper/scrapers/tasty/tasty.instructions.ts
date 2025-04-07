import { CheerioAPI } from "cheerio";
import { cleanText } from "~/utils/clean-text";

const instructionSelectors = [
	".tasty-recipe-instructions li",
	".recipe-method__text-wrapper ol li",
	".mv-create-instructions li",
	".tasty-recipes-instructions-body ol li",
];

const getSelector = ($: CheerioAPI): string | undefined => {
	return instructionSelectors.find((selector) => $(selector).length > 0);
};

export const tastyInstructions = ($: CheerioAPI): string[] => {
	const selector = getSelector($);

	// When a container for ingredients isn't found return empty ingredients
	if (!selector) {
		return [];
	}

	return $(selector)
		.map((_, element) => cleanText($(element).text()))
		.toArray();
};
