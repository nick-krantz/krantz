import { MetaFunction, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { PageDetails } from "~/components/header";
import {
	addIdToIngredients,
	addIdToInstructions,
} from "~/utils/add-ids-to-recipe";
import { getRecipe } from "~/utils/recipe-scraper";
import { RecipeForm } from "./_recipe.components/recipe-form";

export const meta: MetaFunction = ({ matches }) => {
	const parentMeta = matches
		.flatMap((match) => match.meta ?? [])
		.filter((meta) => !("title" in meta || "description" in meta));

	return [
		...parentMeta,
		{
			title: "Nick Krantz - Add Recipe",
			description: "Add Recipe",
		},
	];
};

const pageDetails: PageDetails = { header: "Add Recipe", backLink: "/recipes" };

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { searchParams } = new URL(request.url);
	const url = decodeURIComponent(searchParams.get("url") ?? "");
	if (!url) {
		return json({ recipe: null, pageDetails });
	}
	const baseRecipe = await getRecipe(url);

	if (baseRecipe) {
		return json({
			recipe: {
				...baseRecipe,
				ingredients: addIdToIngredients(baseRecipe.ingredients),
				instructions: addIdToInstructions(baseRecipe.instructions),
			},
			pageDetails,
		});
	} else {
		return json({ recipe: null, pageDetails });
	}
};

/**
 * Recipe page
 */
export default function Recipes() {
	const { recipe } = useLoaderData<typeof loader>();

	return <RecipeForm type="add" recipe={recipe} />;
}
