import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {};

export const actions = {
  createProduct: async ({ request }) => {
    const { image, name, price, colors, sizes } = Object.fromEntries(
      await request.formData()
    );

    const splitColors = colors.split(",");

    console.log("🧙🏽‍♂️ image:", image);
    console.log("🧙🏽‍♂️ name:", name);
    console.log("🧙🏽‍♂️ price:", price);
    console.log("🧙🏽‍♂️ splitColors:", splitColors);
    console.log("🧙🏽‍♂️ splitColors.length:", splitColors.length);
    console.log("🧙🏽‍♂️ sizes:", sizes);
  },
};
