import { useState } from "react";
import { FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { Button } from "~/components/button";
import { Field } from "~/components/field";
import { Icon } from "~/components/icon";
import { ScraperRecipeWithIds } from "~/types/utility-types";

interface IngredientListProps {
	initialIngredients?: ScraperRecipeWithIds["ingredients"];
}

/**
 * Ingredient list
 */
export const IngredientList: React.FC<IngredientListProps> = ({
	initialIngredients,
}) => {
	const [sections, setIngredients] = useState<
		ScraperRecipeWithIds["ingredients"]
	>(initialIngredients ?? []);

	const addIngredientSection = () => {
		setIngredients([...sections, { id: uuidv4(), title: "", ingredients: [] }]);
	};

	const addIngredient = (id: string) => {
		setIngredients(
			sections.map((section) => {
				if (section.id === id) {
					return {
						...section,
						ingredients: [
							...section.ingredients,
							{ id: uuidv4(), ingredient: "" },
						],
					};
				}
				return section;
			}),
		);
	};

	const removeIngredient = (sectionId: string, ingredientId: string) => {
		setIngredients(
			sections.map((section) => {
				if (section.id === sectionId) {
					return {
						...section,
						ingredients: section.ingredients.filter(
							(i) => i.id !== ingredientId,
						),
					};
				}
				return section;
			}),
		);
	};

	const removeSection = (sectionId: string) => {
		setIngredients(sections.filter((section) => section.id !== sectionId));
	};

	return (
		<div className="flex flex-col mt-8">
			<legend className="mb-2 text-xl font-semibold">Ingredients</legend>
			{sections.map((section, sectionIndex) => (
				<fieldset key={section.id}>
					<div className="flex gap-4 items-center mb-2">
						<Field
							className="flex-1"
							labelProps={{ htmlFor: section.id, className: "text-lg" }}
							inputProps={{
								type: "text",
								name: `ingredient-section[${sectionIndex}]`,
								id: section.id,
								defaultValue: section.title,
							}}
						>
							Section Title (optional)
						</Field>
						<Button
							type="button"
							variant="secondary"
							className="p-1"
							aria-label="Remove ingredient"
							onClick={() => removeSection(section.id)}
						>
							<Icon Icon={FiX} />
						</Button>
					</div>
					<ul className="list mb-2 list-[square] list-outside ml-6">
						{section.ingredients.map(({ id, ingredient }, i) => (
							<li className="list-item mb-2" key={`ingredient-${id}`}>
								<div className="flex gap-4 items-center ">
									<Field
										className="flex-1"
										labelProps={{ htmlFor: id, className: "text-lg" }}
										inputProps={{
											type: "text",
											name: `ingredients[${sectionIndex}]`,
											id: id,
											required: true,
											defaultValue: ingredient,
										}}
										hiddenLabel
									>
										Ingredient {i}
									</Field>
									<Button
										type="button"
										variant="secondary"
										className="p-1"
										aria-label="Remove ingredient"
										onClick={() => removeIngredient(section.id, id)}
									>
										<Icon Icon={FiX} />
									</Button>
								</div>
							</li>
						))}
					</ul>
					<Button type="button" onClick={() => addIngredient(section.id)}>
						Add Ingredient
					</Button>
				</fieldset>
			))}

			<div className="flex gap-8 justify-end">
				<Button type="button" onClick={addIngredientSection}>
					Add Ingredient Section
				</Button>
			</div>
		</div>
	);
};
