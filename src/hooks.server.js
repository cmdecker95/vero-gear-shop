import { authenticateUser } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve, url }) => {
  event.locals.user = await authenticateUser(event);

  // Protect admin route
  if (event.url.pathname.startsWith("/admin")) {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }
    if (event.locals.user.role !== "ADMIN") {
      throw redirect(303, "/shop");
    }
  }

  // Only allow login and registration when logged out
  if (
    event.url.pathname.startsWith("/login") ||
    event.url.pathname.startsWith("/register")
  ) {
    if (event.locals.user) {
      throw redirect(303, "shop");
    }
  }

  return await resolve(event);
};
