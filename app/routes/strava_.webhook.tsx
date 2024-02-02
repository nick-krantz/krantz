import { LoaderFunction, json, ActionFunction } from "@vercel/remix";
import strava from 'strava-v3'
import { supabase } from "~/utils/supabase/index.server";

// Get initial tokens from env
let stravaRefreshToken = process.env.STRAVA_REFRESH_TOKEN!;
let stravaAccessToken = process.env.STRAVA_ACCESS_TOKEN!;

// Get initial tokens from env
strava.config({
  client_id: process.env.STRAVA_CLIENT_ID!,
  client_secret: process.env.STRAVA_CLIENT_SECRET!,
  redirect_uri: process.env.STRAVA_REDIRECT_URI!,
  access_token: stravaAccessToken,
});

const saveWorkoutToDB = async (workoutId: string) => {
  try {
    const refreshResponse = await strava.oauth.refreshToken(stravaRefreshToken);
    console.log({ refreshResponse })
    // Update the local variables
    stravaRefreshToken = refreshResponse.refresh_token;
    stravaAccessToken = refreshResponse.access_token;

    const activityResponse = await strava.activities.get({ id: workoutId, includeAllEfforts: true, 'access_token': stravaAccessToken });
    console.log({ refreshResponse })

    const workout = {
      average_speed: activityResponse.average_speed,
      distance: activityResponse.distance,
      elapsed_time: activityResponse.elapsed_time,
      strava_id: activityResponse.id,
      moving_time: activityResponse.moving_time,
      title: activityResponse.name,
      start_date: activityResponse.start_date,
      description: activityResponse.description,
      sport_type: activityResponse.sport_type,
      // strava types are a little off here
      splits_standard: (activityResponse as any).splits_standard,
    }

    const response = await supabase.from('workouts').insert({
      ...workout
    }).select();
    console.log({ response })

    if (response.error) {
      console.error(response.error)
      return;
    }

    console.log(`Added: ${response.data?.[0].id}`)
  } catch (error) {
    console.error(error);
  }
}

export const action: ActionFunction = async ({ request }) => {
  console.log("Strava webhook action received!", request.url);

  const body = await request.json();
  console.log({ body })
  if (body.object_type === "activity" && body.aspect_type === "create") {
    saveWorkoutToDB(body.object_id);
  }

  return new Response('Event Received!', { status: 200 })
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log("Strava webhook loader received!", request.url);

  const req = new URL(request.url);

  // Verify token. Should be a random string.
  const VERIFY_TOKEN = "STRAVA_WEBHOOK_VERIFY_TOKEN";

  // Parses the query params
  let mode = req.searchParams.get('hub.mode');
  let token = req.searchParams.get('hub.verify_token');
  let challenge = req.searchParams.get('hub.challenge');

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Verifies that the mode and token sent are valid
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');

      return json({ "hub.challenge": challenge });
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return new Response('', { status: 403 });
    }
  }

  return null;
};
