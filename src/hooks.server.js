import { redirect } from "@sveltejs/kit";
import { authenticateUser } from "$lib/server/auth";

export async function handle({ event, resolve }) {
  const path = event.url.pathname;
  console.log(`🪝  Authenticating ${event.request.method} ${path}...`);

  event.locals.user = await authenticateUser(event).catch((e) =>
    console.log(`🪝 Error during authentication: ${e}`)
  );

  // No root route
  if (path === "/") {
    console.log("👾 Redirecting to /shop");
    throw redirect(303, "/shop");
  }

  // Protect user routes
  if (path.startsWith("/user/orders") || path.startsWith("/user/me")) {
    if (!event.locals.user) {
      console.log("👾 Redirecting to /user/login");
      throw redirect(303, "/user/login");
    }
  }

  // User must login to checkout
  if (path.startsWith("/checkout")) {
    if (!event.locals.user) {
      console.log("👾 Redirecting to /user/login");
      throw redirect(303, "/user/login");
    }
  }

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!event.locals.user) {
      console.log("👾 Redirecting to /user/login");
      throw redirect(303, "/user/login");
    }
    if (event.locals.user.role !== "ADMIN") {
      console.log("👾 Redirecting to /user/login");
      throw redirect(303, "/user/login");
    }
  }

  return await resolve(event);
}
