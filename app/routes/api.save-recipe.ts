import { ActionFunction, redirect } from "@vercel/remix";

import { badRequest } from "~/utils/network";
import { getToken } from "~/utils/supabase/get-token";
import { getUser } from "~/utils/supabase/get-user";
import { supabase } from "~/utils/supabase/index.server";
import { Json } from "~/types/supabase";

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
