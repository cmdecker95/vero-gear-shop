import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const user = locals.user;
  const title = user.name;

  return { title, user };
}

export const actions = {
  admin: async () => {
    throw redirect(302, "/admin/portal");
  },
  shop: async () => {
    throw redirect(302, "/shop");
  },
  cart: async () => {
    throw redirect(302, "/cart");
  },
  orders: async () => {
    throw redirect(302, "/user/orders");
  },
  logout: async ({ cookies }) => {
    cookies.delete("auth", { path: "/" });
    throw redirect(302, "/user/login");
  },
};
