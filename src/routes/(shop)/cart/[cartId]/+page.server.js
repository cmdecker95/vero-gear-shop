import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { getCart } from "$lib/utils";

export async function load({ fetch, cookies, params }) {
  const cart = getCart(cookies);

  let loadingCartItem;
  cart.forEach((currentCartItem) => {
    console.log("currentCartItem.cartId:", currentCartItem.cartId);
    console.log("params.cartId:", params.cartId);
    if (decodeURIComponent(currentCartItem.cartId) === params.cartId) {
      loadingCartItem = currentCartItem;
    }
  });

  if (!loadingCartItem) throw redirect(302, "/cart");

  const product = await prisma.product
    .findUnique({
      where: {
        id: loadingCartItem.id,
      },
    })
    .catch((e) => console.log(e));

  if (!product) {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cartId: loadingCartItem.cartId }),
    });
    console.log("k");
    throw redirect(302, "/cart");
  }

  const title = product.name;
  return { title, cartItem: loadingCartItem, product };
}
