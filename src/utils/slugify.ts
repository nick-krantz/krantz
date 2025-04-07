/**
 * Standardizes a string for use in a URL by:
 * - converting to lowercase
 * - replacing spaces with hyphens
 * - replacing underscores with hyphens
 * - removing all non-alphanumeric characters
 * - replace any duplicate hyphens with a single hyphen
 */
export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/(\s)+/g, "-")
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    .replace(/-{2,}/gi, "-");
