import { Form, useActionData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect,
} from "@vercel/remix";
import { Button } from "~/components/button";
import { EmailInput } from "~/components/email-input";
import { ErrorMessage } from "~/components/error-message";
import { PasswordInput } from "../components/password-input";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants/access-token";
import { badRequest } from "~/utils/network";
import { commitSession, getSession } from "~/utils/supabase/get-session.server";
import { supabase } from "~/utils/supabase/index.server";
import { validateEmail, validatePassword } from "~/utils/validation";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
  user?: User;
};

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta || "description" in meta));

  return [
    ...parentMeta,
    {
      title: "Nick Krantz - Sign In",
      description: "Sign in to Krantz.app using an email and password",
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return badRequest({
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email, false),
    password: validatePassword(password, false),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const {
    data: { user, session: supabaseSession },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });
  // Sign in failed
  if (error) {
    return badRequest({ fields, formError: error.message }, error.status);
  }

  // Take user to the recipe page
  if (user !== null && supabaseSession !== null) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set(ACCESS_TOKEN, supabaseSession.access_token);
    session.set(REFRESH_TOKEN, supabaseSession.refresh_token);

    return redirect("../", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // TODO: Can this happen? User/session are null without an error?
  return null;
};

export const loader: LoaderFunction = () => {
  return json({ pageDetails: { header: "Sign In" } });
};

/**
 * Sign In form
 */
export default function SignIn() {
  const actionData = useActionData<ActionData>();
  const hasError = Boolean(actionData?.formError);

  return (
    <Form
      className="mt-20 px-4 mx-auto max-w-lg w-full"
      method="POST"
      aria-describedby={hasError ? "form-error-message" : undefined}
    >
      <div className="flex align-stretch flex-col gap-6">
        <EmailInput
          email={actionData?.fields?.email}
          errorMessage={actionData?.fieldErrors?.email}
        />
        <PasswordInput
          password={actionData?.fields?.password}
          errorMessage={actionData?.fieldErrors?.password}
        />
        <ErrorMessage id="form-error-message">
          {actionData?.formError}
        </ErrorMessage>
        <Button type="submit">Sign In</Button>
      </div>
    </Form>
  );
}
