import { prisma } from "$lib/server/prisma";

export const load = async ({ params }) => {
  const title = "Product";
  const product = await prisma.product
    .findUnique({
      where: {
        id: params.productId,
      },
    })
    .catch((error) => console.log(error));

  return { title, product };
};
