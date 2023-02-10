import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export async function load({ params }) {
  const product = await prisma.product
    .findUnique({
      where: {
        id: params.productId,
      },
    })
    .catch((e) => console.log(e));

  if (!product) throw redirect(302, "/shop");

  const title = product.name;
  return { title, product };
}
