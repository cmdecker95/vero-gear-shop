import { prisma } from "$lib/server/prisma";
import { getCart } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, params }) {
  const cart = getCart(cookies);

  let cartItem;
  cart.forEach((item) => {
    if (item.cartId === params.cartId) {
      cartItem = item;
    }
  });

  if (!cartItem) throw redirect(302, "/cart");

  const product = await prisma.product
    .findUnique({
      where: {
        id: cartItem.id,
      },
    })
    .catch((error) => console.log(error));

  const title = product.name;
  return { title, cartItem, product };
}
