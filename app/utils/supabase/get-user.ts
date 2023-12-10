import { User } from "@supabase/supabase-js";
import { getToken } from "./get-token";
import { supabase } from "./index.server";

export const getUser = async (request: Request): Promise<User | null> => {
	const { access_token } = await getToken(request);

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(access_token);

	if (error) console.error(error);

	return user;
};
