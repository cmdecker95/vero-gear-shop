import { prisma } from "$lib/server/prisma";

export async function load({ locals }) {
  const title = "Orders";
  const user = locals.user;

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
  });

  if (orders) console.log(orders);

  return { title, orders };
}
