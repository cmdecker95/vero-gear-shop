import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const title = "Order";
  const { orderId } = params;
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) throw redirect(302, "/user/orders");

  const products = [];

  for (const product of order.products) {
    const details = await prisma.product.findUnique({
      where: {
        id: product.id,
      },
    });

    const enrichedProduct = {
      ...details,
      price: product.price,
      color: product.color,
      size: product.size,
      qty: product.qty,
    };

    products.push(enrichedProduct);
  }

  return { title, order, products };
}

export const actions = {
  cancelorder: async ({ params }) => {
    const { orderId } = params;
    await prisma.order.delete({ where: { id: orderId } });
    throw redirect(302, "/admin/orders");
  },
  unfulfillorder: async ({ params }) => {
    const { orderId } = params;
    await prisma.order.update({
      where: { id: orderId },
      data: { fulfilled: false },
    });
    throw redirect(302, "/admin/orders");
  },
  fulfillorder: async ({ params }) => {
    const { orderId } = params;
    await prisma.order.update({
      where: { id: orderId },
      data: { fulfilled: true },
    });
    throw redirect(302, "/admin/orders");
  },
};
