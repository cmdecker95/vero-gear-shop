import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
  return {
    products: await prisma.product.findMany(),
  };
};

export const actions = {
  addProduct: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const price = data.get("price");
    const colors = data.get("colors");
    const sizes = data.get("sizes");

    const file = data.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const string = buffer.toString("base64");

    try {
      await prisma.product.create({
        data: {
          image: `data:${file.type};base64,${string}`,
          name,
          price: parseFloat(price),
          colors: colors.split(","),
          sizes: sizes.split(","),
        },
      });
    } catch (error) {
      console.log("❌", error, "❌");
      return fail(500, "oops");
    }

    return { success: true, status: 201 };
  },
};
