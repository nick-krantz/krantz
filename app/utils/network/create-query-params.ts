export const createQueryParams = (obj: Record<string, string>): string => {
	// check for empty keys/values
	if (Object.keys(obj).length === 0 || Object.values(obj).length === 0)
		return "";

	// build query param string
	return Object.entries(obj).reduce((queryParams, [key, value]) => {
		const encodedValue = encodeURIComponent(value);
		return queryParams.length === 0
			? `?${key}=${encodedValue}`
			: `${queryParams}&${key}=${encodedValue}`;
	}, "");
};
