import { MetaFunction, useLoaderData, Form } from "@remix-run/react";
import { json } from "@vercel/remix";
import { Button } from "~/components/button";
import { Field } from "~/components/field";
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
			<Form method="post" action="/api/save-burger" className="flex flex-col gap-4">
				<Field
					labelProps={{ htmlFor: "name-input" }}
					inputProps={{
						type: "text",
						name: "name",
						id: "name-input",
						required: true,
					}}
				>
					Name
				</Field>
				<Field
					labelProps={{ htmlFor: "restaurant-input" }}
					inputProps={{
						type: "text",
						name: "restaurant",
						id: "restaurant-input",
						required: true,
					}}
				>
					Restaurant
				</Field>
				<Field
					labelProps={{ htmlFor: "location-input" }}
					inputProps={{
						type: "text",
						name: "location",
						id: "location-input",
						required: true,
					}}
				>
					Location
				</Field>
				<Field
					labelProps={{ htmlFor: "description-input" }}
					inputProps={{
						type: "text",
						name: "description",
						id: "description-input",
						required: true,
					}}
				>
					Description
				</Field>
				<Field
					labelProps={{ htmlFor: "rank-input" }}
					inputProps={{
						type: "number",
						name: "rank",
						id: "rank-input",
						required: true,
					}}
				>
					Rank
				</Field>
				<Field
					labelProps={{ htmlFor: "latitude-input" }}
					inputProps={{
						type: "number",
						name: "latitude",
						id: "latitude-input",
						required: true,
					}}
				>
					Latitude
				</Field>
				<Field
					labelProps={{ htmlFor: "longitude-input" }}
					inputProps={{
						type: "number",
						name: "longitude",
						id: "longitude-input",
						required: true,
					}}
				>
					Longitude
				</Field>
				<Button type="submit">Add Burger</Button>
			</Form>
		</div>
	);
}
