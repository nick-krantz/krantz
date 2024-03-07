import { LoaderFunction, json, ActionFunction } from "@vercel/remix";
import strava from "strava-v3";
import { supabase } from "~/utils/supabase/index.server";

const saveWorkoutToDB = async (workoutId: string) => {
  try {
    // Get tokens from Supabase
    const { data, error } = await supabase
      .from("strava")
      .select()
      .eq("id", "1")
      .limit(1)
      .single();

    if (!data || error) {
      throw new Error(`No strava data found ${error.message}`);
    }

    // Set up strava client with attributes
    strava.config({
      client_id: process.env.STRAVA_CLIENT_ID!,
      client_secret: process.env.STRAVA_CLIENT_SECRET!,
      redirect_uri: process.env.STRAVA_REDIRECT_URI!,
      access_token: data.access_token,
    });

    // Refresh the strava tokens
    const refreshResponse = await strava.oauth.refreshToken(data.refresh_token);

    // Update the tokens in the supabase db
    await supabase
      .from("strava")
      .update({
        access_token: refreshResponse.access_token,
        refresh_token: refreshResponse.refresh_token,
        expires_at: refreshResponse.expires_at,
      })
      .eq("id", "1");

    const activityResponse = await strava.activities.get({
      id: workoutId,
      includeAllEfforts: true,
      access_token: refreshResponse.access_token,
    });

    const workout = {
      average_speed: activityResponse.average_speed,
      distance: activityResponse.distance!,
      elapsed_time: activityResponse.elapsed_time!,
      strava_id: activityResponse.id,
      moving_time: activityResponse.moving_time!,
      title: activityResponse.name,
      // start_date is a timestamp string
      start_date: activityResponse.start_date as unknown as string,
      description: activityResponse.description!,
      sport_type: activityResponse.sport_type,
      // strava types are a little off here, splits_standard does exist on the response
      // but the types don't match up
      splits_standard: (activityResponse as any).splits_standard,
    };

    const existingWorkout = await supabase
      .from("workouts")
      .select()
      .eq("strava_id", workout.strava_id)
      .single();

    /**
     * Because the server can be in an idle mode which causes a slow response back to Strava,
     * in those cases strava could send the same event again before the first has finished processing.
     *
     * Check to see if the workout exists in the db already, if it does, don't add it again.
     */
    if (!existingWorkout.data) {
      console.log("Workout already exists in the db")
      return;
    }

    const response = await supabase
      .from("workouts")
      .insert({
        ...workout,
      })
      .select();

    if (response.error) {
      console.error(response.error);
      return;
    }

    console.log(`Added: ${response.data?.[0].id}`);
  } catch (error) {
    console.error(error);
  }
};

export const action: ActionFunction = async ({ request }) => {
  console.log("Strava webhook action received!", request.url);

  const body = await request.json();
  console.log({ body });
  if (body.object_type === "activity" && body.aspect_type === "create") {
    await saveWorkoutToDB(body.object_id);
  }

  return new Response("Event Received!", { status: 200 });
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log("Strava webhook loader received!", request.url);

  const req = new URL(request.url);

  // Verify token. Should be a random string.
  const VERIFY_TOKEN = "STRAVA_WEBHOOK_VERIFY_TOKEN";

  // Parses the query params
  let mode = req.searchParams.get("hub.mode");
  let token = req.searchParams.get("hub.verify_token");
  let challenge = req.searchParams.get("hub.challenge");

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Verifies that the mode and token sent are valid
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");

      return json({ "hub.challenge": challenge });
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return new Response("", { status: 403 });
    }
  }

  return null;
};
