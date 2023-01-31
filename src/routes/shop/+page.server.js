import { prisma } from "$lib/server/prisma";

export const load = async () => {
  const title = "Shop";
  const products = await prisma.product
    .findMany()
    .catch((error) => console.log(error));

  return { title, products };
};
