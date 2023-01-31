import { prisma } from "$lib/server/prisma";

export const load = async ({ cookies, params }) => {
  const title = "Product";

  const cartString = cookies.get("cart") ?? "[]";
  const cartParsed = JSON.parse(cartString);

  let cartItem;
  cartParsed.forEach((item) => {
    if (item.cartId === params.cartId) {
      cartItem = item;
    }
  });

  const product = await prisma.product
    .findUnique({
      where: {
        id: cartItem.id,
      },
    })
    .catch((error) => console.log(error));

  return { title, cartItem, product };
};
