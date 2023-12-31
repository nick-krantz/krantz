/** Types should be exported from this file, not supabase.ts */
import { Database } from "./supabase";
import { IngredientsWithSections } from "./utility-types";
export type { IngredientsWithSections } from "./utility-types";

export type Burger = Database["public"]["Tables"]["burgers"]["Row"];
export type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];
export type BookmarkCategories =
	Database["public"]["Tables"]["bookmark-categories"]["Row"];

export type Recipe = {
	ingredients: IngredientsWithSections[] | null;
	instructions: string[] | null;
} & Omit<
	Database["public"]["Tables"]["full_recipes"]["Row"],
	"ingredients" | "instructions"
>;
