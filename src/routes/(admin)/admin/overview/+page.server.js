import { prisma } from "$lib/server/prisma";

export async function load() {
  const title = "Overview | Admin";
  console.log("loading...");

  // We need to deliver the following insights on Orders:

  // Donut chart:
  // - How many orders total?
  // - How many orders fulfilled/unfulfilled?

  // KPI:
  // - Total sales
  // - How many products ordered in total?

  // Bar chart:
  // - How many of each product ordered?

  const orders = await prisma.order.findMany();
  let orderCount = orders.length;
  let fulfilledCount = 0;
  let productCount = 0;
  let products = {};
  let grandTotal = 0;

  for (const order of orders) {
    console.log("🤖 order.fulfilled:", order.fulfilled);
    if (order.fulfilled) fulfilledCount++;
    grandTotal += order.total;
    console.log("$$$:", grandTotal);

    for (const product of order.products) {
      console.log("🤖 product.qty:", product.qty);
      productCount += product.qty;

      if (product.id in products) {
        products[product.id] += product.qty;
      } else {
        products[product.id] = product.qty;
      }
    }
  }

  products = Object.entries(products);

  console.log("👨🏽‍🔬 orderCount:", orderCount);
  console.log("👨🏽‍🔬 fulfilledCount:", fulfilledCount);
  console.log("👨🏽‍🔬 productCount:", productCount);
  console.log("👨🏽‍🔬 products:", products);

  return {
    title,
    orderCount,
    fulfilledCount,
    productCount,
    products,
    grandTotal,
  };
}
