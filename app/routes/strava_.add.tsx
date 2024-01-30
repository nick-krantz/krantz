import { ActionFunction } from "@vercel/remix";

export const action: ActionFunction = async ({ request }) => {
  console.log("webhook event received!", request.url, request.body);

  console.log(await request.text());
  console.log(await request.json());

  return new Response('Event Received!', { status: 200 })
};
