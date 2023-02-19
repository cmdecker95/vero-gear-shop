import { prisma } from "$lib/server/prisma";

export async function load() {
  const title = "Overview | Admin";

  // Fetch all orders and products from database
  const orders = await prisma.order.findMany();
  const products = await prisma.product.findMany();

  // Map product IDs to names, then initialize counts
  const productNames = new Map();
  let productCounts = {};

  products.forEach((product) => {
    productNames.set(product.id, product.name);
    productCounts[product.name] = 0;
  });

  let orderCount = orders.length;
  let grandTotal = 0;
  let fulfilledCount = 0;
  let productCount = 0;

  for (const order of orders) {
    grandTotal += order.total;

    // Tally fulfilled orders
    if (order.fulfilled) fulfilledCount++;

    // Tally product sales
    for (const product of order.products) {
      const { id, qty } = product;
      const name = productNames.get(id);

      productCount += qty;
      productCounts[name] += qty;
    }
  }

  // Sort products by sales (desc)
  productCounts = Object.fromEntries(
    Object.entries(productCounts).sort((a, b) => b[1] - a[1])
  );

  return {
    title,
    orderCount,
    fulfilledCount,
    productCount,
    productCounts,
    grandTotal,
  };
}
