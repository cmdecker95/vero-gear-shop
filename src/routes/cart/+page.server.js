import { prisma } from "$lib/server/prisma";

export const load = async ({ fetch }) => {
  const title = "Cart";

  const detailedCartItems = [];
  const res = await fetch("/api/cart");
  let cartItems;

  if (res.ok) {
    cartItems = await res.json();
  }

  for (const cartItem of cartItems) {
    const details = await prisma.product.findUnique({
      where: {
        id: cartItem.id,
      },
    });

    const detailedCartItem = {
      ...details,
      cartId: cartItem.cartId,
      color: cartItem.color,
      size: cartItem.size,
      qty: cartItem.qty,
    };

    detailedCartItems.push(detailedCartItem);
  }

  const total = detailedCartItems.reduce((acc, a) => acc + a.price * a.qty, 0);
  return { title, cart: detailedCartItems, total };
};
