import { prisma } from "$lib/server/prisma";

export async function load() {
  const title = "Orders";

  const orders = await prisma.order.findMany();
  let users = new Map();

  for (const order of orders) {
    const { userId } = order;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    users.set(userId, `${user.firstname} ${user.lastname}`);
  }

  return { title, orders, users };
}
