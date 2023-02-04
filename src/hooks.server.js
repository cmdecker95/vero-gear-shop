import { authenticateUser } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  event.locals.user = await authenticateUser(event).catch((e) =>
    console.log(`🪝 Error during authentication: ${e}`)
  );

  // No root route
  if (event.url.pathname === "/") {
    throw redirect(303, "/shop");
  }

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
}
