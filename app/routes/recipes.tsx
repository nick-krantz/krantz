import { Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { Button } from "~/components/button";
import { RecipeList } from "../components/recipe-list";
import { Recipe } from "~/types";
import { getToken } from "~/utils/supabase/get-token";
import { supabase } from "~/utils/supabase/index.server";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta || "description" in meta));

  return [
    ...parentMeta,
    {
      title: "Nick Krantz - Recipes",
      description: "Recipes worth making",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = await getToken(request);

  supabase.auth.setSession(token);

  const { data: recipes } = await supabase.from("full_recipes").select();
  return json({
    recipes: recipes as Recipe[] | null,
    pageDetails: { header: "Recipes" },
  });
};

/**
 * Recipe page
 */
export default function Recipes() {
  const { recipes } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="max-w-screen-xl mx-auto text-center">
        <Link to="./fetch">
          <Button>Add Recipe</Button>
        </Link>
      </div>
      {!!recipes && <RecipeList recipes={recipes} />}
      <Outlet />
    </>
  );
}
