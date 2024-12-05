import { ActionFunction, redirect } from "@vercel/remix";
import { badRequest } from "~/utils/network";
import { getToken } from "~/utils/supabase/get-token";
import { getUser } from "~/utils/supabase/get-user";
import { supabase } from "~/utils/supabase/index.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const restaurant = formData.get("restaurant");
  const location = formData.get("location");
  const description = formData.get("description");
  const rank = formData.get("rank");

  if (
    typeof name !== "string" ||
    typeof restaurant !== "string" ||
    typeof location !== "string" ||
    typeof description !== "string" ||
    typeof rank !== "string"
  ) {
    return badRequest({
      error: { message: "Please fill out all required fields" },
    });
  }

  const token = await getToken(request);
  supabase.auth.setSession(token);

  const created_by = (await getUser(request))?.id;

  const { data: existingBurgers, error: fetchError } = await supabase
    .from("burgers")
    .select("rank");

  if (fetchError) {
    return badRequest({
      error: fetchError,
      data: {
        name,
        restaurant,
        location,
        description,
        rank,
      },
    });
  }

  const newRank = parseInt(rank, 10);

  const response = await supabase
    .from("burgers")
    .insert({
      name,
      restaurant,
      location,
      description,
      created_by,
      rank: newRank,
    })
    .select();

  if (response.error) {
    return badRequest({
      error: response.error,
      data: {
        name,
        restaurant,
        location,
        description,
        rank,
      },
    });
  }

  const { error: updateError } = await supabase.rpc("increment_burger_ranks", {
    new_rank: newRank,
  });

  if (updateError) {
    return badRequest({
      error: updateError,
      data: {
        name,
        restaurant,
        location,
        description,
        rank,
      },
    });
  }

  return redirect("/burgers");
};
