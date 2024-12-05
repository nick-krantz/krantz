import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { PostgrestError } from "@supabase/supabase-js";
import { ActionFunction, LoaderFunctionArgs, redirect } from "@vercel/remix";
import { FiX } from "react-icons/fi";
import { Button } from "~/components/button";
import { ErrorMessage } from "~/components/error-message";
import { Field } from "~/components/field";
import { Modal } from "~/components/modal";
import { badRequest } from "~/utils/network";
import { getToken } from "~/utils/supabase/get-token";
import { supabase } from "~/utils/supabase/index.server";
import { authenticated } from "~/utils/supabase/authenticated";

type ActionData = {
  error: PostgrestError;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { authorized } = await authenticated(request, ({ authorized }) => {
    return Promise.resolve({ authorized });
  });

  if (!authorized) {
    return redirect("/burgers");
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const restaurant = form.get("restaurant");
  const location = form.get("location");
  const description = form.get("description");
  const rank = form.get("rank");
  const url = form.get("url");
  const latitude = form.get("latitude");
  const longitude = form.get("longitude");

  if (typeof name !== "string" || !name) {
    return badRequest({
      error: { message: "Please enter a burger name" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof restaurant !== "string" || !restaurant) {
    return badRequest({
      error: { message: "Please enter a restaurant name" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof location !== "string" || !location) {
    return badRequest({
      error: { message: "Please enter a location" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof description !== "string" || !description) {
    return badRequest({
      error: { message: "Please enter a description" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof rank !== "string" || !rank) {
    return badRequest({
      error: { message: "Please enter a rank" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof url !== "string" || !url) {
    return badRequest({
      error: { message: "Please enter a URL" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof latitude !== "string" || !latitude) {
    return badRequest({
      error: { message: "Please enter a latitude" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (typeof longitude !== "string" || !longitude) {
    return badRequest({
      error: { message: "Please enter a longitude" },
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  const token = await getToken(request);

  supabase.auth.setSession(token);

  const { data: existingBurgers, error: fetchError } = await supabase
    .from("burgers")
    .select()
    .eq("rank", rank);

  if (fetchError) {
    return badRequest({
      error: fetchError,
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  if (existingBurgers.length > 0) {
    const { error: updateError } = await supabase
      .from("burgers")
      .update({ rank: supabase.raw("rank + 1") })
      .gte("rank", rank);

    if (updateError) {
      return badRequest({
        error: updateError,
        data: { name, restaurant, location, description, rank, url, latitude, longitude },
      });
    }
  }

  const { error } = await supabase
    .from("burgers")
    .insert([{ name, restaurant, location, description, rank, url, latitude, longitude }]);

  if (error) {
    return badRequest({
      error,
      data: { name, restaurant, location, description, rank, url, latitude, longitude },
    });
  }

  return redirect("/burgers");
};

export default function AddBurger() {
  const navigation = useNavigate();
  const actionData = useActionData<ActionData>();

  const close = () => {
    navigation("/burgers");
  };

  return (
    <Modal>
      <h2
        className="flex justify-between items-center text-lg leading-6 font-medium text-gray-800 dark:text-gray-200"
        id="modal-title"
      >
        Add Burger
        <button
          className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
          onClick={close}
          type="button"
        >
          <FiX />
        </button>
      </h2>
      <Form
        id="submit-burger-form"
        method="POST"
        aria-describedby={
          actionData?.error?.message ? "form-error-message" : undefined
        }
      >
        <div className="flex flex-col gap-5">
          <Field
            labelProps={{ htmlFor: "name-input" }}
            inputProps={{
              type: "text",
              name: "name",
              id: "name-input",
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
            }}
          >
            Rank
          </Field>
          <Field
            labelProps={{ htmlFor: "url-input" }}
            inputProps={{
              type: "url",
              name: "url",
              id: "url-input",
            }}
          >
            URL
          </Field>
          <Field
            labelProps={{ htmlFor: "latitude-input" }}
            inputProps={{
              type: "number",
              name: "latitude",
              id: "latitude-input",
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
            }}
          >
            Longitude
          </Field>

          <ErrorMessage id="form-error-message">
            {actionData?.error?.message}
          </ErrorMessage>

          <div className="flex justify-end gap-2 w-full">
            <Button variant="secondary" onClick={close} type="button">
              Cancel
            </Button>
            <Button type="submit" form="submit-burger-form">
              Submit Burger
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
