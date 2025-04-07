/** Types should be exported from this file, not supabase.ts */
import type { Database } from "./Database";

export type Burger = Database["public"]["Tables"]["burgers"]["Row"];
export type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];
export type BookmarkCategories =
  Database["public"]["Tables"]["bookmark-categories"]["Row"];
