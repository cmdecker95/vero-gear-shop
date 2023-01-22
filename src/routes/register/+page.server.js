import { fail, redirect } from "@sveltejs/kit";
import { createUser } from "$lib/server/auth";

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());
    const { firstname, lastname, email, password } = formData;

    // Try to create a new user
    const { error, token } = await createUser(
      firstname,
      lastname,
      email,
      password
    );

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

    // Redirect to the shop page after registration
    throw redirect(302, "/shop");
  },
};
