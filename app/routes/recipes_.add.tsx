import { MetaFunction, useLoaderData } from "@remix-run/react";
import {
	ActionFunction,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@vercel/remix";
import { PageDetails } from "~/components/header";
import {
	addIdToIngredients,
	addIdToInstructions,
} from "~/utils/add-ids-to-recipe";
import { badRequest } from "~/utils/network";
import { getRecipe } from "~/utils/recipe-scraper";
import { getToken } from "~/utils/supabase/get-token";
import { getUser } from "~/utils/supabase/get-user";
import { supabase } from "~/utils/supabase/index.server";
import { RecipeForm } from "./_recipe.components/recipe-form";
import { Json } from "~/types/supabase";

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

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const type = formData.get("type");
	const recipeId = formData.get("recipeId");
	const title = formData.get("title");
	const url = formData.get("url");
	const imageUrl = formData.get("image-url");
	const instructions = formData.getAll("instructions");
	const sectionKeys: string[] = [];
	const ingredientKeys: string[] = [];

	for (const key of formData.keys()) {
		if (/ingredient-section\[[0-9]\]/.test(key)) {
			sectionKeys.push(key);
		}
		if (
			/ingredients\[[0-9]\]/.test(key) &&
			ingredientKeys.includes(key) === false
		) {
			ingredientKeys.push(key);
		}
	}

	if (!type || (type !== "add" && type !== "edit")) {
		return badRequest({
			error: { message: `Invalid type: ${type}` },
		});
	}

	if (type === "edit" && !recipeId) {
		return badRequest({
			error: { message: `Missing recipeId: ${recipeId}` },
		});
	}

	if (sectionKeys.length !== ingredientKeys.length) {
		return badRequest({
			error: {
				message: "Ingredients found and number of sections are not the same",
			},
		});
	}

	const ingredientSections = sectionKeys.map((sectionKey, i) => {
		const sectionTitle = formData.get(sectionKey);
		const ingredients = formData.getAll(ingredientKeys[i]);

		return {
			title: sectionTitle || "",
			ingredients,
		};
	});

	const token = await getToken(request);

	supabase.auth.setSession(token);

	if (type === "add") {
		const created_by = (await getUser(request))?.id;

		const response = await supabase
			.from("full_recipes")
			.insert({
				title: title as string,
				url: url as string,
				image_url: imageUrl as string | null,
				instructions: instructions as Json,
				ingredients: ingredientSections as Json,
				created_by: created_by as string,
			})
			.select();

		if (response.error) {
			return badRequest({
				error: response.error,
				data: {
					title,
					url,
					"image-url": imageUrl,
					instructions,
					ingredients: ingredientSections,
				},
			});
		}

		return redirect(`../../recipes/${response.data?.[0]?.id}`);
	}

	const { error } = await supabase
		.from("full_recipes")
		.update({
			title: title as string,
			url: url as string,
			image_url: imageUrl as string | null,
			instructions: instructions as Json,
			ingredients: ingredientSections as Json,
		})
		.eq("id", recipeId as string);

	if (error) {
		return badRequest({
			error: error,
			data: {
				title,
				url,
				image_url: imageUrl,
				instructions,
				ingredients: ingredientSections,
			},
		});
	}

	return redirect(`../../recipes/${recipeId}`);
};

/**
 * Recipe page
 */
export default function Recipes() {
	const { recipe } = useLoaderData<typeof loader>();

	return <RecipeForm type="add" recipe={recipe} />;
}
