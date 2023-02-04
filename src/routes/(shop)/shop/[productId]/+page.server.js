import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const product = await prisma.product
    .findUnique({
      where: {
        id: params.productId,
      },
    })
    .catch((error) => console.log(error));

  if (!product) throw redirect(302, "/shop");

  const title = product.name;
  return { title, product };
}
