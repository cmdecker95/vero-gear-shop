import { redirect } from "@sveltejs/kit";
import { authenticateUser } from "$lib/server/auth";

export async function handle({ event, resolve }) {
  event.locals.user = await authenticateUser(event).catch((e) =>
    console.log(`🪝 Error during authentication: ${e}`)
  );

  const path = event.url.pathname;

  // No root route
  if (path === "/") {
    throw redirect(303, "/shop");
  }

  // Protect user routes
  if (path.startsWith("/user/orders") || path.startsWith("/user/me")) {
    if (!event.locals.user) {
      throw redirect(303, "/user/login");
    }
  }

  // User must login to checkout
  if (path.startsWith("/checkout")) {
    if (!event.locals.user) {
      throw redirect(303, "/user/login");
    }
  }

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!event.locals.user) {
      throw redirect(303, "/user/login");
    }
    if (event.locals.user.role !== "ADMIN") {
      throw redirect(303, "/user/login");
    }
  }

  return await resolve(event);
}
