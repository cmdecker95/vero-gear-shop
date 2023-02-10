import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { getCart } from "$lib/utils";

export async function load({ cookies }) {
  const title = "Checkout";
  const cart = getCart(cookies);

  if (!cart) throw redirect(302, "/cart");

  const detailedCartItems = [];

  for (const cartItem of cart) {
    const details = await prisma.product.findUnique({
      where: {
        id: cartItem.id,
      },
    });

    const detailedCartItem = {
      ...details,
      cartId: cartItem.cartId,
      price: cartItem.price,
      color: cartItem.color,
      size: cartItem.size,
      qty: cartItem.qty,
    };

    detailedCartItems.push(detailedCartItem);
  }

  const total = detailedCartItems.reduce((acc, a) => acc + a.price * a.qty, 0);
  return { title, cart: detailedCartItems, total };
}
