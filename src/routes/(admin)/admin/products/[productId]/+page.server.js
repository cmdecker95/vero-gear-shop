import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  console.log(product);

  if (!product) throw redirect(302, "/admin/products");

  const title = product.name;
  return { title, product };
}

export const actions = {
  save: async function ({ request }) {
    const { id, image, name, price, colors, sizes } = Object.fromEntries(
      await request.formData()
    );

    console.log(image);

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        image,
        name,
        price: parseFloat(price),
        colors: colors.split(","),
        sizes: sizes.split(","),
      },
    });

    throw redirect(302, "/admin/products");
  },

  delete: async function ({ request }) {
    const { id } = Object.fromEntries(await request.formData());

    await prisma.product.delete({
      where: {
        id,
      },
    });

    throw redirect(302, "/admin/products");
  },
};
