import { MetaFunction, useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { supabase } from "~/utils/supabase/index.server";

export const meta: MetaFunction = ({ matches }) => {
	const parentMeta = matches
		.flatMap((match) => match.meta ?? [])
		.filter((meta) => !("title" in meta || "description" in meta));

	return [
		...parentMeta,
		{
			title: "Nick Krantz - Favorite Burgers",
			description: "A list of the best burgers I've ever ate.",
		},
	];
};

export const loader = async () => {
	const { data: burgers } = await supabase.from("burgers").select();
	burgers?.sort((a, b) => a.rank - b.rank);
	return json({
		burgers,
		pageDetails: { header: "The Best Burgers I've Ever Had" },
	});
};

/**
 * Burger page
 */
export default function Burgers() {
	const { burgers } = useLoaderData<typeof loader>();

	return (
		<div className="flex flex-col max-w-2xl mx-auto gap-8 w-full">
			<p className="text-center">
				I've thought more than once that I've had the best burger, so I started
				to track all of them. Why put it online? Because version control is cool
				and this is far more easier to maintain than a piece of paper.
			</p>
			{!!burgers && (
				<ol className="list-decimal marker:text-3xl">
					{burgers.map((burger, i) => (
						<li key={burger.id} className="pb-2 ml-7">
							<h4 className="text-3xl	">{burger.name}</h4>
							<a href={burger.url} className="underline">
								{burger.restaurant} - {burger.location}
							</a>
							<p>{burger.description}</p>
						</li>
					))}
				</ol>
			)}
		</div>
	);
}
