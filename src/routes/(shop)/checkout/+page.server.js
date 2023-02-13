import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { getCart } from "$lib/utils";

export async function load({ cookies }) {
  const title = "Checkout";
  const cart = getCart(cookies);

  if (!cart) throw redirect(302, "/cart");

  const enrichedCart = [];

  for (const cartItem of cart) {
    const details = await prisma.product.findUnique({
      where: {
        id: cartItem.id,
      },
    });

    const enrichedCartItem = {
      ...details,
      cartId: cartItem.cartId,
      price: cartItem.price,
      color: cartItem.color,
      size: cartItem.size,
      qty: cartItem.qty,
    };

    enrichedCart.push(enrichedCartItem);
  }

  const subtotal = enrichedCart.reduce((acc, a) => acc + a.price * a.qty, 0);

  return {
    title,
    cart: enrichedCart,
    subtotal,
  };
}

export const actions = {
  default: async ({ request, cookies, locals }) => {
    const {
      first,
      last,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      donating,
      shipping,
      total,
    } = Object.fromEntries(await request.formData());

    if (shipping) {
      let missing = "";

      for (const reqField of [
        [first, "First name"],
        [last, "Last name"],
        [address1, "Address line 1"],
        [city, "City"],
        [state, "State"],
        [zip, "ZIP"],
      ]) {
        if (!reqField[0]) missing += `(${reqField[1]}) `;
      }

      if (missing.length > 0) return { error: `Required fields: ${missing}` };
    }

    const cart = getCart(cookies);
    const address = shipping
      ? `${first} ${last}, ${address1} ${address2}, ${city}, ${state} ${zip}`
      : "";

    const data = {
      products: cart.map((cartItem) => ({
        id: cartItem.id,
        price: cartItem.price,
        color: cartItem.color,
        size: cartItem.size,
        qty: cartItem.qty,
      })),
      address,
      phone,
      total: parseFloat(total),
      donated: Boolean(donating),
      fulfilled: false,
      userId: locals.user.id,
    };

    console.log("🚀", data);

    await prisma.order.create({ data });

    cookies.delete("cart", { path: "/" });
    throw redirect(302, "/user/orders");
  },
};
