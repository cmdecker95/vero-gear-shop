import { prisma } from "$lib/server/prisma";
import { formatPrice } from "$lib/utils";

export async function load() {
  const title = "Download";

  const orders = await prisma.order.findMany();
  let users = new Map();
  let rows = [
    [
      "Order Date",
      "Order Status",
      "Order Total",
      "Products Ordered",
      "Name",
      "Address",
      "Phone",
    ].join(","),
  ];

  for (const order of orders) {
    const { userId } = order;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const name = `${user.firstname} ${user.lastname}`;
    users.set(userId, name);

    const products = [];
    for (const product of order.products) {
      const { id, qty, size, color } = product;
      const productFromDb = await prisma.product.findUnique({
        where: {
          id,
        },
      });
      products.push(`${qty}x ${productFromDb.name} (${size} - ${color})`);
    }

    let address = order.address ?? "-";
    if (address !== "-") {
      address = address.split(",").slice(1).join("/");
    }

    let phone = order.phone ?? "-";
    if (phone !== "-" && phone.length === 10) {
      phone = `${phone.substring(0, 3)}-${phone.substring(
        3,
        6
      )}-${phone.substring(6)}`;
    }

    rows.push(
      [
        order.createdAt.toUTCString().substring(4),
        order.fulfilled ? "Fulfilled" : "Processing",
        formatPrice(order.total),
        products.join(";"),
        name,
        address,
        phone,
      ].join(",")
    );
  }

  const csv = rows.join("\n").toUpperCase();

  console.log("csv:", csv);

  return {
    title,
    csv,
  };
}
