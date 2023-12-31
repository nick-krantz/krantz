import { createCookieSessionStorage } from "@vercel/remix";

//
// lifted directly from the remix documentation
// https://remix.run/docs/en/v1/api/remix#sessions
//
const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		// a Cookie from `createCookie` or the CookieOptions to create one
		cookie: {
			name: "sb:token",

			httpOnly: true,
			maxAge: 2592000,
			path: "/",
			sameSite: "strict",
			secrets: ["s3cret1"],
			secure: true,
		},
	});

export { getSession, commitSession, destroySession };
