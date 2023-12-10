export const cleanText = (text: string): string => {
	return text.replace("▢", "").replace(":", "").replace(/\s+/g, " ").trim();
};
