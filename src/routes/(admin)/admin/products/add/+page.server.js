import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export async function load() {
  const title = "Add Product";

  return { title };
}

export const actions = {
  addProduct: async ({ request }) => {
    const { image, name, price, colors, sizes } = Object.fromEntries(
      await request.formData()
    );

    await prisma.product
      .create({
        data: {
          image,
          name,
          price: parseFloat(price),
          colors: colors.split(","),
          sizes: sizes.split(","),
        },
      })
      .catch((e) => console.log(e));

    throw redirect(302, "/admin/products");
  },
};
