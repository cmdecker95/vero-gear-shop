import { prisma } from "$lib/server/prisma";

export async function load() {
  const title = "Shop";
  const products = await prisma.product.findMany().catch((e) => console.log(e));

  return { title, products };
}
