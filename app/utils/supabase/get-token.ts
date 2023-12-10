import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/access-token";
import { getSession } from "./get-session.server";

/**
 * Retrieves the token of the user from a request
 */
export const getToken = async (
	request: Request,
): Promise<{ access_token: string; refresh_token: string }> => {
	const session = await getSession(request.headers.get("Cookie"));
	return {
		access_token: session.get(ACCESS_TOKEN),
		refresh_token: session.get(REFRESH_TOKEN),
	};
};
