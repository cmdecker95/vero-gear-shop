import { authenticateUser } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  event.locals.user = await authenticateUser(event);

  // Protect user routes
  if (
    event.url.pathname.startsWith("/user/orders") ||
    event.url.pathname.startsWith("/user/me")
  ) {
    if (!event.locals.user) {
      throw redirect(303, "/user/login");
    }
  }

  // Protect admin routes
  if (event.url.pathname.startsWith("/admin")) {
    if (!event.locals.user) {
      throw redirect(303, "/user/login");
    }
    if (event.locals.user.role !== "ADMIN") {
      throw redirect(303, "/user/login");
    }
  }

  return await resolve(event);
};
