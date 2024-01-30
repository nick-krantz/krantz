import { LoaderFunction, json } from "@vercel/remix";

import { ActionFunction } from "@vercel/remix";

export const action: ActionFunction = async ({ request }) => {
  console.log("webhook action event received!", request.url, request.body);

  console.log(await request.text());
  console.log(await request.json());

  return new Response('Event Received!', { status: 200 })
};

export const loader: LoaderFunction = async ({ request }) => {
  console.log("webhook loader event received!", request.url);

  const req = new URL(request.url);

  // Verify token. Should be a random string.
  const VERIFY_TOKEN = "STRAVA_WEBHOOK_VERIFY_TOKEN";

  // Parses the query params
  let mode = req.searchParams.get('hub.mode');
  let token = req.searchParams.get('hub.verify_token');
  let challenge = req.searchParams.get('hub.challenge');
  console.log({
    mode,
    token,
    challenge,
  });

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
};
