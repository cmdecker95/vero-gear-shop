import { fail, redirect } from "@sveltejs/kit";
import { loginUser } from "$lib/server/auth";

export const load = async ({ locals }) => {
  const title = "Login";

  if (locals.user) {
    throw redirect(302, "/user/me");
  }
  return { title };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const { email, password } = Object.fromEntries(await request.formData());

    // Try to log the user in
    const { error, token } = await loginUser(email, password);

    // If there was an error, return a fail response
    if (error) return fail(500, { error });

    // Else, give them a cookie
    cookies.set("auth", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    throw redirect(302, "/user/me");
  },
};
