import { Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@vercel/remix";
import { Button } from "~/components/button";
import { PageDetails } from "~/components/header";
import { Bookmark } from "~/types";
import { supabase } from "~/utils/supabase/index.server";

type LoaderData = {
	bookmarks: Bookmark[] | null;
	pageDetails: PageDetails;
};

export const meta: MetaFunction = ({ matches }) => {
	const parentMeta = matches
		.flatMap((match) => match.meta ?? [])
		.filter((meta) => !("title" in meta || "description" in meta));

	return [
		...parentMeta,
		{
			title: "Nick Krantz - Bookmarks",
			description: "Personal bookmark storage",
		},
	];
};

export const loader: LoaderFunction = async () => {
	const { data: bookmarks } = await supabase.from("bookmarks").select();
	return json<LoaderData>({ bookmarks, pageDetails: { header: "Bookmarks" } });
};

/**
 * Bookmark page
 */
export default function Bookmarks() {
	const { bookmarks } = useLoaderData<LoaderData>();

	const categories = bookmarks
		?.reduce((accum: string[], bookmark) => {
			if (!accum.includes(bookmark.category)) {
				accum.push(bookmark.category);
			}
			return accum;
		}, [])
		.sort();

	return (
		<div className="w-full">
			<div className="max-w-screen-md mx-auto mb-6">
				<Link to="./add">
					<Button type="button">Add Bookmark</Button>
				</Link>
			</div>
			{categories?.map((category) => (
				<div className="max-w-screen-md mx-auto mb-6" key={category}>
					<h3 className="capitalize">{category}</h3>
					<ul className="marker:text-sky-800 dark:marker:text-sky-400 list-disc pl-5 space-y-3">
						{bookmarks
							?.filter((b) => b.category === category)
							.map((bookmark) => (
								<li key={bookmark.url}>
									<a
										href={bookmark.url}
										target="_blank"
										className="hover:underline"
										rel="noreferrer"
									>
										{bookmark.title}
									</a>
								</li>
							))}
					</ul>
				</div>
			))}
			<Outlet />
		</div>
	);
}
